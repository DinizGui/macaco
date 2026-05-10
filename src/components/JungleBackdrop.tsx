export function JungleBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Leaf className="absolute -left-10 top-10 h-48 w-48 text-jungle-700/30 [animation:leaf-sway_6s_ease-in-out_infinite]" />
      <Leaf className="absolute -right-12 top-32 h-56 w-56 -scale-x-100 text-jungle-700/25 [animation:leaf-sway_7s_ease-in-out_infinite]" />
      <Leaf className="absolute -left-16 bottom-10 h-60 w-60 rotate-180 text-jungle-700/20 [animation:leaf-sway_8s_ease-in-out_infinite]" />
      <Banana className="absolute right-[8%] top-[18%] h-10 w-10 text-banana-400/40 [animation:float-y_4s_ease-in-out_infinite]" />
      <Banana className="absolute left-[12%] bottom-[22%] h-8 w-8 -rotate-12 text-banana-400/30 [animation:float-y_5s_ease-in-out_infinite]" />
    </div>
  );
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
      <path d="M50 5 C 20 25, 10 60, 50 95 C 90 60, 80 25, 50 5 Z" />
      <path
        d="M50 10 L50 90"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M50 25 Q 35 30 28 45 M50 40 Q 33 45 22 60 M50 55 Q 35 60 26 73 M50 25 Q 65 30 72 45 M50 40 Q 67 45 78 60 M50 55 Q 65 60 74 73"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  );
}

function Banana({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M10 20 Q 14 50 50 56 Q 56 56 56 50 Q 56 48 53 47 Q 22 42 17 18 Q 16 14 12 14 Q 9 14 10 20 Z"
        fill="currentColor"
      />
      <path
        d="M14 22 Q 22 44 48 50"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
