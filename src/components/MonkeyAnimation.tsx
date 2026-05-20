"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import type { DecisionStatus } from "@/hooks/useMonkeyDecision";

interface MonkeyAnimationProps {
  status: DecisionStatus;
}

type LottieLayer = {
  nm?: string;
  ip?: number;
  op?: number;
  shapes?: unknown[];
  ks?: Record<string, unknown> & {
    p?: { s?: boolean; x?: unknown; y?: unknown };
  };
};

type LottieData = {
  op: number;
  layers: LottieLayer[];
};

function lockShapesToFirstKeyframe(layer: LottieLayer | undefined) {
  if (!layer?.shapes) return;
  const walk = (items: unknown[]) => {
    for (const raw of items) {
      const it = raw as { ty?: string; it?: unknown[]; ks?: { a?: number; k?: unknown[]; ix?: number } };
      if (it.ty === "gr" && it.it) walk(it.it);
      if (it.ty === "sh" && it.ks && it.ks.a === 1 && Array.isArray(it.ks.k)) {
        const first = it.ks.k[0] as { s?: unknown[] } | undefined;
        if (first && first.s && first.s[0]) {
          (it as { ks: unknown }).ks = { a: 0, k: first.s[0], ix: it.ks.ix };
        }
      }
    }
  };
  walk(layer.shapes);
}

function apply67Gesture(input: unknown): LottieData {
  const data = input as LottieData;
  const find = (nm: string) => data.layers.find((l) => l.nm === nm);

  const armR = find("arm R");
  const armL = find("arm L");
  const eyesClosed = find("eyes closed");
  const eyes = find("eyes ");
  const mouth = find("mouth ");
  const head = find("head ");
  const face = find("face");
  const nullAll = find("Null All");
  const nullFace = find("Null face");

  lockShapesToFirstKeyframe(armR);
  lockShapesToFirstKeyframe(armL);
  lockShapesToFirstKeyframe(mouth);
  lockShapesToFirstKeyframe(head);
  lockShapesToFirstKeyframe(face);
  lockShapesToFirstKeyframe(eyes);

  if (eyesClosed) {
    (eyesClosed.ks as Record<string, unknown>).o = { a: 0, k: 0, ix: 11 };
    eyesClosed.ip = 9999;
    eyesClosed.op = 9999;
  }
  if (eyes) {
    (eyes.ks as Record<string, unknown>).o = { a: 0, k: 100, ix: 11 };
    eyes.ip = 0;
    eyes.op = 138;
  }

  const period = 30;
  const beats = 4;

  const bouncyY = (baseY: number, ampUp: number, phaseFlipped: boolean) => {
    const ks: Array<Record<string, unknown>> = [];
    for (let i = 0; i <= beats; i++) {
      const t = i * period;
      const goingUp = phaseFlipped ? i % 2 === 1 : i % 2 === 0;
      const y = baseY + (goingUp ? -ampUp : ampUp * 0.35);
      const kf: Record<string, unknown> = { t, s: [y] };
      if (i < beats) {
        kf.i = { x: [0.34], y: [1.4] };
        kf.o = { x: [0.66], y: [0] };
      }
      ks.push(kf);
    }
    return { a: 1, k: ks, ix: 4 };
  };

  const staticX = (x: number) => ({ a: 0, k: x, ix: 3 });

  type AnimKs = { p?: { s?: boolean; x?: unknown; y?: unknown }; r?: unknown };
  const armRKs = armR?.ks as AnimKs | undefined;
  if (armRKs?.p?.s) {
    armRKs.p.x = staticX(260);
    armRKs.p.y = bouncyY(110.597, 110, false);
    armRKs.r = {
      a: 1,
      k: [
        { t: 0, s: [-8], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 30, s: [12], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 60, s: [-8], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 90, s: [12], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 120, s: [-8] },
      ],
      ix: 10,
    };
  }
  const armLKs = armL?.ks as AnimKs | undefined;
  if (armLKs?.p?.s) {
    armLKs.p.x = staticX(-260);
    armLKs.p.y = bouncyY(110.687, 110, true);
    armLKs.r = {
      a: 1,
      k: [
        { t: 0, s: [8], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 30, s: [-12], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 60, s: [8], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 90, s: [-12], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 120, s: [8] },
      ],
      ix: 10,
    };
  }

  if (nullAll?.ks) {
    (nullAll.ks as Record<string, unknown>).s = { a: 0, k: [70, 70, 100], ix: 6, l: 2 };
  }
  const nullAllKs = nullAll?.ks as AnimKs | undefined;
  if (nullAllKs?.p?.s) {
    nullAllKs.p.y = {
      a: 1,
      k: [
        { t: 0, s: [520], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 15, s: [500], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 30, s: [520], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 45, s: [500], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 60, s: [520], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 75, s: [500], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 90, s: [520], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 105, s: [500], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 120, s: [520] },
      ],
      ix: 4,
    };
  }

  const headTilt = () => ({
    a: 1,
    k: [
      { t: 0, s: [-6], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
      { t: 30, s: [6], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
      { t: 60, s: [-6], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
      { t: 90, s: [6], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
      { t: 120, s: [-6] },
    ],
    ix: 10,
  });

  if (head) {
    (head.ks as Record<string, unknown>).r = headTilt();
    (head.ks as Record<string, unknown>).p = {
      a: 1,
      k: [
        { t: 0, s: [-10, -20], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 30, s: [10, -22], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 60, s: [-10, -20], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 90, s: [10, -22], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 120, s: [-10, -20] },
      ],
      ix: 2,
    };
  }
  if (nullFace) {
    (nullFace.ks as Record<string, unknown>).r = headTilt();
    (nullFace.ks as Record<string, unknown>).p = {
      a: 1,
      k: [
        { t: 0, s: [-4, 0], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 30, s: [4, 2], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 60, s: [-4, 0], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 90, s: [4, 2], to: [0, 0], ti: [0, 0], i: { x: 0.5, y: 1 }, o: { x: 0.5, y: 0 } },
        { t: 120, s: [-4, 0] },
      ],
      ix: 2,
    };
  }

  const mouthKs = mouth?.ks as AnimKs | undefined;
  if (mouthKs?.p?.s) {
    mouthKs.p.x = { a: 0, k: 0, ix: 3 };
    mouthKs.p.y = {
      a: 1,
      k: [
        { t: 0, s: [122], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 30, s: [128], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 60, s: [122], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 90, s: [128], i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } },
        { t: 120, s: [122] },
      ],
      ix: 4,
    };
  }

  data.op = 120;
  data.layers.forEach((l) => {
    if (l.op != null && l.op > 120) l.op = 120;
    if (l.ip != null && l.ip < 0) l.ip = 0;
  });

  return data;
}

export function MonkeyAnimation({ status }: MonkeyAnimationProps) {
  const [rawData, setRawData] = useState<unknown | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/animations/monkey.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setRawData(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const animationData = useMemo(() => {
    if (!rawData) return null;
    return apply67Gesture(structuredClone(rawData));
  }, [rawData]);

  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie || !animationData) return;
    if (status === "decided") {
      lottie.stop();
    } else {
      lottie.setSpeed(status === "thinking" ? 2 : 1);
      lottie.play();
    }
  }, [status, animationData]);

  return (
    <div
      className="monkey-stage relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center overflow-visible"
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
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        />
      ) : null}
      <span
        className={`digit-67 d6${status === "decided" ? " paused" : ""}`}
        aria-hidden
      >
        6
      </span>
      <span
        className={`digit-67 d7${status === "decided" ? " paused" : ""}`}
        aria-hidden
      >
        7
      </span>
    </div>
  );
}
