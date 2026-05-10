import { RouletteApp } from "@/components/RouletteApp";

export const metadata = {
  title: "Roleta do Macaco 🎯",
  description: "Coloque suas opções e deixe a roleta decidir.",
};

export default function RoletaPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-5 py-12 sm:py-16">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-banana-400/30 bg-jungle-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-banana-400 backdrop-blur">
          <span aria-hidden>🎯</span> roleta da selva
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="banana-text">Roleta</span>{" "}
          <span className="text-white">do Macaco</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-jungle-700 sm:text-lg">
          Coloque quantas opções quiser, gire a roleta e que vença o destino.
        </p>
      </header>

      <RouletteApp />
    </main>
  );
}
