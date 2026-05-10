"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

interface MonkeyAnimationProps {
  isThinking: boolean;
}

export function MonkeyAnimation({ isThinking }: MonkeyAnimationProps) {
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/animations/monkey.json")
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;
    lottie.setSpeed(isThinking ? 2 : 1);
  }, [isThinking, animationData]);

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center"
      aria-label="Macaco"
    >
      <div
        className="absolute bottom-4 h-6 w-3/4 rounded-full bg-black/40 blur-xl"
        aria-hidden
      />
      {animationData ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <SvgMonkey isThinking={isThinking} />
      )}
    </div>
  );
}

function SvgMonkey({ isThinking }: { isThinking: boolean }) {
  const leftEyeRef = useRef<SVGCircleElement | null>(null);
  const rightEyeRef = useRef<SVGCircleElement | null>(null);
  const leftPupilRef = useRef<SVGCircleElement | null>(null);
  const rightPupilRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (isThinking) {
      let raf = 0;
      let t = 0;
      const tick = () => {
        t += 0.12;
        const px = Math.cos(t) * 4.5;
        const py = Math.sin(t * 1.3) * 3.5;
        if (leftPupilRef.current) {
          leftPupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
        }
        if (rightPupilRef.current) {
          rightPupilRef.current.style.transform = `translate(${-px}px, ${py}px)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    const handleMove = (event: PointerEvent) => {
      const pairs = [
        { eye: leftEyeRef.current, pupil: leftPupilRef.current },
        { eye: rightEyeRef.current, pupil: rightPupilRef.current },
      ];
      pairs.forEach(({ eye, pupil }) => {
        if (!eye || !pupil) return;
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.hypot(dx, dy) / 22, 5);
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        pupil.style.transform = `translate(${px}px, ${py}px)`;
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      [leftPupilRef.current, rightPupilRef.current].forEach((pupil) => {
        if (pupil) pupil.style.transform = "translate(0px, 0px)";
      });
    };
  }, [isThinking]);

  return (
    <svg
      viewBox="0 0 240 260"
      className={
        "h-full w-full " +
        (isThinking ? "animate-[wiggle_0.6s_ease-in-out_infinite]" : "")
      }
      style={{ filter: "drop-shadow(0 22px 32px rgba(0,0,0,0.5))" }}
    >
      <defs>
        <radialGradient id="headFur" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#8b5a35" />
          <stop offset="55%" stopColor="#5a3a22" />
          <stop offset="100%" stopColor="#2a1a0d" />
        </radialGradient>
        <radialGradient id="bodyFur" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#6b4226" />
          <stop offset="100%" stopColor="#2a1a0d" />
        </radialGradient>
        <radialGradient id="faceSkin" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#fbdfba" />
          <stop offset="100%" stopColor="#c89868" />
        </radialGradient>
        <radialGradient id="bellySkin" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#e8c190" />
          <stop offset="100%" stopColor="#a87a4a" />
        </radialGradient>
        <linearGradient id="bananaPeel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffe27a" />
          <stop offset="60%" stopColor="#f5d35a" />
          <stop offset="100%" stopColor="#b8901a" />
        </linearGradient>
      </defs>

      {/* Tail */}
      <path
        d="M 195 175 Q 230 165 225 130 Q 220 100 195 105"
        stroke="url(#bodyFur)"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 195 175 Q 228 167 222 132"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Body */}
      <ellipse cx="120" cy="190" rx="56" ry="50" fill="url(#bodyFur)" />
      <ellipse cx="120" cy="200" rx="34" ry="32" fill="url(#bellySkin)" />

      {/* Legs */}
      <ellipse cx="92" cy="235" rx="16" ry="14" fill="url(#bodyFur)" />
      <ellipse cx="148" cy="235" rx="16" ry="14" fill="url(#bodyFur)" />
      <ellipse cx="92" cy="240" rx="11" ry="7" fill="#a87a4a" />
      <ellipse cx="148" cy="240" rx="11" ry="7" fill="#a87a4a" />

      {/* Left arm holding a banana */}
      <path
        d="M 78 175 Q 50 175 42 150 Q 38 132 52 122"
        stroke="url(#bodyFur)"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      {/* Banana */}
      <g transform="translate(28 100) rotate(-18)">
        <path
          d="M2 18 Q 6 50 44 56 Q 52 56 52 49 Q 52 46 48 45 Q 18 40 12 14 Q 11 8 6 8 Q 0 8 2 18 Z"
          fill="url(#bananaPeel)"
          stroke="#7a5d10"
          strokeWidth="1.5"
        />
        <path
          d="M6 16 Q 14 42 42 50"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse cx="6" cy="9" rx="3" ry="2.5" fill="#3d2818" />
      </g>

      {/* Right arm */}
      <path
        d="M 160 175 Q 190 180 195 200"
        stroke="url(#bodyFur)"
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="197" cy="205" r="11" fill="#a87a4a" />

      {/* Neck shadow */}
      <ellipse cx="120" cy="145" rx="28" ry="10" fill="#1a0e05" opacity="0.45" />

      {/* Ears */}
      <circle cx="56" cy="92" r="20" fill="#3d2818" />
      <circle cx="56" cy="92" r="11" fill="#d8a878" />
      <circle cx="184" cy="92" r="20" fill="#3d2818" />
      <circle cx="184" cy="92" r="11" fill="#d8a878" />

      {/* Head */}
      <ellipse cx="120" cy="110" rx="68" ry="62" fill="url(#headFur)" />

      {/* Top tuft */}
      <path
        d="M 96 56 Q 105 42 115 55 Q 122 40 130 56 Q 140 42 148 60"
        stroke="#2a1a0d"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Face skin (peanut shape) */}
      <path
        d="M 78 120 Q 70 100 100 92 Q 120 88 140 92 Q 170 100 162 120 Q 170 150 140 162 Q 120 168 100 162 Q 70 150 78 120 Z"
        fill="url(#faceSkin)"
      />

      {/* Eye sockets */}
      <ellipse cx="100" cy="108" rx="16" ry="15" fill="#2a1a0d" opacity="0.22" />
      <ellipse cx="140" cy="108" rx="16" ry="15" fill="#2a1a0d" opacity="0.22" />

      {/* Eye whites */}
      <circle ref={leftEyeRef} cx="100" cy="108" r="13" fill="#ffffff" />
      <circle ref={rightEyeRef} cx="140" cy="108" r="13" fill="#ffffff" />

      {/* Pupils */}
      <circle
        ref={leftPupilRef}
        cx="100"
        cy="108"
        r="6"
        fill="#1a1a1a"
        style={{ transition: "transform 120ms ease-out" }}
      />
      <circle
        ref={rightPupilRef}
        cx="140"
        cy="108"
        r="6"
        fill="#1a1a1a"
        style={{ transition: "transform 120ms ease-out" }}
      />
      <circle cx="102" cy="105" r="2" fill="#ffffff" pointerEvents="none" />
      <circle cx="142" cy="105" r="2" fill="#ffffff" pointerEvents="none" />

      {/* Brows */}
      <path
        d={
          isThinking
            ? "M 88 90 Q 100 84 112 92"
            : "M 88 92 Q 100 88 112 94"
        }
        stroke="#2a1a0d"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={
          isThinking
            ? "M 128 92 Q 140 84 152 90"
            : "M 128 94 Q 140 88 152 92"
        }
        stroke="#2a1a0d"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Nostrils */}
      <ellipse cx="113" cy="138" rx="2.2" ry="3" fill="#3d2818" />
      <ellipse cx="127" cy="138" rx="2.2" ry="3" fill="#3d2818" />

      {/* Mouth */}
      <path
        d={
          isThinking
            ? "M 106 154 Q 120 151 134 154"
            : "M 104 150 Q 120 165 136 150"
        }
        stroke="#3d2818"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Subtle cheek blush */}
      <circle cx="86" cy="135" r="6" fill="#e89b7a" opacity="0.5" />
      <circle cx="154" cy="135" r="6" fill="#e89b7a" opacity="0.5" />
    </svg>
  );
}
