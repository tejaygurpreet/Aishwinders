"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  /** Vertical offset in px before intersection triggers */
  rootMargin?: string;
  threshold?: number;
  delayMs?: number;
};

/**
 * Scroll reveal using IntersectionObserver + CSS transitions.
 * Avoids Framer initial/whileInView SSR vs first-paint mismatches.
 */
export function RevealOnScroll({
  children,
  className = "",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
  delayMs = 0,
}: RevealOnScrollProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal-on-scroll transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: shown ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}
