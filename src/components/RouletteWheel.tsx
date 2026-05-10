"use client";

import { useMemo } from "react";

interface RouletteWheelProps {
  options: string[];
  rotation: number;
  spinning: boolean;
  durationMs: number;
  onSpinEnd: () => void;
}

const SLICE_COLORS = [
  "#e8b923",
  "#2f8347",
  "#5a3a22",
  "#f5d35a",
  "#226134",
  "#3d2818",
  "#b8901a",
  "#154021",
];

export function RouletteWheel({
  options,
  rotation,
  spinning,
  durationMs,
  onSpinEnd,
}: RouletteWheelProps) {
  const size = 360; // viewBox units, not pixels — wrapper controls real size
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const labelR = r * 0.62;

  const slices = useMemo(() => {
    const n = Math.max(options.length, 1);
    const a = 360 / n;
    return options.length === 0
      ? [
          {
            path: `M ${cx} ${cy} m -${r} 0 a ${r} ${r} 0 1 0 ${
              r * 2
            } 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
            color: "#11331a",
            label: "Adicione opções",
            midAngle: 0,
            isFull: true,
          },
        ]
      : options.map((label, i) => {
          if (options.length === 1) {
            return {
              path: `M ${cx} ${cy} m -${r} 0 a ${r} ${r} 0 1 0 ${
                r * 2
              } 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
              color: SLICE_COLORS[i % SLICE_COLORS.length],
              label,
              midAngle: 0,
              isFull: true,
            };
          }
          const start = -90 + i * a;
          const end = start + a;
          const rad = (deg: number) => (deg * Math.PI) / 180;
          const x1 = cx + r * Math.cos(rad(start));
          const y1 = cy + r * Math.sin(rad(start));
          const x2 = cx + r * Math.cos(rad(end));
          const y2 = cy + r * Math.sin(rad(end));
          const largeArc = a > 180 ? 1 : 0;
          return {
            path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
            color: SLICE_COLORS[i % SLICE_COLORS.length],
            label,
            midAngle: start + a / 2,
            isFull: false,
          };
        });
  }, [options, cx, cy, r]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]">
      {/* Outer halo */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-banana-400/20 via-jungle-700/10 to-bark-700/20 blur-2xl" />

      {/* Bulb ring */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const br = r + 4;
          const x = cx + br * Math.cos(rad);
          const y = cy + br * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill="#f5d35a"
              opacity={0.6}
              style={{ filter: "drop-shadow(0 0 6px rgba(245,211,90,0.7))" }}
            />
          );
        })}
      </svg>

      {/* Wheel */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative h-full w-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`
            : "none",
          filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.5))",
        }}
        onTransitionEnd={(e) => {
          if (e.propertyName === "transform" && spinning) onSpinEnd();
        }}
      >
        <defs>
          <radialGradient id="wheelShade" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r + 2} fill="#0d2814" />

        {slices.map((s, i) => {
          // Flip text so it never reads upside down.
          const flip = Math.sin((s.midAngle * Math.PI) / 180) > 0;
          const maxChars = options.length <= 6 ? 14 : options.length <= 10 ? 11 : 8;
          return (
            <g key={i}>
              <path d={s.path} fill={s.color} stroke="#07170c" strokeWidth={2} />
              {!s.isFull && (
                <g
                  transform={`translate(${cx} ${cy}) rotate(${s.midAngle}) translate(${labelR} 0) rotate(${flip ? -90 : 90})`}
                >
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#0a1f0f"
                    style={{
                      font: "700 15px ui-sans-serif, system-ui",
                      paintOrder: "stroke",
                      stroke: "rgba(255,255,255,0.45)",
                      strokeWidth: 2.5,
                    }}
                  >
                    {truncate(s.label, maxChars)}
                  </text>
                </g>
              )}
              {s.isFull && (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#f5d35a"
                  opacity={0.7}
                  style={{ font: "700 16px ui-sans-serif, system-ui" }}
                >
                  {s.label}
                </text>
              )}
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={r} fill="url(#wheelShade)" />
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={22} fill="#2a1a0d" stroke="#f5d35a" strokeWidth={3} />
        <circle cx={cx} cy={cy} r={8} fill="#f5d35a" />
      </svg>

      {/* Pointer */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ transform: "translate(-50%, -8px)" }}
        aria-hidden
      >
        <svg width={36} height={48} viewBox="0 0 36 48">
          <defs>
            <linearGradient id="pointerGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffe27a" />
              <stop offset="100%" stopColor="#b8901a" />
            </linearGradient>
          </defs>
          <path
            d="M 18 46 L 4 12 Q 4 2 18 2 Q 32 2 32 12 Z"
            fill="url(#pointerGrad)"
            stroke="#2a1a0d"
            strokeWidth={2}
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.5))" }}
          />
          <circle cx={18} cy={14} r={4} fill="#2a1a0d" />
        </svg>
      </div>
    </div>
  );
}

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}
