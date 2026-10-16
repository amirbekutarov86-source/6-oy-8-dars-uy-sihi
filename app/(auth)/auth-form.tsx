"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const isLogin = mode === "login";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Demo: haqiqiy autentifikatsiya keyin ulanadi
        router.push("/");
      }}
      className="space-y-4"
    >
      <h1 className="font-display text-2xl font-bold">
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>

      {!isLogin && <Input name="name" placeholder="Full name" aria-label="Full name" required />}
      <Input name="email" type="email" placeholder="Email" aria-label="Email" required />
      <Input name="password" type="password" placeholder="Password" aria-label="Password" required minLength={6} />

      <Button type="submit" size="lg" className="w-full">
        {isLogin ? "Log In" : "Create account"}
      </Button>

      <p className="text-center text-sm text-neutral-600">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-indigo-600 hover:underline"
        >
          {isLogin ? "Get Started" : "Log In"}
        </Link>
      </p>
    </form>
  );
}
