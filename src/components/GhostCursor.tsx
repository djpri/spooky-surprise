import { useEffect, useRef, useState } from "react";

export function GhostCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const lastTrailAt = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const isPointerTarget = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (["a", "button", "input", "select", "textarea", "label"].includes(tag)) return true;
      if (el.getAttribute("role") === "button") return true;
      const style = getComputedStyle(el);
      return style.cursor === "pointer";
    };

    const createTrail = (x: number, y: number, pointerMode: boolean) => {
      if (!trailsRef.current) return;
      const trail = document.createElement("div");
      trail.className = `ghost-trail${pointerMode ? " ghost-pointer-mode" : ""}`;
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trailsRef.current.appendChild(trail);
      setTimeout(() => trail.remove(), 1000);
    };

    const updateCursor = () => {
      if (!cursorRef.current) {
        animationFrameId.current = requestAnimationFrame(updateCursor);
        return;
      }

      const speed = 0.15; // easing
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed;

      const x = cursorPos.current.x;
      const y = cursorPos.current.y;

      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;

      // Toggle pointer state class based on hover target
      const pointer = isPointerTarget(mousePos.current.x, mousePos.current.y);
      if (pointer) {
        cursorRef.current.classList.add("ghost-pointer");
      } else {
        cursorRef.current.classList.remove("ghost-pointer");
      }

      // Create trail at a steady cadence
      const now = performance.now();
      const intervalMs = pointer ? 70 : 40; // fewer trails over interactive elements
      if (trailsRef.current && now - lastTrailAt.current > intervalMs) {
        createTrail(x, y, pointer);
        lastTrailAt.current = now;
      }

      animationFrameId.current = requestAnimationFrame(updateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isVisible]);

  return (
    <>
      <div ref={trailsRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div
        ref={cursorRef}
        className={`ghost-cursor ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          zIndex: 9999,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="ghost-body">
            <div className="ghost-eyes">
              <div className="ghost-eye" />
              <div className="ghost-eye" />
            </div>
            <div className="ghost-wave" />
          </div>
        </div>
      </div>
    </>
  );
}
