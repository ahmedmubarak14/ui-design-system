"use client";

import * as React from "react";
import Link from "next/link";
import {
  Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, ArrowRight, Home,
} from "lucide-react";
import { Button } from "@/components/base/button";
import { Input, FormField } from "@/components/base/input";
import { Checkbox } from "@/components/base/forms";
import { FeaturedIcon } from "@/components/base/misc";
import { ShowcaseLayout, ShowcaseSection } from "@/components/showcase";

function AuthCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function LoginForm() {
  const [showPw, setShowPw] = React.useState(false);
  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="size-12 rounded-xl bg-brand-600 mx-auto mb-5 flex items-center justify-center">
          <Lock className="size-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="mt-1.5 text-sm text-gray-500">Sign in to your account to continue</p>
      </div>

      <form className="space-y-4">
        <FormField label="Email">
          <Input type="email" placeholder="you@example.com" leadingIcon={<Mail />} />
        </FormField>
        <FormField label="Password">
          <Input
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            leadingIcon={<Lock />}
            trailingIcon={
              <button type="button" onClick={() => setShowPw((s) => !s)} className="hover:text-gray-600 transition">
                {showPw ? <EyeOff /> : <Eye />}
              </button>
            }
          />
        </FormField>
        <div className="flex items-center justify-between pt-1">
          <Checkbox label="Remember me" />
          <a href="#" className="text-sm font-semibold text-brand-700 hover:text-brand-800">Forgot password?</a>
        </div>
        <Button size="lg" className="w-full">Sign in</Button>
        <Button variant="secondary" size="lg" className="w-full">
          <svg className="size-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </Button>
        <p className="text-center text-sm text-gray-500 pt-2">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-semibold text-brand-700 hover:text-brand-800">Sign up</a>
        </p>
      </form>
    </AuthCard>
  );
}

function SignupForm() {
  return (
    <AuthCard>
      <div className="text-center mb-8">
        <div className="size-12 rounded-xl bg-brand-600 mx-auto mb-5 flex items-center justify-center">
          <Mail className="size-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="mt-1.5 text-sm text-gray-500">Get started in less than a minute</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="First name">
            <Input placeholder="Olivia" />
          </FormField>
          <FormField label="Last name">
            <Input placeholder="Rhye" />
          </FormField>
        </div>
        <FormField label="Email">
          <Input type="email" placeholder="you@example.com" leadingIcon={<Mail />} />
        </FormField>
        <FormField label="Password" helperText="Must be at least 8 characters">
          <Input type="password" placeholder="••••••••" leadingIcon={<Lock />} />
        </FormField>
        <Checkbox
          label={
            <>
              I agree to the <a href="#" className="text-brand-700 underline">Terms</a> and{" "}
              <a href="#" className="text-brand-700 underline">Privacy Policy</a>
            </>
          }
        />
        <Button size="lg" className="w-full">Create account</Button>
        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-brand-700 hover:text-brand-800">Sign in</a>
        </p>
      </form>
    </AuthCard>
  );
}

function ForgotPasswordForm() {
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <AuthCard>
        <div className="text-center">
          <FeaturedIcon color="success" variant="outline" size="lg" className="mx-auto mb-5">
            <CheckCircle2 />
          </FeaturedIcon>
          <h1 className="text-2xl font-semibold text-gray-900">Check your email</h1>
          <p className="mt-2 text-sm text-gray-500">
            We sent a password reset link to <span className="font-semibold text-gray-900">olivia@example.com</span>
          </p>
          <Button variant="secondary" size="lg" className="w-full mt-6">
            Open email app
          </Button>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setSent(false); }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="size-4" />
            Back to sign in
          </a>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="text-center mb-8">
        <FeaturedIcon variant="outline" size="lg" className="mx-auto mb-5">
          <Lock />
        </FeaturedIcon>
        <h1 className="text-2xl font-semibold text-gray-900">Forgot password?</h1>
        <p className="mt-1.5 text-sm text-gray-500">No worries, we&apos;ll send you reset instructions</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <FormField label="Email">
          <Input type="email" placeholder="you@example.com" leadingIcon={<Mail />} required />
        </FormField>
        <Button size="lg" className="w-full" type="submit">Reset password</Button>
        <a
          href="#"
          className="mt-2 mx-auto flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </a>
      </form>
    </AuthCard>
  );
}

function NotFoundBlock() {
  return (
    <div className="text-center py-12 px-6">
      <p className="font-mono text-sm font-semibold text-brand-700 uppercase tracking-wider">404 error</p>
      <h1 className="mt-3 font-display text-display-xl text-gray-900 tracking-tight">
        We lost this page
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" size="lg">
          <ArrowLeft />
          Go back
        </Button>
        <Button size="lg">
          <Home />
          Take me home
        </Button>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <ShowcaseLayout
      title="Auth & error pages"
      description="Drop-in templates for sign in, sign up, password recovery, and 404 states."
    >
      <ShowcaseSection title="Sign in">
        <div className="flex justify-center bg-gray-50 -m-8 p-12 rounded-2xl bg-grid">
          <LoginForm />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sign up">
        <div className="flex justify-center bg-gray-50 -m-8 p-12 rounded-2xl bg-grid">
          <SignupForm />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Forgot password">
        <div className="flex justify-center bg-gray-50 -m-8 p-12 rounded-2xl bg-grid">
          <ForgotPasswordForm />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="404 page">
        <div className="bg-gray-50 -m-8 p-12 rounded-2xl bg-dot">
          <NotFoundBlock />
        </div>
      </ShowcaseSection>
    </ShowcaseLayout>
  );
}
