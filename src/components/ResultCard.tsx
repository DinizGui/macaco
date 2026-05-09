"use client";

import { motion } from "framer-motion";

interface ResultCardProps {
  resultado: string;
  isTie: boolean;
  onReset: () => void;
}

export function ResultCard({ resultado, isTie, onReset }: ResultCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="w-full max-w-md rounded-3xl border border-banana-400/40 bg-jungle-900/80 p-6 text-center shadow-[0_20px_60px_-20px_rgba(245,211,90,0.35)] backdrop-blur"
    >
      {isTie ? (
        <p className="text-xl font-medium text-banana-400">{resultado}</p>
      ) : (
        <>
          <p className="text-sm uppercase tracking-[0.25em] text-banana-400/80">
            O macaco escolheu:
          </p>
          <p className="mt-3 break-words text-3xl font-extrabold text-white sm:text-4xl">
            {resultado}
          </p>
        </>
      )}

      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-banana-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-jungle-950 transition hover:bg-banana-400 focus:outline-none focus:ring-4 focus:ring-banana-400/40"
      >
        Perguntar de novo
      </button>
    </motion.div>
  );
}
