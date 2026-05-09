import { MonkeyAsker } from "@/components/MonkeyAsker";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-10 px-5 py-10 sm:py-16">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Pergunte ao Macaco{" "}
          <span aria-hidden className="inline-block">
            🐒
          </span>
        </h1>
        <p className="mt-3 text-base text-jungle-700/90 sm:text-lg">
          Não consegue decidir? Deixa o macaco escolher por você.
        </p>
      </header>

      <MonkeyAsker />

      <footer className="text-xs text-jungle-700/70">
        Feito com bananas e Next.js
      </footer>
    </main>
  );
}
