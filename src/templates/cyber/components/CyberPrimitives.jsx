import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Twitter, Globe } from "lucide-react";

export const getStage = (stages, id, fallbackTitle) => {
  const match = (Array.isArray(stages) ? stages : []).find((stage) => stage?.id === id);
  return {
    enabled: match?.enabled !== false,
    title: match?.title?.trim() || fallbackTitle,
  };
};

export const getContactIcon = (type = "") => {
  const t = type.toLowerCase();
  if (t.includes("email") || t.includes("mail")) return <Mail className="w-4 h-4 text-[#00f0ff]" />;
  if (t.includes("phone") || t.includes("call") || t.includes("mobile")) return <Phone className="w-4 h-4 text-[#00f0ff]" />;
  if (t.includes("linkedin")) return <Linkedin className="w-4 h-4 text-[#00f0ff]" />;
  if (t.includes("github") || t.includes("git")) return <Github className="w-4 h-4 text-[#00f0ff]" />;
  if (t.includes("twitter") || t.includes("x.com")) return <Twitter className="w-4 h-4 text-[#00f0ff]" />;
  return <Globe className="w-4 h-4 text-[#00f0ff]" />;
};

export const PAGE_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const CARD_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const CARD_ITEM = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Section = ({ children, className = "", ...rest }) => (
  <motion.section
    variants={FADE_UP}
    className={[
      "relative rounded-3xl border border-[#00f0ff]/15 bg-black/40 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-[#00f0ff]/30",
      className,
    ].join(" ")}
    {...rest}
  >
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]/30" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]/30" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]/30" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]/30" />
    {children}
  </motion.section>
);

export const DecryptedHeader = ({ text }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [triggerCount, setTriggerCount] = useState(0);

  useEffect(() => {
    let intervalId;
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    const triggerDecrypt = () => {
      iteration = 0;
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        setDisplayedText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalId);
        }
        iteration += 1 / 2;
      }, 35);
    };

    triggerDecrypt();
    return () => clearInterval(intervalId);
  }, [text, triggerCount]);

  return (
    <span
      onMouseEnter={() => setTriggerCount((prev) => prev + 1)}
      className="font-serif-lux uppercase tracking-widest text-[#00f0ff] font-bold cursor-default glitch-hover inline-block"
    >
      {displayedText}
    </span>
  );
};

export const SectionHeading = ({ label, title, icon: IconComponent }) => (
  <div className="mb-6 border-b border-[#00f0ff]/10 pb-4 relative">
    {label && (
      <div className="flex items-center gap-2 mb-1.5">
        {IconComponent && <IconComponent className="w-3.5 h-3.5 text-[#ff00ff]" />}
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff00ff] font-accent-lux">{label}</span>
      </div>
    )}
    <h2 className="text-3xl font-light tracking-wide text-white font-serif-lux uppercase">
      <DecryptedHeader text={title} />
    </h2>
  </div>
);

export const Card = ({ children, className = "", ...rest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={CARD_ITEM}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        borderColor: "rgba(255, 0, 255, 0.4)",
        boxShadow: "0 0 25px rgba(0, 240, 255, 0.15)",
      }}
      className={[
        "relative rounded-2xl border border-[#00f0ff]/15 bg-black/60 p-5 backdrop-blur-xl transition-all duration-300 overflow-hidden card-glow-hover group",
        className,
      ].join(" ")}
      {...rest}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="url(#laser-grad)"
          strokeWidth="1.5"
          rx="16"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            strokeDasharray: "100 300",
            strokeDashoffset: 0,
            animation: isHovered ? "laser-sweep 2s linear infinite" : "none",
          }}
        />
      </svg>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff]/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]/40" />
      {children}
    </motion.div>
  );
};

export const EmptyState = ({ message }) => (
  <div className="rounded-2xl border border-dashed border-[#00f0ff]/20 bg-black/40 py-10 text-center">
    <p className="text-xs font-mono text-neutral-500 font-sans-lux">{message}</p>
  </div>
);
