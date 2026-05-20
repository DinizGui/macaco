"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonkeyAnimation } from "./MonkeyAnimation";
import { OptionInput } from "./OptionInput";
import { ResultCard } from "./ResultCard";
import { useMonkeyDecision } from "@/hooks/useMonkeyDecision";

const TIE_MESSAGE = "O macaco não sabe, são iguais! 🙈";

export function MonkeyAsker() {
  const [opcao1, setOpcao1] = useState("");
  const [opcao2, setOpcao2] = useState("");
  const { status, resultado, decide, reset } = useMonkeyDecision();

  const canAsk =
    status === "idle" && opcao1.trim().length > 0 && opcao2.trim().length > 0;

  function handleAsk() {
    decide(opcao1, opcao2);
  }

  function handleReset() {
    reset();
    setOpcao1("");
    setOpcao2("");
  }

  return (
    <section className="flex w-full max-w-3xl flex-col items-center gap-8">
      <MonkeyAnimation status={status} />

      <AnimatePresence mode="wait">
        {status === "decided" && resultado ? (
          <ResultCard
            key="result"
            resultado={resultado}
            isTie={resultado === TIE_MESSAGE}
            onReset={handleReset}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col gap-6"
          >
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <OptionInput
                  label="Opção 1"
                  value={opcao1}
                  onChange={setOpcao1}
                  disabled={status !== "idle"}
                  placeholder="Ex: Pizza"
                />
              </div>
              <div
                className="select-none pb-1 text-center text-lg font-bold uppercase tracking-widest text-banana-400 sm:px-2 sm:pb-4"
                aria-hidden
              >
                ou
              </div>
              <div className="flex-1">
                <OptionInput
                  label="Opção 2"
                  value={opcao2}
                  onChange={setOpcao2}
                  disabled={status !== "idle"}
                  placeholder="Ex: Hambúrguer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAsk}
              disabled={!canAsk}
              className="mx-auto inline-flex items-center justify-center rounded-full bg-banana-500 px-8 py-4 text-base font-extrabold uppercase tracking-widest text-jungle-950 shadow-[0_10px_30px_-10px_rgba(245,211,90,0.6)] transition hover:bg-banana-400 hover:shadow-[0_18px_40px_-12px_rgba(245,211,90,0.7)] focus:outline-none focus:ring-4 focus:ring-banana-400/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {status === "thinking"
                ? "🐒 Pensando..."
                : "🐒 Perguntar ao Macaco"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
