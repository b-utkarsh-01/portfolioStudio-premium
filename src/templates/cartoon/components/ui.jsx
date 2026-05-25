import { motion } from "framer-motion";

export const PAGE_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
};

export const FADE_UP = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 15 } },
};

export const CARD_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export const CARD_ITEM = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

export const Section = ({ children, className = "", ...rest }) => (
  <motion.section
    variants={FADE_UP}
    className={[
      "relative rounded-3xl border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-shadow duration-200",
      className,
    ].join(" ")}
    {...rest}
  >
    {children}
  </motion.section>
);

export const SectionHeading = ({ label, title, icon: IconComponent, colorClass = "bg-[#fde047]" }) => (
  <div className="mb-6 border-b-4 border-black pb-4 relative">
    {label && (
      <motion.div
        whileHover={{ scale: 1.05, rotate: -2 }}
        className={[
          "inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black rounded-lg transform -rotate-1 skew-x-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-3 cursor-default select-none",
          colorClass,
        ].join(" ")}
      >
        {IconComponent && (
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <IconComponent className="w-3.5 h-3.5 text-black" />
          </motion.div>
        )}
        <span className="text-[11px] font-black uppercase tracking-wider text-black font-accent-lux">{label}</span>
      </motion.div>
    )}
    <h2 className="text-3xl font-black tracking-wide text-black font-serif-lux uppercase">{title}</h2>
  </div>
);

export const Card = ({ children, className = "", colorClass = "bg-white", ...rest }) => (
  <motion.div
    variants={CARD_ITEM}
    whileHover={{
      scale: 1.025,
      rotate: [0, -1.5, 1.5, -1, 0],
      boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
      transition: { duration: 0.3 },
    }}
    whileTap={{
      scale: 0.96,
      rotate: 0,
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
    }}
    className={[
      "relative rounded-2xl border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer select-none",
      colorClass,
      className,
    ].join(" ")}
    {...rest}
  >
    {children}
  </motion.div>
);

export const EmptyState = ({ message }) => (
  <div className="rounded-2xl border-4 border-dashed border-neutral-400 bg-neutral-100 py-10 text-center">
    <p className="text-sm font-bold text-neutral-500 font-sans-lux">{message}</p>
  </div>
);
