"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { UploadCloud, FileIcon, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/* === FILE UPLOAD === */
export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  onFiles?: (files: File[]) => void;
  hint?: string;
}

export function FileUpload({
  className,
  accept,
  multiple,
  maxSize,
  onFiles,
  hint,
  ...props
}: FileUploadProps) {
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const files = Array.from(list).filter((f) => !maxSize || f.size <= maxSize);
    if (files.length) onFiles?.(files);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition",
        dragOver
          ? "border-brand-500 bg-brand-25"
          : "border-gray-300 bg-gray-25 hover:border-brand-400 hover:bg-brand-25",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />
      <div className="size-10 rounded-lg bg-white border border-gray-200 shadow-xs flex items-center justify-center mb-3">
        <UploadCloud className="size-5 text-gray-600" />
      </div>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-brand-700">Click to upload</span> or drag and drop
      </p>
      <p className="mt-1 text-xs text-gray-500">{hint || "Any file type"}</p>
    </div>
  );
}

export interface UploadedFileItemProps {
  name: string;
  size: number;
  progress?: number; // 0-100
  status?: "uploading" | "complete" | "error";
  onRemove?: () => void;
}

export function UploadedFileItem({ name, size, progress = 100, status = "complete", onRemove }: UploadedFileItemProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
      <div className="size-9 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
        <FileIcon className="size-4 text-brand-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-700 truncate">{name}</p>
          {onRemove && (
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 transition shrink-0"
              aria-label="Remove file"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500">{formatSize(size)}</p>
        {status === "uploading" && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700 tabular-nums">{progress}%</span>
          </div>
        )}
        {status === "error" && (
          <p className="mt-1 text-xs text-error-600 flex items-center gap-1">
            <AlertCircle className="size-3" /> Upload failed
          </p>
        )}
      </div>
    </div>
  );
}

/* === SKELETON === */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("rounded-md animate-shimmer", className)} />;
}

/* === TOAST === */
export interface Toast {
  id: string;
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const toast = React.useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const newToast: Toast = { id, duration: 5000, ...t };
    setToasts((prev) => [...prev, newToast]);
    if (newToast.duration) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, newToast.duration);
    }
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const iconMap = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    error: AlertCircle,
  };

  const colorMap = {
    info: "text-brand-600",
    success: "text-success-600",
    warning: "text-warning-600",
    error: "text-error-600",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
            {toasts.map((t) => {
              const Icon = iconMap[t.variant || "info"];
              return (
                <div
                  key={t.id}
                  role="status"
                  className="pointer-events-auto flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in-up"
                >
                  <Icon className={cn("size-5 shrink-0 mt-0.5", colorMap[t.variant || "info"])} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                    {t.description && (
                      <p className="mt-0.5 text-sm text-gray-600">{t.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="text-gray-400 hover:text-gray-600 transition shrink-0"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
