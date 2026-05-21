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

async function submitOnboardingProfile(accessToken: string, profile: QuizProfile) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const errors: string[] = [];

  // Update user-level age + gender
  if (profile.age || profile.gender) {
    try {
      const res = await fetch(`${BACKEND_URL}/user/profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          age: profile.age ? parseInt(profile.age, 10) : undefined,
          gender: profile.gender,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        errors.push(`user/profile ${res.status}: ${body}`);
      }
    } catch (e) {
      errors.push(`user/profile network error: ${e}`);
    }
  }

  // Upsert health profile metrics
  const healthPayload: Record<string, unknown> = {};
  if (profile.gender) healthPayload.gender = profile.gender;
  if (profile.weight) healthPayload.weightKg = parseFloat(profile.weight);
  if (profile.height) healthPayload.heightCm = parseFloat(profile.height);
  if (profile.activity) healthPayload.physicalActivity = profile.activity;
  if (profile.sleepHours) healthPayload.sleepQuality = Math.round(parseFloat(profile.sleepHours));
  if (profile.eating) healthPayload.nutritionHabits = profile.eating;

  if (Object.keys(healthPayload).length > 0) {
    try {
      const res = await fetch(`${BACKEND_URL}/user/health-profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify(healthPayload),
      });
      if (!res.ok) {
        const body = await res.text();
        errors.push(`health-profile ${res.status}: ${body}`);
      }
    } catch (e) {
      errors.push(`health-profile network error: ${e}`);
    }
  }

  // Create health goals (one per selected goal)
  if (Array.isArray(profile.goals) && profile.goals.length > 0) {
    const goalLabels: Record<string, string> = {
      "weight-loss": "Lose weight",
      "muscle-gain": "Build muscle",
      sleep: "Improve sleep",
      stress: "Reduce stress",
    };

    for (const goalId of profile.goals) {
      try {
        const res = await fetch(`${BACKEND_URL}/user/health-profile/goals`, {
          method: "POST",
          headers,
          body: JSON.stringify({ title: goalLabels[goalId] ?? goalId }),
        });
        if (!res.ok) {
          const body = await res.text();
          errors.push(`goal ${goalId} ${res.status}: ${body}`);
        }
      } catch (e) {
        errors.push(`goal ${goalId} network error: ${e}`);
      }
    }
  }

  // Upsert key health preferences
  const preferences: { key: string; value: string }[] = [];
  if (profile.vegetarian) preferences.push({ key: "vegetarian", value: profile.vegetarian });
  if (profile.budget) preferences.push({ key: "budget", value: profile.budget });
  if (Array.isArray(profile.productTypes) && profile.productTypes.length > 0)
    preferences.push({ key: "productTypes", value: profile.productTypes.join(",") });
  if (Array.isArray(profile.conditions) && profile.conditions.length > 0)
    preferences.push({ key: "conditions", value: profile.conditions.join(",") });

  if (preferences.length > 0) {
    try {
      const res = await fetch(`${BACKEND_URL}/user/health-profile/preferences`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ preferences }),
      });
      if (!res.ok) {
        const body = await res.text();
        errors.push(`preferences ${res.status}: ${body}`);
      }
    } catch (e) {
      errors.push(`preferences network error: ${e}`);
    }
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, quizProfile } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Register user on backend
    const registerRes = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const registerData = await registerRes.json();

    if (!registerRes.ok) {
      return NextResponse.json(
        { error: registerData.message || "Registration failed" },
        { status: registerRes.status }
      );
    }

    const { accessToken } = registerData;
    const onboardingErrors: string[] = [];

    // If the user completed the quiz, persist their profile immediately
    // using the fresh accessToken from registration (same server-side call chain)
    if (quizProfile && accessToken) {
      const errs = await submitOnboardingProfile(accessToken, quizProfile);
      onboardingErrors.push(...errs);
      if (errs.length > 0) {
        console.error("[signup] Onboarding partial failure:", errs);
      }
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: registerData.user,
        accessToken,
        onboardingErrors,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
