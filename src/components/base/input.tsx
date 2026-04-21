"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leadingIcon, trailingIcon, prefix, suffix, invalid, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center w-full h-10 bg-white border rounded-lg shadow-xs transition-shadow",
          "focus-within:ring-4 focus-within:ring-brand-100 focus-within:border-brand-300",
          invalid
            ? "border-error-300 focus-within:ring-error-100 focus-within:border-error-300"
            : "border-gray-300",
          props.disabled && "bg-gray-50 cursor-not-allowed opacity-70"
        )}
      >
        {leadingIcon && (
          <span className="pl-3 text-gray-400 [&>svg]:size-5">{leadingIcon}</span>
        )}
        {prefix && (
          <span className="pl-3 text-sm text-gray-500 select-none">{prefix}</span>
        )}
        <input
          ref={ref}
          className={cn(
            "flex-1 h-full px-3 text-base text-gray-900 placeholder:text-gray-500 bg-transparent outline-none disabled:cursor-not-allowed",
            (leadingIcon || prefix) && "pl-2",
            (trailingIcon || suffix) && "pr-2",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="pr-3 text-sm text-gray-500 select-none">{suffix}</span>
        )}
        {trailingIcon && (
          <span className="pr-3 text-gray-400 [&>svg]:size-5">{trailingIcon}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[80px] px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-500 bg-white border rounded-lg shadow-xs transition-shadow outline-none resize-y",
          "focus:ring-4 focus:ring-brand-100 focus:border-brand-300",
          invalid
            ? "border-error-300 focus:ring-error-100 focus:border-error-300"
            : "border-gray-300",
          props.disabled && "bg-gray-50 cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700 mb-1.5", className)}
      {...props}
    >
      {children}
      {required && <span className="text-brand-600 ml-0.5">*</span>}
    </label>
  );
}

export function HelperText({
  className,
  invalid,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { invalid?: boolean }) {
  return (
    <p
      className={cn(
        "mt-1.5 text-sm",
        invalid ? "text-error-600" : "text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required,
  helperText,
  error,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {(error || helperText) && (
        <HelperText invalid={!!error}>{error || helperText}</HelperText>
      )}
    </div>
  );
}
