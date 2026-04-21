"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-xs hover:bg-brand-700 active:bg-brand-800",
        secondary:
          "bg-white text-gray-700 border border-gray-300 shadow-xs hover:bg-gray-50 active:bg-gray-100",
        tertiary:
          "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200",
        link:
          "bg-transparent text-brand-700 underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-error-600 text-white shadow-xs hover:bg-error-700 active:bg-error-800",
        "destructive-secondary":
          "bg-white text-error-700 border border-error-300 shadow-xs hover:bg-error-50",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-lg [&>svg]:size-4",
        md: "h-10 px-3.5 text-sm rounded-lg [&>svg]:size-4",
        lg: "h-11 px-4 text-base rounded-lg [&>svg]:size-5",
        xl: "h-12 px-4.5 text-base rounded-lg [&>svg]:size-5",
        "2xl": "h-14 px-5.5 text-lg rounded-xl [&>svg]:size-6",
        "icon-sm": "size-9 rounded-lg [&>svg]:size-4",
        "icon-md": "size-10 rounded-lg [&>svg]:size-5",
        "icon-lg": "size-11 rounded-lg [&>svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
