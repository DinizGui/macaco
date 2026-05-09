"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type DecisionStatus = "idle" | "thinking" | "decided";

const TIE_MESSAGE = "O macaco não sabe, são iguais! 🙈";
const THINKING_MS = 2500;

export interface UseMonkeyDecisionResult {
  status: DecisionStatus;
  resultado: string | null;
  decide: (opcao1: string, opcao2: string) => void;
  reset: () => void;
}

export function useMonkeyDecision(): UseMonkeyDecisionResult {
  const [status, setStatus] = useState<DecisionStatus>("idle");
  const [resultado, setResultado] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const decide = useCallback((opcao1: string, opcao2: string) => {
    const a = opcao1.trim();
    const b = opcao2.trim();
    if (!a || !b) return;

    setStatus("thinking");
    setResultado(null);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (a.toLowerCase() === b.toLowerCase()) {
        setResultado(TIE_MESSAGE);
      } else {
        setResultado(Math.random() < 0.5 ? a : b);
      }
      setStatus("decided");
    }, THINKING_MS);
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus("idle");
    setResultado(null);
  }, []);

  return { status, resultado, decide, reset };
}
