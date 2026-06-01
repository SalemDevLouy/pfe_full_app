"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/hooks/use-api";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex flex-col items-center gap-2 text-center">
      <span
        className="material-symbols-outlined text-primary text-3xl"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <span className="font-headline text-3xl font-extrabold text-on-surface">{value}</span>
      <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function Profile() {
  const { getProfile, updateProfile, changePassword, sessionStatus } = useApi();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // Password state
  const [pwSection, setPwSection] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    getProfile()
      .then((data: any) => {
        setProfile(data);
        setName(data.name ?? "");
        setAge(data.age != null ? String(data.age) : "");
        setGender(data.gender ?? "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      const updated = await updateProfile({
        name: name || undefined,
        age: age ? parseInt(age, 10) : undefined,
        gender: gender || undefined,
      });
      setProfile((p: any) => ({ ...p, ...updated }));
      setEditing(false);
      setSaveMsg("Profile updated successfully.");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (err: any) {
      setSaveMsg(err.message ?? "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwMsg("");
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    if (newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    setPwSaving(true);
    try {
      await changePassword(currentPw, newPw);
      setPwMsg("Password changed successfully.");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setPwSection(false);
      setTimeout(() => setPwMsg(""), 3000);
    } catch (err: any) {
      setPwError(err.message ?? "Failed to change password.");
    } finally {
      setPwSaving(false);
    }
  };

  if (sessionStatus !== "authenticated") {
    return (
      <div className="text-center py-24">
        <span className="material-symbols-outlined text-stone-300 text-6xl mb-4 block">lock</span>
        <h2 className="font-headline text-2xl font-bold mb-2">Sign in to view your profile</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const initials = getInitials(profile?.name ?? "U");
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "—";

  return (
    <div className="w-full max-w-3xl">

      {/* Header */}
      <div className="mb-10 mt-2">
        <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">Account</span>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mt-2">
          Your Profile
        </h1>
      </div>

      {/* Avatar + name card */}
      <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mb-8 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center shrink-0">
          <span className="font-headline font-extrabold text-primary text-2xl">{initials}</span>
        </div>
        <div className="min-w-0">
          <h2 className="font-headline text-2xl font-extrabold text-on-surface truncate">{profile?.name}</h2>
          <p className="text-stone-400 text-sm mt-0.5 truncate">{profile?.email}</p>
          <p className="text-stone-300 text-xs mt-1 font-medium">Member since {memberSince}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon="shopping_bag" label="Orders" value={profile?.orderCount ?? 0} />
        <StatCard icon="rate_review" label="Reviews" value={profile?.reviewCount ?? 0} />
        <StatCard icon="favorite" label="Wishlist" value={profile?.wishlistCount ?? 0} />
      </div>

      {/* Profile info / edit form */}
      <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline text-xl font-bold text-on-surface">Personal Information</h3>
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit
            </button>
          )}
        </div>

        {!editing ? (
          <dl className="space-y-4">
            {[
              { label: "Full name", value: profile?.name },
              { label: "Email address", value: profile?.email },
              { label: "Age", value: profile?.age != null ? `${profile.age} years old` : "—" },
              { label: "Gender", value: profile?.gender ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-stone-50 last:border-0">
                <dt className="text-xs font-bold text-stone-400 uppercase tracking-wider sm:w-40 shrink-0">{label}</dt>
                <dd className="font-medium text-on-surface capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Age</label>
              <input
                type="number"
                value={age}
                min={1}
                max={120}
                onChange={e => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
                placeholder="Your age"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-label font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving
                  ? <><span className="animate-spin material-symbols-outlined text-lg">autorenew</span> Saving…</>
                  : <><span className="material-symbols-outlined text-lg">save</span> Save Changes</>
                }
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setName(profile?.name ?? "");
                  setAge(profile?.age != null ? String(profile.age) : "");
                  setGender(profile?.gender ?? "");
                }}
                className="px-6 py-3 rounded-xl border border-outline-variant/20 text-stone-500 font-bold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {saveMsg && (
          <p className={`mt-4 text-sm font-semibold ${saveMsg.includes("success") ? "text-emerald-600" : "text-rose-500"}`}>
            {saveMsg}
          </p>
        )}
      </div>

      {/* Password change */}
      <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-xl font-bold text-on-surface">Password</h3>
            <p className="text-stone-400 text-sm mt-1">Change your account password</p>
          </div>
          {!pwSection && (
            <button
              type="button"
              onClick={() => setPwSection(true)}
              className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-lg">lock_reset</span>
              Change
            </button>
          )}
        </div>

        {pwSection && (
          <form onSubmit={handlePasswordChange} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Current Password</label>
              <input
                type="password"
                value={currentPw}
                onChange={e => setCurrentPw(e.target.value)}
                required
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">New Password</label>
              <input
                type="password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                required
                className="w-full px-4 py-3 bg-stone-50 border border-outline-variant/20 rounded-xl text-on-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none transition-all"
              />
            </div>
            {pwError && <p className="text-rose-500 text-sm font-semibold">{pwError}</p>}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={pwSaving}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-label font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {pwSaving
                  ? <><span className="animate-spin material-symbols-outlined text-lg">autorenew</span> Updating…</>
                  : <><span className="material-symbols-outlined text-lg">lock_reset</span> Update Password</>
                }
              </button>
              <button
                type="button"
                onClick={() => { setPwSection(false); setPwError(""); setCurrentPw(""); setNewPw(""); setConfirmPw(""); }}
                className="px-6 py-3 rounded-xl border border-outline-variant/20 text-stone-500 font-bold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {pwMsg && (
          <p className="mt-4 text-sm font-semibold text-emerald-600">{pwMsg}</p>
        )}
      </div>

      {/* Account info */}
      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 text-center">
        <p className="text-stone-400 text-xs font-medium">
          Account ID: <span className="font-mono text-stone-500">{profile?.id}</span>
        </p>
      </div>

    </div>
  );
}
