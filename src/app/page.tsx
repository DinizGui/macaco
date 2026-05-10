import { MonkeyAsker } from "@/components/MonkeyAsker";

export default function Home() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-5 py-12 sm:py-20">
      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-banana-400/30 bg-jungle-900/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-banana-400 backdrop-blur">
          <span aria-hidden>🍌</span> decisão à la selva
        </span>
        <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="banana-text">Pergunte ao</span>{" "}
          <span className="text-white">Macaco</span>
          <span aria-hidden className="ml-2 inline-block align-middle text-4xl sm:text-6xl">
            🐒
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-jungle-700 sm:text-lg">
          Não consegue decidir? Solta as bananas, deixa o macaco escolher por você.
          Duas opções, um veredito.
        </p>
      </header>

      <div className="relative w-full max-w-3xl">
        <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-jungle-700/30 via-jungle-900/10 to-bark-700/30 blur-2xl" />
        <div className="rounded-[2rem] border border-jungle-700/40 bg-jungle-950/60 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-10">
          <MonkeyAsker />
        </div>
      </div>

      <section className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        <FeatureCard
          icon="⚖️"
          title="Imparcial"
          text="O macaco não tem preferência. Cara ou coroa, mas com mais carisma."
        />
        <FeatureCard
          icon="🍌"
          title="Rápido"
          text="Pensa por uns segundos, fala a resposta. Sem grupo do WhatsApp."
        />
        <FeatureCard
          icon="🎯"
          title="Tem roleta"
          text="Mais de duas opções? Vai pra Roleta no menu acima."
        />
      </section>

      <footer className="text-xs text-jungle-700/70">
        Feito com bananas, Next.js e zero responsabilidade pelas escolhas
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-jungle-700/40 bg-jungle-900/40 p-4 backdrop-blur transition hover:border-banana-400/40 hover:bg-jungle-900/60">
      <div className="text-2xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-banana-400">
        {title}
      </h3>
      <p className="mt-1 text-sm text-jungle-700">{text}</p>
    </div>
  );
}
