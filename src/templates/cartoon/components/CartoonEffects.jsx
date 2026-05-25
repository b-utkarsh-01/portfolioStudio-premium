import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";

export const ComicStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka:wght@300..700&family=Space+Grotesk:wght@400..700&display=swap');
    .font-serif-lux { font-family: 'Bangers', cursive; }
    .font-sans-lux { font-family: 'Fredoka', sans-serif; }
    .font-accent-lux { font-family: 'Space Grotesk', sans-serif; }
    .noise-bg { background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1.5px, transparent 1.5px); background-size: 20px 20px; }
    .bubble-tail::after { content: ''; position: absolute; bottom: -16px; left: 30px; border-width: 16px 16px 0 0; border-style: solid; border-color: #000 transparent transparent transparent; display: block; width: 0; }
    .bubble-tail-inner::after { content: ''; position: absolute; bottom: -10px; left: 32px; border-width: 12px 12px 0 0; border-style: solid; border-color: #fff transparent transparent transparent; display: block; width: 0; z-index: 10; }
    .cartoon-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(236, 72, 153, 0.9) rgba(255, 244, 204, 0.9);
    }
    .cartoon-scrollbar::-webkit-scrollbar { width: 12px; height: 12px; }
    .cartoon-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 244, 204, 0.92);
      border: 2px solid #111;
      border-radius: 999px;
    }
    .cartoon-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #f97316 0%, #ec4899 100%);
      border-radius: 999px;
      border: 2px solid #111;
    }
    .cartoon-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #fb7185 0%, #d946ef 100%);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

export const CursorFollower = ({ cursorXSpring, cursorYSpring, isMouseDown, isClickableHovered }) => (
  <motion.div
    style={{ x: cursorXSpring, y: cursorYSpring }}
    animate={{ scale: isMouseDown ? 0.88 : (isClickableHovered ? 1.35 : 1), rotate: isMouseDown ? -15 : (isClickableHovered ? -12 : 0) }}
    transition={{ duration: 0.12 }}
    className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] hidden lg:block"
  >
    <svg viewBox="0 0 32 32" className="w-10 h-10 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
      <path d="M10,26 L6,22 C4,20 4,17 6,15 C7,14 9,14 10,15 L11,16 L11,10 C11,8 13,6 15,6 C17,6 19,8 19,10 L19,16 L20,16 C21.5,16 23,17.5 23,19 L23,24 C23,26 21,28 19,28 L14,28 C12,28 10.5,27 10,26 Z" fill="#ffffff" stroke="#000000" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="11" y="27" width="9" height="4" fill="#ec4899" stroke="#000" strokeWidth="2.5" rx="1.5" />
    </svg>
  </motion.div>
);

export const BurstParticles = ({ bursts }) => (
  <AnimatePresence>
    {bursts.map((b) => (
      <motion.div
        key={b.id}
        initial={{ scale: 0, opacity: 1, rotate: b.rotate - 15 }}
        animate={{ scale: [1, 1.4, 1.2], opacity: 1, rotate: b.rotate }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ left: b.x - 40, top: b.y - 35 }}
        className="fixed pointer-events-none z-[9998] flex items-center justify-center font-serif-lux"
      >
        <div className="relative">
          <Star className="w-20 h-20 fill-[#fde047] stroke-black stroke-[4px] drop-shadow-[3px_3px_0px_#000]" style={{ fill: b.color }} />
          <span className="absolute inset-0 flex items-center justify-center text-black font-black text-lg tracking-wider select-none drop-shadow-[1px_1.5px_0px_#fff] uppercase">{b.word}</span>
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
);

export const DotBackdrop = () => <div className="absolute inset-0 noise-bg opacity-40 pointer-events-none z-0" />;
