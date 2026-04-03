"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Divider } from "@nextui-org/divider";
import FollowPointerBall from "@/components/ui/followPointerBall";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Pointer Ball */}
      <FollowPointerBall />

      {/* Left Side */}
      <div className="flex-1 flex-col flex items-center justify-center p-6 relative z-10">
        {children}
      </div>

      {/* Divider */}
      <div className="hidden my-10 md:block">
        <Divider orientation="vertical" />
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-6 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, #4f46e5, #9333ea)",
              "linear-gradient(135deg, #2563eb, #7c3aed)",
              "linear-gradient(135deg, #1d4ed8, #6d28d9)",
              "linear-gradient(135deg, #4f46e5, #9333ea)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Blur Shapes */}
        <motion.div
          className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-60 h-60 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 40, 0],
            y: [0, 70, -50, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <motion.div
          className="z-10 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-bold text-[45px]">FeedPulse</h1>

          <p className="font-light mt-4 max-w-md">
            AI-powered product feedback platform that helps teams collect,
            analyze, and prioritize user feedback efficiently. Submit bugs,
            feature requests, or improvements while admins manage insights with
            intelligent AI analysis.
          </p>
        </motion.div>
      </div>

      {/* Floating Landing Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[1000]"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/landing"
          className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          Go to Landing →
        </Link>
      </motion.div>
    </div>
  );
};
