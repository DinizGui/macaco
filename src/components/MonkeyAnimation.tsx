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
      .catch(() => {
        /* fallback SVG monkey is shown */
      });
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
      className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center"
      aria-label="Macaco"
    >
      {animationData ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          autoplay
          style={{ width: 300, height: 300 }}
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
        const px = Math.cos(t) * 5;
        const py = Math.sin(t * 1.3) * 4;
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
        const dist = Math.min(Math.hypot(dx, dy) / 18, 6);
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
      viewBox="0 0 200 200"
      width="300"
      height="300"
      className={isThinking ? "animate-[wiggle_0.6s_ease-in-out_infinite]" : ""}
      style={{ filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))" }}
    >
      <defs>
        <radialGradient id="headGradient" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#7a4d2c" />
          <stop offset="100%" stopColor="#3d2818" />
        </radialGradient>
        <radialGradient id="faceGradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#f7dab4" />
          <stop offset="100%" stopColor="#d6a878" />
        </radialGradient>
      </defs>

      {/* Ears */}
      <circle cx="38" cy="78" r="22" fill="#3d2818" />
      <circle cx="38" cy="78" r="13" fill="#d6a878" />
      <circle cx="162" cy="78" r="22" fill="#3d2818" />
      <circle cx="162" cy="78" r="13" fill="#d6a878" />

      {/* Head */}
      <ellipse cx="100" cy="105" rx="64" ry="60" fill="url(#headGradient)" />

      {/* Face area */}
      <ellipse cx="100" cy="125" rx="46" ry="42" fill="url(#faceGradient)" />

      {/* Eye sockets shadow */}
      <ellipse cx="80" cy="98" rx="17" ry="16" fill="#2a1a0d" opacity="0.25" />
      <ellipse cx="120" cy="98" rx="17" ry="16" fill="#2a1a0d" opacity="0.25" />

      {/* Eye whites */}
      <circle ref={leftEyeRef} cx="80" cy="98" r="14" fill="#ffffff" />
      <circle ref={rightEyeRef} cx="120" cy="98" r="14" fill="#ffffff" />

      {/* Pupils — these translate to follow the cursor */}
      <circle
        ref={leftPupilRef}
        cx="80"
        cy="98"
        r="6.5"
        fill="#1a1a1a"
        style={{ transition: "transform 120ms ease-out" }}
      />
      <circle
        ref={rightPupilRef}
        cx="120"
        cy="98"
        r="6.5"
        fill="#1a1a1a"
        style={{ transition: "transform 120ms ease-out" }}
      />

      {/* Eye highlights — sit slightly off-center for life */}
      <circle cx="83" cy="95" r="2" fill="#ffffff" pointerEvents="none" />
      <circle cx="123" cy="95" r="2" fill="#ffffff" pointerEvents="none" />

      {/* Nostrils */}
      <ellipse cx="93" cy="132" rx="2" ry="3" fill="#3d2818" />
      <ellipse cx="107" cy="132" rx="2" ry="3" fill="#3d2818" />

      {/* Mouth */}
      <path
        d={
          isThinking
            ? "M 86 148 Q 100 145 114 148"
            : "M 84 146 Q 100 160 116 146"
        }
        stroke="#3d2818"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
