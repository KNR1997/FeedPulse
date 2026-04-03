"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-5xl font-bold">Welcome to FeedPulse</h1>
      <p className="text-gray-600 text-lg">Choose your path to get started</p>

      <div className="flex gap-6">
        <Link
          href="/feedbackEnter"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Feedback
        </Link>

        <Link
          href="/login"
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}
