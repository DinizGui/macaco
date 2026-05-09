"use client";

import { useId } from "react";

interface OptionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function OptionInput({
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
}: OptionInputProps) {
  const inputId = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold uppercase tracking-wider text-banana-400"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={80}
        className="w-full rounded-2xl border border-jungle-700/60 bg-jungle-950/60 px-4 py-3 text-base text-white placeholder:text-jungle-700/70 outline-none transition focus:border-banana-400 focus:ring-2 focus:ring-banana-400/40 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}
