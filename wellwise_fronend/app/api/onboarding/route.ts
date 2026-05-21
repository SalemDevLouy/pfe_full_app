import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001/api/v1";

type QuizProfile = {
  age?: string;
  gender?: string;
  weight?: string;
  height?: string;
  activity?: string;
  sleepHours?: string;
  eating?: string;
  goals?: string[];
  conditions?: string[];
  vegetarian?: string;
  budget?: string;
  productTypes?: string[];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, accessToken } = body as { profile: QuizProfile; accessToken: string };

    if (!accessToken) {
      return NextResponse.json({ error: "Missing access token" }, { status: 400 });
    }

    if (!profile) {
      return NextResponse.json({ error: "Missing profile data" }, { status: 400 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const results: Record<string, unknown> = {};
    const errors: string[] = [];

    // 1. Update user profile (age + gender on the User model)
    if (profile.age || profile.gender) {
      const res = await fetch(`${BACKEND_URL}/user/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          age: profile.age ? parseInt(profile.age, 10) : undefined,
          gender: profile.gender,
        }),
      });
      if (res.ok) results.profile = await res.json();
      else errors.push("profile update failed");
    }

    // 2. Upsert health profile (metrics)
    const healthProfilePayload: Record<string, unknown> = {};
    if (profile.gender) healthProfilePayload.gender = profile.gender;
    if (profile.weight) healthProfilePayload.weightKg = parseFloat(profile.weight);
    if (profile.height) healthProfilePayload.heightCm = parseFloat(profile.height);
    if (profile.activity) healthProfilePayload.physicalActivity = profile.activity;
    if (profile.sleepHours) healthProfilePayload.sleepQuality = Math.round(parseFloat(profile.sleepHours));
    if (profile.eating) healthProfilePayload.nutritionHabits = profile.eating;

    if (Object.keys(healthProfilePayload).length > 0) {
      const res = await fetch(`${BACKEND_URL}/user/health-profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify(healthProfilePayload),
      });
      if (res.ok) results.healthProfile = await res.json();
      else errors.push("health profile update failed");
    }

    // 3. Create health goals (one request per goal)
    if (Array.isArray(profile.goals) && profile.goals.length > 0) {
      const goalLabels: Record<string, string> = {
        "weight-loss": "Lose weight",
        "muscle-gain": "Build muscle",
        "sleep": "Improve sleep",
        "stress": "Reduce stress",
      };

      const goalResults = await Promise.allSettled(
        profile.goals.map((goalId) =>
          fetch(`${BACKEND_URL}/user/health-profile/goals`, {
            method: "POST",
            headers,
            body: JSON.stringify({ title: goalLabels[goalId] ?? goalId }),
          })
        )
      );

      results.goals = goalResults.map((r) => r.status);
    }

    // 4. Upsert health preferences (vegetarian, budget, productTypes, conditions)
    const preferences: { key: string; value: string }[] = [];

    if (profile.vegetarian) {
      preferences.push({ key: "vegetarian", value: profile.vegetarian });
    }
    if (profile.budget) {
      preferences.push({ key: "budget", value: profile.budget });
    }
    if (Array.isArray(profile.productTypes) && profile.productTypes.length > 0) {
      preferences.push({ key: "productTypes", value: profile.productTypes.join(",") });
    }
    if (Array.isArray(profile.conditions) && profile.conditions.length > 0) {
      preferences.push({ key: "conditions", value: profile.conditions.join(",") });
    }

    if (preferences.length > 0) {
      const res = await fetch(`${BACKEND_URL}/user/health-profile/preferences`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ preferences }),
      });
      if (res.ok) results.preferences = await res.json();
      else errors.push("preferences update failed");
    }

    return NextResponse.json({ ok: true, results, errors });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "An error occurred during onboarding submission" },
      { status: 500 }
    );
  }
}
