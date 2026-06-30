"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function PreviewPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-[#1B0F3B]">

      {/* Background Glow */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-violet-700 opacity-25 blur-[180px]" />

      {/* Floating Glow */}
      <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-purple-500 blur-[120px] opacity-40" />
      <div className="absolute bottom-20 right-20 h-40 w-40 rounded-full bg-pink-500 blur-[120px] opacity-30" />

      {/* Logo */}
      <motion.div
        initial={{
          y: -250,
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        className="z-10 flex flex-col items-center"
      >
        <img
          src="/logo.jpeg"
          alt="AstraAI"
          className="h-40 w-40 rounded-3xl shadow-2xl"
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 0.6,
          }}
          className="mt-8 text-6xl font-bold text-white"
        >
          AstraAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.6,
          }}
          className="mt-4 text-xl text-purple-200"
        >
          From raw data to ready content.
        </motion.p>
      </motion.div>
    </main>
  );
}