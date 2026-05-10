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
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data);
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
      ) : null}
    </div>
  );
}
