"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-gray-100 text-gray-600 font-semibold rounded-full ring-1 ring-inset ring-black/5",
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-8 text-sm",
        md: "size-10 text-base",
        lg: "size-12 text-lg",
        xl: "size-14 text-xl",
        "2xl": "size-16 text-2xl",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  status?: "online" | "offline" | "away" | "busy";
}

export function Avatar({
  className,
  size,
  src,
  alt,
  initials,
  status,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <span className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ""}
          className="size-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials ?? "?"}</span>
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 size-1/4 rounded-full ring-2 ring-white",
            {
              "bg-success-500": status === "online",
              "bg-gray-400": status === "offline",
              "bg-warning-500": status === "away",
              "bg-error-500": status === "busy",
            }
          )}
        />
      )}
    </span>
  );
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: VariantProps<typeof avatarVariants>["size"];
  max?: number;
  avatars: { src?: string; initials?: string; alt?: string }[];
}

export function AvatarGroup({
  className,
  size = "md",
  max = 4,
  avatars,
  ...props
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visible.map((a, i) => (
        <Avatar
          key={i}
          size={size}
          src={a.src}
          initials={a.initials}
          alt={a.alt}
          className="ring-2 ring-white"
        />
      ))}
      {remaining > 0 && (
        <Avatar size={size} className="ring-2 ring-white bg-gray-50">
          <span>+{remaining}</span>
        </Avatar>
      )}
    </div>
  );
}
