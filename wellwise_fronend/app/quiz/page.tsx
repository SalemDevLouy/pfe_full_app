"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { markQuizCompleted, saveQuizProfile } from "@/app/lib/session-flow";

type MultiSelectOption = {
  id: string;
  label: string;
  description: string;
};

type QuizForm = {
  age: string;
  gender: string;
  weight: string;
  height: string;
  activity: string;
  sleepHours: string;
  eating: string;
  goals: string[];
  conditions: string[];
  vegetarian: string;
  budget: string;
  productTypes: string[];
};

const genderOptions: MultiSelectOption[] = [
  { id: "female", label: "Female", description: "Woman" },
  { id: "male", label: "Male", description: "Man" },
  { id: "other", label: "Prefer not to say", description: "Prefer not to disclose" },
];

const activityOptions: MultiSelectOption[] = [
  { id: "low", label: "Low", description: "Little or no regular exercise" },
  { id: "moderate", label: "Moderate", description: "Exercise 2-4 times per week" },
  { id: "high", label: "High", description: "Exercise most days" },
];

const eatingOptions: MultiSelectOption[] = [
  { id: "healthy", label: "Healthy", description: "Mostly whole foods and balanced meals" },
  { id: "junk", label: "Junk", description: "Fast food or ultra-processed meals often" },
  { id: "balanced", label: "Balanced", description: "A mix of healthy and flexible meals" },
];

const goalOptions: MultiSelectOption[] = [
  { id: "weight-loss", label: "Lose weight", description: "Reduce body weight" },
  { id: "muscle-gain", label: "Build muscle", description: "Increase muscle mass" },
  { id: "sleep", label: "Improve sleep", description: "Sleep better and more consistently" },
  { id: "stress", label: "Reduce stress", description: "Lower stress levels" },
];

const conditionOptions: MultiSelectOption[] = [
  { id: "diabetes", label: "Diabetes", description: "High blood sugar" },
  { id: "blood-pressure", label: "Blood pressure", description: "Hypertension or blood pressure issues" },
  { id: "vitamin-deficiency", label: "Vitamin deficiency", description: "Low vitamin levels" },
  { id: "none", label: "None", description: "No known medical issues" },
];

const vegetarianOptions: MultiSelectOption[] = [
  { id: "yes", label: "Yes", description: "Vegetarian" },
  { id: "no", label: "No", description: "Not vegetarian" },
];

const budgetOptions: MultiSelectOption[] = [
  { id: "low", label: "Low", description: "Keep it affordable" },
  { id: "medium", label: "Medium", description: "Flexible budget" },
  { id: "high", label: "High", description: "Premium-friendly budget" },
];

const productTypeOptions: MultiSelectOption[] = [
  { id: "supplements", label: "Supplements", description: "Nutrition supplements and vitamins" },
  { id: "services", label: "Services", description: "Coaching, consulting, or support services" },
  { id: "programs", label: "Programs", description: "Structured plans or memberships" },
];

const sections = [
  {
    id: "personal",
    title: "Personal details",
    subtitle: "Collect age, gender, weight, and height.",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    subtitle: "Understand activity, sleep, and eating habits.",
  },
  {
    id: "goals",
    title: "Goals",
    subtitle: "Capture the user outcomes they care about most.",
  },
  {
    id: "health",
    title: "Health conditions",
    subtitle: "Note common conditions or mark none.",
  },
  {
    id: "preferences",
    title: "Preferences",
    subtitle: "Store diet style, budget, and product interests.",
  },
];

const initialForm: QuizForm = {
  age: "",
  gender: "",
  weight: "",
  height: "",
  activity: "",
  sleepHours: "",
  eating: "",
  goals: [],
  conditions: [],
  vegetarian: "",
  budget: "",
  productTypes: [],
};

function toggleArrayValue(values: string[], value: string) {
  if (values.includes(value)) {
    return values.filter((item) => item !== value);
  }

  return [...values, value];
}

function formatSelection(values: string[]) {
  return values.length > 0 ? values.join(", ") : "Not selected";
}

export default function Quiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuizForm>(initialForm);
  const [error, setError] = useState("");

  const currentSection = sections[step];
  const progress = Math.round(((step + 1) / sections.length) * 100);

  const bmi = useMemo(() => {
    const weight = Number(form.weight);
    const heightCm = Number(form.height);

    if (!weight || !heightCm) {
      return null;
    }

    const heightM = heightCm / 100;

    if (heightM <= 0) {
      return null;
    }

    return (weight / (heightM * heightM)).toFixed(1);
  }, [form.height, form.weight]);

  const isSectionValid = useMemo(() => {
    if (step === 0) {
      return Boolean(form.age && form.gender && form.weight && form.height);
    }

    if (step === 1) {
      return Boolean(form.activity && form.sleepHours && form.eating);
    }

    if (step === 2) {
      return form.goals.length > 0;
    }

    if (step === 3) {
      return form.conditions.length > 0;
    }

    return Boolean(form.vegetarian && form.budget && form.productTypes.length > 0);
  }, [form, step]);

  const summary = useMemo(() => {
    return [
      { label: "Age", value: form.age || "Not set" },
      { label: "Gender", value: form.gender || "Not set" },
      { label: "BMI", value: bmi ? bmi : "Enter weight and height" },
      { label: "Activity", value: form.activity || "Not set" },
      { label: "Sleep", value: form.sleepHours ? `${form.sleepHours} hrs` : "Not set" },
      { label: "Eating", value: form.eating || "Not set" },
      { label: "Goals", value: formatSelection(form.goals) },
      { label: "Conditions", value: formatSelection(form.conditions) },
      { label: "Vegetarian", value: form.vegetarian || "Not set" },
      { label: "Budget", value: form.budget || "Not set" },
      { label: "Product types", value: formatSelection(form.productTypes) },
    ];
  }, [bmi, form]);

  const updateField = <K extends keyof QuizForm>(key: K, value: QuizForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const goBack = () => {
    setError("");
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleContinue = () => {
    if (!isSectionValid) {
      setError("Please complete this section before continuing.");
      return;
    }

    setError("");

    if (step < sections.length - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    const profile = {
      ...form,
      bmi,
      completedAt: new Date().toISOString(),
    };

    saveQuizProfile(profile);
    markQuizCompleted();
    router.replace("/signup");
  };

  const renderPillGroup = (
    options: MultiSelectOption[],
    value: string,
    onChange: (nextValue: string) => void
  ) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
              selected
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-outline-variant/20 bg-white/80 hover:border-primary/30 hover:bg-surface-container-low"
            }`}
          >
            <p className="font-headline text-base font-bold text-on-surface">{option.label}</p>
            <p className="mt-1 text-sm text-stone-500">{option.description}</p>
          </button>
        );
      })}
    </div>
  );

  const renderMultiSelect = (
    options: MultiSelectOption[],
    values: string[],
    onChange: (nextValues: string[]) => void,
    allowNone?: boolean
  ) => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const selected = values.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              if (allowNone && option.id === "none") {
                onChange(selected ? [] : [option.id]);
                return;
              }

              if (allowNone && option.id !== "none") {
                onChange(toggleArrayValue(values.filter((item) => item !== "none"), option.id));
                return;
              }

              onChange(toggleArrayValue(values, option.id));
            }}
            aria-pressed={selected}
            className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
              selected
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-outline-variant/20 bg-white/80 hover:border-primary/30 hover:bg-surface-container-low"
            }`}
          >
            <p className="font-headline text-base font-bold text-on-surface">{option.label}</p>
            <p className="mt-1 text-sm text-stone-500">{option.description}</p>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,rgba(13,99,27,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(46,125,50,0.1),transparent_32%),#f7f8f7] pb-32 pt-10">
      <div className="mx-auto mb-10 w-full max-w-6xl px-6">
        <div className="mb-4 flex items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-green-700">Personal intake</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-stone-900">
              Build a better profile in five steps
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
              We collect the core data needed to personalize recommendations: age, gender, BMI, lifestyle, goals,
              health signals, and product preferences.
            </p>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-stone-500">Progress</p>
            <p className="font-headline text-3xl font-extrabold text-primary">{progress}%</p>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-container transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-3xl border border-outline-variant/20 bg-white/85 p-6 shadow-[0_16px_36px_rgba(17,24,39,0.06)] backdrop-blur-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-700">Section {step + 1}</p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold text-stone-900">{currentSection.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">{currentSection.subtitle}</p>
              <div className="mt-6 rounded-2xl bg-surface-container-low px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Current snapshot</p>
                <div className="mt-3 space-y-2 text-sm text-stone-700">
                  <p>
                    BMI: <span className="font-semibold text-primary">{bmi ?? "Not calculated yet"}</span>
                  </p>
                  <p>
                    Goals: <span className="font-semibold">{formatSelection(form.goals)}</span>
                  </p>
                  <p>
                    Conditions: <span className="font-semibold">{formatSelection(form.conditions)}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-outline-variant/20 bg-white/85 p-6 shadow-[0_16px_36px_rgba(17,24,39,0.06)] backdrop-blur-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Summary</p>
              <div className="mt-4 space-y-3">
                {summary.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <span className="text-sm text-stone-500">{item.label}</span>
                    <span className="max-w-[55%] text-right text-sm font-medium text-stone-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          <div className="space-y-6">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-outline-variant/20 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,24,39,0.08)] backdrop-blur-xl md:p-8">
              {step === 0 ? (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-stone-700">Age</span>
                      <input
                        type="number"
                        min="10"
                        max="120"
                        value={form.age}
                        onChange={(e) => updateField("age", e.target.value)}
                        className="w-full rounded-2xl border border-outline-variant/20 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-primary"
                        placeholder="Enter age"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-stone-700">Gender</span>
                      {renderPillGroup(genderOptions, form.gender, (value) => updateField("gender", value))}
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-stone-700">Weight (kg)</span>
                      <input
                        type="number"
                        min="20"
                        max="400"
                        step="0.1"
                        value={form.weight}
                        onChange={(e) => updateField("weight", e.target.value)}
                        className="w-full rounded-2xl border border-outline-variant/20 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-primary"
                        placeholder="Enter weight"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-stone-700">Height (cm)</span>
                      <input
                        type="number"
                        min="50"
                        max="250"
                        step="0.1"
                        value={form.height}
                        onChange={(e) => updateField("height", e.target.value)}
                        className="w-full rounded-2xl border border-outline-variant/20 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-primary"
                        placeholder="Enter height"
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Physical activity</p>
                    {renderPillGroup(activityOptions, form.activity, (value) => updateField("activity", value))}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-stone-700">Average sleep per night</span>
                      <input
                        type="number"
                        min="0"
                        max="16"
                        step="0.5"
                        value={form.sleepHours}
                        onChange={(e) => updateField("sleepHours", e.target.value)}
                        className="w-full rounded-2xl border border-outline-variant/20 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-primary"
                        placeholder="e.g. 7.5"
                      />
                    </label>

                    <div>
                      <p className="mb-3 text-sm font-medium text-stone-700">Eating style</p>
                      {renderPillGroup(eatingOptions, form.eating, (value) => updateField("eating", value))}
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Goals</p>
                    {renderMultiSelect(goalOptions, form.goals, (values) => updateField("goals", values))}
                  </div>
                  <p className="text-sm text-stone-500">
                    Select every goal that applies. This can be used to rank recommendations later.
                  </p>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Health conditions</p>
                    {renderMultiSelect(conditionOptions, form.conditions, (values) => updateField("conditions", values), true)}
                  </div>
                  <p className="text-sm text-stone-500">
                    Choose none if there are no known health issues to report.
                  </p>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Vegetarian / not</p>
                    {renderPillGroup(vegetarianOptions, form.vegetarian, (value) => updateField("vegetarian", value))}
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Budget</p>
                    {renderPillGroup(budgetOptions, form.budget, (value) => updateField("budget", value))}
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-medium text-stone-700">Product type</p>
                    {renderMultiSelect(productTypeOptions, form.productTypes, (values) => updateField("productTypes", values))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant/10 bg-white/80 px-6 pb-6 pt-4 backdrop-blur-xl md:px-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-stone-500 transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-xl bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === sections.length - 1 ? "Finish Quiz and Sign Up" : "Continue"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}