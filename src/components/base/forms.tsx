"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/* === CHECKBOX === */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md";
  indeterminate?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size = "md", indeterminate, label, description, id, ...props }, ref) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => localRef.current!, []);

    React.useEffect(() => {
      if (localRef.current) localRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);

    const inputId = id ?? React.useId();
    const dim = size === "sm" ? "size-4" : "size-5";
    const iconDim = size === "sm" ? "size-3" : "size-3.5";

    const inputEl = (
      <span className="relative inline-flex shrink-0">
        <input
          ref={localRef}
          id={inputId}
          type="checkbox"
          className={cn(
            "peer appearance-none border border-gray-300 bg-white rounded-md cursor-pointer transition",
            "checked:bg-brand-600 checked:border-brand-600 indeterminate:bg-brand-600 indeterminate:border-brand-600",
            "hover:border-brand-600 hover:bg-brand-50",
            "checked:hover:bg-brand-700",
            "focus-visible:ring-4 focus-visible:ring-brand-100",
            "disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed",
            dim,
            className
          )}
          {...props}
        />
        {indeterminate ? (
          <Minus
            className={cn(
              "absolute inset-0 m-auto text-white pointer-events-none",
              iconDim
            )}
          />
        ) : (
          <Check
            className={cn(
              "absolute inset-0 m-auto text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition",
              iconDim
            )}
            strokeWidth={3}
          />
        )}
      </span>
    );

    if (!label && !description) return inputEl;

    return (
      <div className="flex items-start gap-2">
        <div className="pt-0.5">{inputEl}</div>
        <div className="flex-1">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700 cursor-pointer block">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

/* === RADIO === */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md";
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size = "md", label, description, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const dim = size === "sm" ? "size-4" : "size-5";
    const dotDim = size === "sm" ? "size-1.5" : "size-2";

    const inputEl = (
      <span className="relative inline-flex shrink-0">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className={cn(
            "peer appearance-none border border-gray-300 bg-white rounded-full cursor-pointer transition",
            "checked:border-brand-600 checked:bg-brand-50",
            "hover:border-brand-600 hover:bg-brand-50",
            "focus-visible:ring-4 focus-visible:ring-brand-100",
            "disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed",
            dim,
            className
          )}
          {...props}
        />
        <span
          className={cn(
            "absolute inset-0 m-auto rounded-full bg-brand-600 pointer-events-none opacity-0 peer-checked:opacity-100 transition",
            dotDim
          )}
        />
      </span>
    );

    if (!label && !description) return inputEl;

    return (
      <div className="flex items-start gap-2">
        <div className="pt-0.5">{inputEl}</div>
        <div className="flex-1">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700 cursor-pointer block">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Radio.displayName = "Radio";

export function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="radiogroup"
      className={cn(
        orientation === "vertical" ? "flex flex-col gap-3" : "flex flex-row gap-4",
        className
      )}
      {...props}
    />
  );
}

/* === TOGGLE / SWITCH === */
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md";
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, size = "md", label, description, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const trackDim = size === "sm" ? "w-9 h-5" : "w-11 h-6";
    const thumbDim = size === "sm" ? "size-4 peer-checked:translate-x-4" : "size-5 peer-checked:translate-x-5";

    const switchEl = (
      <label
        htmlFor={inputId}
        className={cn(
          "relative inline-flex items-center shrink-0 cursor-pointer",
          props.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            "rounded-full bg-gray-200 transition-colors peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100",
            trackDim
          )}
        />
        <span
          className={cn(
            "absolute left-0.5 rounded-full bg-white shadow-sm transition-transform",
            thumbDim
          )}
        />
      </label>
    );

    if (!label && !description) return switchEl;

    return (
      <div className="flex items-start gap-3">
        {switchEl}
        <div className="flex-1">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700 cursor-pointer block">
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    );
  }
);
Toggle.displayName = "Toggle";
