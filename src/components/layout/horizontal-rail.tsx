"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type DragEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";

type HorizontalRailProps = {
  title: string;
  filters: readonly string[];
  selectedIndex: number;
  children: ReactNode;
};

const DRAG_THRESHOLD = 5;

export function HorizontalRail({ title, filters, selectedIndex, children }: HorizontalRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScrollLeft: 0 });
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => ro.disconnect();
  }, []);

  const scroll = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (!el) return;
    const delta = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(delta) > DRAG_THRESHOLD) {
      drag.current.moved = true;
    }
    if (drag.current.moved) {
      el.scrollLeft = drag.current.startScrollLeft - delta;
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = scrollRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

  const onClickCapture = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <h2 className="self-stretch text-lg font-semibold leading-5 text-gray-9">{title}</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((label, index) => (
              <Chip key={label} selected={index === selectedIndex}>
                {label}
              </Chip>
            ))}
          </div>
          {hasOverflow && (
            <div className="flex shrink-0 items-center gap-2">
              <IconButton
                aria-label="Previous"
                intent="outline"
                size="sm"
                onClick={() => scroll(-1)}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </IconButton>
              <IconButton aria-label="Next" intent="outline" size="sm" onClick={() => scroll(1)}>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: drag-to-scroll carousel region */}
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onDragStart={onDragStart}
        className="cursor-grab overflow-x-auto select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&_img]:pointer-events-none [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4">{children}</div>
      </div>
    </section>
  );
}
