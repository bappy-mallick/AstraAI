"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    console.log("Data:", data);
    console.log("Error:", error);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={signInWithGoogle}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Continue with Google
      </button>
    </main>
  );
}