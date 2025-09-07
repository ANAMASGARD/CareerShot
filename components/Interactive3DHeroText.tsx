"use client"
import React, { useEffect, useRef, useState } from "react";

/**
 * Interactive 3D Hero Text (anime.js)
 * - Per-letter spans (aria-hidden)
 * - Visible by default (no content hidden during JS load)
 * - Enhances interactivity when anime.js is available
 * - Respects prefers-reduced-motion
 *
 * Install: npm i animejs
 *
 * Tuning constants are marked for easy adjustment.
 */

const LINES = ["Discover Your Own", "Journey", "With CareerShot"];
const ANIM_IMPORT_PATHS = ["animejs/lib/anime.es.js", "animejs"];

export default function Interactive3DHeroText() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<Record<string, HTMLElement>>({});
  const animeRef = useRef<any>(null);
  const pointerState = useRef<Record<string, any>>({});
  const [isReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  const ANIM_JUMP_DUR = 500;
  const ANIM_SNAP_DUR = 900;
  const IDLE_FLOAT_AMPLITUDE = 6;

  const makeId = (lineIndex: number, i: number) => `l${lineIndex}_c${i}`;

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (isReduced) return;
      try {
        let animeModule: any;
        for (const p of ANIM_IMPORT_PATHS) {
          try {
            // @ts-ignore
            animeModule = await import(p);
            if (animeModule) break;
          } catch (e) {}
        }
        const anime = animeModule?.default ?? animeModule;
        if (!mounted || !anime) return;
        animeRef.current = anime;

        const root = rootRef.current!;
        const idleTargets: HTMLElement[] = Array.from(root.querySelectorAll("[data-line]")) as HTMLElement[];

        const idleAnim = anime({
          targets: idleTargets,
          translateY: [
            { value: -IDLE_FLOAT_AMPLITUDE, duration: 2400 },
            { value: IDLE_FLOAT_AMPLITUDE, duration: 2400 }
          ],
          easing: "easeInOutSine",
          direction: "alternate",
          loop: true,
          autoplay: true
        });

        (animeRef.current as any).__idle = idleAnim;
      } catch (err) {
        console.warn("anime.js load failed (hero enhancement skipped)", err);
      }
    })();

    return () => {
      mounted = false;
      const anime = animeRef.current;
      if (anime && anime.__idle) {
        anime.__idle.pause();
        try { anime.__idle = null; } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const down = (ev: PointerEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target || !target.dataset?.letterId) return;
      try { (ev.target as HTMLElement).setPointerCapture(ev.pointerId); } catch {}
      const id = (target.dataset.letterId as string);
      pointerState.current[id] = {
        id,
        pointerId: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        lastX: ev.clientX,
        lastY: ev.clientY,
        vx: 0,
        vy: 0,
        t0: performance.now()
      };
    };

    const move = (ev: PointerEvent) => {
      const entry = Object.values(pointerState.current).find((s: any) => s.pointerId === ev.pointerId);
      if (!entry) return;
      const letterEl = lettersRef.current[entry.id];
      if (!letterEl) return;
      const dx = ev.clientX - entry.lastX;
      const dy = ev.clientY - entry.lastY;
      const now = performance.now();
      const dt = Math.max(1, now - entry.t0);
      entry.vx = dx / dt;
      entry.vy = dy / dt;
      entry.lastX = ev.clientX;
      entry.lastY = ev.clientY;
      entry.t0 = now;

      const max = 60;
      entry.tx = (entry.tx || 0) + dx;
      entry.ty = (entry.ty || 0) + dy;
      entry.tx = Math.max(-max, Math.min(max, entry.tx));
      entry.ty = Math.max(-max, Math.min(max, entry.ty));

      letterEl.style.willChange = "transform";
      letterEl.style.transform = `translate3d(${entry.tx}px, ${entry.ty}px, 0) rotate(${entry.tx * 0.03}deg)`;
    };

    const up = (ev: PointerEvent) => {
      const entryKey = Object.keys(pointerState.current).find(k => pointerState.current[k].pointerId === ev.pointerId);
      if (!entryKey) return;
      const entry = pointerState.current[entryKey];
      const letterEl = lettersRef.current[entry.id];
      try { (ev.target as HTMLElement).releasePointerCapture(ev.pointerId); } catch {}
      const anime = animeRef.current;
      if (anime && letterEl) {
        anime({
          targets: letterEl,
          translateX: 0,
          translateY: 0,
          rotate: 0,
          duration: ANIM_SNAP_DUR,
          elasticity: 600,
          easing: "easeOutElastic(1, .6)"
        });
      } else if (letterEl) {
        letterEl.style.transition = "transform 0.6s cubic-bezier(.2,.9,.2,1)";
        letterEl.style.transform = "translate3d(0,0,0) rotate(0)";
        setTimeout(() => (letterEl.style.transition = ""), 700);
      }
      delete pointerState.current[entryKey];
    };

    root.addEventListener("pointerdown", down as EventListener);
    window.addEventListener("pointermove", move as EventListener);
    window.addEventListener("pointerup", up as EventListener);
    window.addEventListener("pointercancel", up as EventListener);

    return () => {
      root.removeEventListener("pointerdown", down as EventListener);
      window.removeEventListener("pointermove", move as EventListener);
      window.removeEventListener("pointerup", up as EventListener);
      window.removeEventListener("pointercancel", up as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || !el.dataset?.letterId) return;
      const letterEl = lettersRef.current[el.dataset.letterId];
      if (!letterEl) return;
      const anime = animeRef.current;
      if (anime && !isReduced) {
        anime({
          targets: letterEl,
          translateY: [-8, -28, 0],
          rotate: [0, (Math.random() - 0.5) * 6, 0],
          duration: ANIM_JUMP_DUR,
          easing: "easeOutElastic(1, .6)"
        });
      } else {
        letterEl.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-18px)" }, { transform: "translateY(0)" }],
          { duration: 500, easing: "cubic-bezier(.2,.9,.2,1)" }
        );
      }
    };
    root.addEventListener("click", onClick as EventListener);
    return () => root.removeEventListener("click", onClick as EventListener);
  }, [isReduced]);

  const setLetterRef = (id: string, el: HTMLElement | null) => {
    if (!el) {
      delete lettersRef.current[id];
      return;
    }
    lettersRef.current[id] = el;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active || !active.dataset?.letterId) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        active.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center"
      style={{ perspective: 1200 }}
    >
      <h1 className="sr-only">Discover Your Own Journey With CareerShot</h1>

      <div className="select-none text-center" aria-hidden={false}>
        {LINES.map((line, li) => {
          // Apply gradient to the middle line "Journey"
          const isGradientLine = li === 1;
          return (
            <div
              key={li}
              data-line
              className={`inline-block leading-tight text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-2 md:mb-3 transform transition-transform ${
                isGradientLine 
                  ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 bg-size-200' 
                  : 'text-gray-900 dark:text-white'
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {Array.from(line).map((ch, i) => {
                const id = makeId(li, i);
                const isSpace = ch === " ";
                return (
                  <span
                    key={id}
                    ref={(el) => {
                      if (el) setLetterRef(id, el);
                      else setLetterRef(id, null);
                    }}
                    data-letter-id={id}
                    aria-hidden="true"
                    tabIndex={isSpace ? -1 : 0}
                    className="inline-block mx-0.5 origin-center transition-transform will-change-transform"
                    style={{
                      transform: "translateZ(0)",
                      textShadow: isGradientLine ? "none" : "0 6px 24px rgba(10,11,13,0.06)",
                      filter: isGradientLine ? "none" : "drop-shadow(0 6px 18px rgba(10,11,13,0.06))"
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                );
              })}
            </div>
          );
        })}

        <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your AI career planner and skill advisor.
        </p>
      </div>
    </div>
  );
}