"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RouletteWheel } from "./RouletteWheel";

const SPIN_DURATION_MS = 5200;
const MIN_TURNS = 6;
const MAX_EXTRA_TURNS = 3;

const SLICE_PALETTE = [
  "#e8b923",
  "#2f8347",
  "#5a3a22",
  "#f5d35a",
  "#226134",
  "#3d2818",
  "#b8901a",
  "#154021",
];

export function RouletteApp() {
  const [options, setOptions] = useState<string[]>([
    "Pizza",
    "Hambúrguer",
    "Sushi",
    "Açaí",
  ]);
  const [draft, setDraft] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const pendingWinner = useRef<string | null>(null);

  const canSpin = !spinning && options.length >= 2;

  function addOption() {
    const value = draft.trim();
    if (!value) return;
    if (options.length >= 24) return;
    setOptions((prev) => [...prev, value]);
    setDraft("");
  }

  function removeOption(index: number) {
    if (spinning) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
    setWinner(null);
  }

  function clearAll() {
    if (spinning) return;
    setOptions([]);
    setWinner(null);
  }

  function spin() {
    if (!canSpin) return;
    const n = options.length;
    const sliceAngle = 360 / n;
    const idx = Math.floor(Math.random() * n);

    const extraTurns = MIN_TURNS + Math.floor(Math.random() * MAX_EXTRA_TURNS);
    const jitter = (Math.random() - 0.5) * sliceAngle * 0.6;
    const baseRotation = rotation - (rotation % 360);
    const target =
      baseRotation +
      360 * extraTurns -
      (idx * sliceAngle + sliceAngle / 2) +
      jitter;

    pendingWinner.current = options[idx];
    setWinner(null);
    setSpinning(true);
    setRotation(target);
  }

  function handleSpinEnd() {
    setSpinning(false);
    if (pendingWinner.current) {
      setWinner(pendingWinner.current);
      pendingWinner.current = null;
    }
  }

  return (
    <section className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col items-center gap-6">
        <RouletteWheel
          options={options}
          rotation={rotation}
          spinning={spinning}
          durationMs={SPIN_DURATION_MS}
          onSpinEnd={handleSpinEnd}
        />

        <button
          type="button"
          onClick={spin}
          disabled={!canSpin}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-banana-500 px-10 py-4 text-base font-extrabold uppercase tracking-widest text-jungle-950 shadow-[0_12px_35px_-10px_rgba(245,211,90,0.7)] transition hover:bg-banana-400 hover:shadow-[0_18px_45px_-12px_rgba(245,211,90,0.8)] focus:outline-none focus:ring-4 focus:ring-banana-400/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <span aria-hidden>{spinning ? "🌀" : "🎯"}</span>
          {spinning ? "Girando..." : "Girar a roleta"}
        </button>

        <AnimatePresence>
          {winner && !spinning && (
            <motion.div
              key={winner}
              initial={{ scale: 0.7, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-full max-w-md rounded-3xl border border-banana-400/40 bg-jungle-900/80 p-6 text-center shadow-[0_24px_60px_-20px_rgba(245,211,90,0.4)] backdrop-blur"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-banana-400/80">
                A roleta decidiu
              </p>
              <p className="mt-3 break-words text-3xl font-extrabold text-white sm:text-4xl">
                {winner}
              </p>
              <p className="mt-3 text-sm text-jungle-700">🐒 banana entregue!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <aside className="flex flex-col gap-4 rounded-3xl border border-jungle-700/40 bg-jungle-950/60 p-5 backdrop-blur-md sm:p-6">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.25em] text-banana-400">
          Opções ({options.length})
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addOption();
              }
            }}
            disabled={spinning}
            placeholder="Ex: Café"
            maxLength={40}
            className="flex-1 rounded-2xl border border-jungle-700/60 bg-jungle-950/70 px-4 py-3 text-sm text-white placeholder:text-jungle-700/70 outline-none transition focus:border-banana-400 focus:ring-2 focus:ring-banana-400/40 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={addOption}
            disabled={spinning || !draft.trim() || options.length >= 24}
            className="rounded-2xl bg-banana-500 px-4 py-3 text-sm font-bold uppercase tracking-wider text-jungle-950 transition hover:bg-banana-400 focus:outline-none focus:ring-2 focus:ring-banana-400/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            +
          </button>
        </div>

        <ul className="flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-1">
          {options.length === 0 && (
            <li className="rounded-2xl border border-dashed border-jungle-700/40 px-4 py-6 text-center text-sm text-jungle-700">
              Adicione pelo menos 2 opções para girar.
            </li>
          )}
          {options.map((opt, i) => (
            <li
              key={`${opt}-${i}`}
              className="group flex items-center justify-between gap-2 rounded-2xl border border-jungle-700/40 bg-jungle-900/50 px-3 py-2 text-sm text-white transition hover:border-banana-400/40"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full"
                  style={{ background: SLICE_PALETTE[i % SLICE_PALETTE.length] }}
                  aria-hidden
                />
                <span className="truncate">{opt}</span>
              </span>
              <button
                type="button"
                onClick={() => removeOption(i)}
                disabled={spinning}
                aria-label={`Remover ${opt}`}
                className="rounded-full px-2 py-0.5 text-xs text-jungle-700 transition hover:bg-jungle-800 hover:text-banana-400 disabled:opacity-50"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {options.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            disabled={spinning}
            className="self-start rounded-full border border-jungle-700/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-jungle-700 transition hover:border-banana-400/40 hover:text-banana-400 disabled:opacity-50"
          >
            Limpar tudo
          </button>
        )}
      </aside>
    </section>
  );
}
