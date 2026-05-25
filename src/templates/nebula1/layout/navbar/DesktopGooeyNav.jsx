import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GooeyNav from "../../GooeyNav.jsx";
import { gooeyProps } from "./config";
import { useNebulaNavItems } from "./useNebulaNavItems";

const DesktopGooeyNav = () => {
  const items = useNebulaNavItems();
  if (!items.length) return null;
  const compact = items.length > 7;
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const refreshScrollState = () => {
    const container = scrollerRef.current;
    if (!container) return;
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    const left = Math.max(0, container.scrollLeft);
    setCanScrollLeft(left > 2);
    setCanScrollRight(left < maxLeft - 2);
  };

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;
    const delta = Math.max(180, Math.round(container.clientWidth * 0.45));
    container.scrollBy({ left: direction * delta, behavior: "smooth" });
  };

  useEffect(() => {
    refreshScrollState();
    const container = scrollerRef.current;
    if (!container) return undefined;
    const onScroll = () => refreshScrollState();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshScrollState);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshScrollState);
    };
  }, [items.length]);

  return (
    <div className="hidden min-w-0 flex-1 items-center gap-1 sm:flex">
      {canScrollLeft ? (
        <button
          type="button"
          aria-label="Scroll navigation left"
          onClick={() => scrollByAmount(-1)}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-800/80 text-zinc-100 hover:bg-zinc-700/80"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      ) : (
        <div className="h-8 w-8 shrink-0" />
      )}

      <div
        ref={scrollerRef}
        className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-max min-w-full">
          <GooeyNav {...gooeyProps} items={items} compact={compact} />
        </div>
      </div>

      {canScrollRight ? (
        <button
          type="button"
          aria-label="Scroll navigation right"
          onClick={() => scrollByAmount(1)}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-800/80 text-zinc-100 hover:bg-zinc-700/80"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <div className="h-8 w-8 shrink-0" />
      )}
    </div>
  );
};

export default DesktopGooeyNav;
