export const AUTH_STORAGE_KEY = "hewe.authenticated";
export const QUIZ_STORAGE_KEY = "hewe.quiz.completed";
export const QUIZ_PROFILE_STORAGE_KEY = "hewe.quiz.profile";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function isQuizCompleted(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(QUIZ_STORAGE_KEY) === "true";
}

export function markSignedIn(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function markSignedOut(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
  window.localStorage.removeItem(QUIZ_PROFILE_STORAGE_KEY);
}

export function markQuizCompleted(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZ_STORAGE_KEY, "true");
}

export function resetQuizCompletion(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
  window.localStorage.removeItem(QUIZ_PROFILE_STORAGE_KEY);
}

export function saveQuizProfile(profile: unknown): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZ_PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

export function getQuizProfile<T = unknown>(): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawProfile = window.localStorage.getItem(QUIZ_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    return JSON.parse(rawProfile) as T;
  } catch {
    return null;
  }
}