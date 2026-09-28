"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-500">
            Infosys AI Knowledge Assistant
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Forgot password?
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email and we will send password reset
            instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-medium text-green-700">
                Reset request submitted.
              </p>

              <p className="mt-1 text-xs text-green-600">
                Password reset will be connected to the backend
                authentication service later.
              </p>
            </div>

            <Link
              href="/login"
              className="block text-center text-sm font-medium text-slate-900 hover:underline"
            >
              Return to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="reset-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="reset-email"
                type="email"
                placeholder="employee@infosys.com"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Send reset instructions
            </button>
          </form>
        )}

        {!submitted && (
          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}