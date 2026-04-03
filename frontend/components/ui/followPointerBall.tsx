"use client";

import { frame, motion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const spring = {
  damping: 20,
  stiffness: 150,
  restDelta: 0.001,
};

export default function FollowPointerBall() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="pointer-events-none fixed w-64 h-64 rounded-full blur-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 z-0"
    />
  );
}

function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current;

      if (!element) return;

      frame.read(() => {
        x.set(clientX - element.offsetWidth / 2);
        y.set(clientY - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [ref, x, y]);

  return { x, y };
}
