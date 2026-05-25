import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const PAGE_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const CARD_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const CARD_ITEM = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Section = ({ children, className = "", ...rest }) => (
  <motion.section
    variants={FADE_UP}
    className={[
      "relative rounded-3xl border border-[#dfb76c]/15 bg-neutral-950/20 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-[#dfb76c]/30 group/section",
      className,
    ].join(" ")}
    {...rest}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#dfb76c]/5 to-transparent blur-xl pointer-events-none transition-opacity duration-500" />
    <div className="relative z-10">{children}</div>
  </motion.section>
);

export const SectionHeading = ({ label, title, icon: IconComponent }) => (
  <div className="mb-6 border-b border-[#dfb76c]/10 pb-4">
    {label && (
      <div className="flex items-center gap-2 mb-1.5">
        {IconComponent && <IconComponent className="w-3.5 h-3.5 text-[#dfb76c]" />}
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfb76c] font-accent-lux">{label}</span>
      </div>
    )}
    <h2 className="text-3xl font-light tracking-tight text-white font-serif-lux leading-tight">{title}</h2>
  </div>
);

export const Card = ({ children, className = "", ...rest }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY / height) - 0.5) * -10;
    const rY = ((mouseX / width) - 0.5) * 10;
    setRotateX(rX);
    setRotateY(rY);

    setShineX(mouseX);
    setShineY(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={CARD_ITEM}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
      className={[
        "relative rounded-2xl border border-[#dfb76c]/10 bg-neutral-950/50 p-5 transition-all duration-300 hover:border-[#dfb76c]/30 hover:bg-neutral-950/70 overflow-hidden cursor-none card-glow-hover",
        className,
      ].join(" ")}
      {...rest}
    >
      <div style={{ transform: "translateZ(10px)" }} className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${shineX}px ${shineY}px, rgba(223, 183, 108, 0.12), transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export const EmptyState = ({ message }) => (
  <div className="rounded-2xl border border-dashed border-[#dfb76c]/15 bg-neutral-950/20 py-10 text-center">
    <p className="text-xs font-medium text-neutral-500 font-sans-lux">{message}</p>
  </div>
);
