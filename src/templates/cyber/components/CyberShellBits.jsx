import { AnimatePresence, motion } from "framer-motion";
import { MatrixRain } from "./CyberEffects";

export const CYBER_GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Space+Grotesk:wght@400..700&display=swap');

  .font-serif-lux { font-family: 'Share Tech Mono', monospace; }
  .font-sans-lux { font-family: 'Share Tech Mono', monospace; }
  .font-accent-lux { font-family: 'Space Grotesk', sans-serif; }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .scanlines::after {
    content: " ";
    display: block;
    position: fixed;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 999;
    background-size: 100% 4px, 6px 100%;
    pointer-events: none;
  }

  .text-glow-cyan { text-shadow: 0 0 10px rgba(0, 240, 255, 0.5); }
  .cyber-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 240, 255, 0.95) rgba(8, 8, 14, 0.95);
  }
  .cyber-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(0, 240, 255, 1) 0%, rgba(255, 0, 255, 0.95) 100%);
    border-radius: 999px;
    border: 2px solid rgba(8, 8, 14, 0.95);
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
  }
  .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(128, 244, 255, 1) 0%, rgba(255, 102, 255, 1) 100%);
  }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .cyber-grid-bg {
    background-image: radial-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .cyber-grid-spotlight {
    mask-image: radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 0%, rgba(0, 0, 0, 0.15) 60%, transparent 100%);
    -webkit-mask-image: radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 0%, rgba(0, 0, 0, 0.15) 60%, transparent 100%);
  }

  @keyframes laser-sweep {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -400; }
  }

  .glitch-hover:hover {
    animation: glitch-anim 0.25s cubic-bezier(.25, .46, .45, .94) both infinite;
  }
  @keyframes glitch-anim {
    0% { transform: translate(0); text-shadow: -2px 2px 0px #ff00ff, 2px -2px 0px #00f0ff; }
    25% { transform: translate(-1px, 1px); text-shadow: -1px -1px 0px #ff00ff, 1px 1px 0px #00f0ff; }
    50% { transform: translate(1px, -1px); text-shadow: 2px -1px 0px #ff00ff, -2px 1px 0px #00f0ff; }
    75% { transform: translate(-1px, -1px); text-shadow: -1px 2px 0px #ff00ff, 1px -2px 0px #00f0ff; }
    100% { transform: translate(0); text-shadow: -2px 2px 0px #ff00ff, 2px -2px 0px #00f0ff; }
  }

  .glitch-image-hover:hover img {
    animation: glitch-img-anim 0.35s steps(2, end) infinite;
    filter: hue-rotate(45deg) saturate(1.4) contrast(1.1);
  }
  @keyframes glitch-img-anim {
    0% { clip-path: inset(12% 0 25% 0); transform: skewX(-4deg) translateX(-1px); }
    20% { clip-path: inset(35% 0 10% 0); transform: skewX(4deg) translateX(1px); }
    40% { clip-path: inset(8% 0 65% 0); transform: skewX(-8deg) translateX(-4px); }
    60% { clip-path: inset(60% 0 8% 0); transform: skewX(8deg) translateX(4px); }
    80% { clip-path: inset(20% 0 45% 0); transform: skewX(-1deg) translateX(0px); }
    100% { clip-path: inset(0 0 0 0); transform: none; }
  }

  @keyframes scanline-sweep {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(400px); opacity: 0; }
  }
  .card-scanline-laser {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00f0ff, #ff00ff, #00f0ff, transparent);
    box-shadow: 0 0 8px #00f0ff, 0 0 12px #ff00ff;
    opacity: 0;
    pointer-events: none;
  }
  .group\/sec:hover .card-scanline-laser,
  .card-glow-hover:hover .card-scanline-laser {
    animation: scanline-sweep 2.5s linear infinite;
  }

  @keyframes global-laser-sweep {
    0% { transform: translateY(-10vh); opacity: 0; }
    5% { opacity: 0.35; }
    95% { opacity: 0.35; }
    100% { transform: translateY(110vh); opacity: 0; }
  }
  .global-scanline-laser {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00f0ff, #ff00ff, #00f0ff, transparent);
    box-shadow: 0 0 10px #00f0ff, 0 0 16px #ff00ff;
    z-index: 9999;
    pointer-events: none;
    animation: global-laser-sweep 12s linear infinite;
  }
`;

export const CyberCursorOverlay = ({ booting, cursorXSpring, cursorYSpring, isClickableHovered, coords }) => (
  <AnimatePresence>
    {!booting && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <motion.div
            animate={{ scale: isClickableHovered ? 1.3 : 1, borderColor: isClickableHovered ? "#ff00ff" : "#00f0ff" }}
            className="absolute w-6 h-6 border border-[#00f0ff]/40 rounded-full flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full" />
          </motion.div>
          <div className="absolute w-1 h-3 border-l border-[#00f0ff]/60" />
          <div className="absolute w-3 h-1 border-t border-[#00f0ff]/60" />
          <div className="absolute left-8 top-0 whitespace-nowrap bg-black/85 border border-[#00f0ff]/20 rounded-md px-1.5 py-0.5 text-[8px] font-mono text-[#00f0ff] shadow-md">
            LOC // {coords.x} : {coords.y}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const CyberClickParticles = ({ bits }) => (
  <AnimatePresence>
    {bits.map((b) => (
      <motion.div
        key={b.id}
        initial={{ opacity: 1, scale: 0.5, x: 0, y: 0, rotate: 0 }}
        animate={{ opacity: 0, scale: b.type === "ring" ? 2.5 : 1.3, x: b.xDir, y: b.yDir, rotate: b.rotateVal }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.1, 0.8, 0.3, 1] }}
        style={{ left: b.x - 12, top: b.y - 12, color: b.color }}
        className="fixed pointer-events-none z-[9998] font-mono text-[10px] font-bold"
      >
        {b.type === "text" && b.value}
        {b.type === "reticle" && <span className="text-[12px] font-light">+</span>}
        {b.type === "ring" && <div className="w-5 h-5 rounded-full border border-current" />}
        {b.type === "hex" && (
          <div className="w-4 h-4 border border-current flex items-center justify-center rotate-45">
            <div className="w-1.5 h-1.5 border border-current" />
          </div>
        )}
      </motion.div>
    ))}
  </AnimatePresence>
);

export const CyberChrome = () => (
  <>
    <div className="scanlines absolute inset-0 w-full h-full pointer-events-none z-50" />
    <div className="global-scanline-laser" />
    <MatrixRain />
    <div className="fixed inset-0 pointer-events-none z-0 opacity-25 cyber-grid-bg cyber-grid-spotlight" />
  </>
);
