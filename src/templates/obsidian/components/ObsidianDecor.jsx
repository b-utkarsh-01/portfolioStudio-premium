import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const ObsidianGlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Syne:wght@400..800&display=swap');
    .font-serif-lux { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-sans-lux { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-accent-lux { font-family: 'Syne', sans-serif; }
    @keyframes float-slow {
      0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
      33% { transform: translate(70px, -90px) scale(1.15) rotate(120deg); }
      66% { transform: translate(-50px, 50px) scale(0.9) rotate(240deg); }
      100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
    }
    .animate-blob-slow { animation: float-slow 30s infinite ease-in-out; }
    .animate-blob-medium { animation: float-slow 24s infinite ease-in-out; animation-delay: -6s; }
    .animate-blob-fast { animation: float-slow 18s infinite ease-in-out; animation-delay: -12s; }
    .text-glow-gold { text-shadow: 0 0 20px rgba(223, 183, 108, 0.4); }
    .noise-bg {
      background-image: linear-gradient(to right, rgba(223, 183, 108, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(223, 183, 108, 0.02) 1px, transparent 1px);
      background-size: 4rem 4rem;
    }
    .card-glow-hover { position: relative; overflow: hidden; }
    .card-glow-hover::before {
      content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(223, 183, 108, 0.06) 50%, rgba(255, 255, 255, 0) 100%);
      transform: skewX(-25deg); transition: 0.85s ease-out; pointer-events: none; z-index: 10;
    }
    .card-glow-hover:hover::before { left: 125%; }
    .card-glow-hover:hover { box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(223, 183, 108, 0.08), inset 0 0 15px rgba(223, 183, 108, 0.03); }

    .obsidian-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(223, 183, 108, 0.75) rgba(31, 24, 37, 0.9);
    }
    .obsidian-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
    .obsidian-scrollbar::-webkit-scrollbar-track {
      background: rgba(31, 24, 37, 0.9);
      border-radius: 999px;
      border: 1px solid rgba(223, 183, 108, 0.14);
    }
    .obsidian-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, rgba(223, 183, 108, 0.95), rgba(164, 119, 52, 0.95));
      border-radius: 999px;
      border: 2px solid rgba(31, 24, 37, 0.9);
    }
    .obsidian-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, rgba(241, 207, 147, 0.98), rgba(190, 139, 64, 0.98));
    }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

export const ObsidianCursor = ({
  dotXSpring,
  dotYSpring,
  ringXSpring,
  ringYSpring,
  isClickableHovered,
  cursorLabel,
  sparks,
}) => (
  <>
    <motion.div
      style={{ x: dotXSpring, y: dotYSpring }}
      className="fixed top-0 left-0 w-2 h-2 bg-[#dfb76c] rounded-full pointer-events-none z-[9999] hidden lg:block shadow-[0_0_8px_#dfb76c]"
    />
    <motion.div
      style={{ x: ringXSpring, y: ringYSpring }}
      animate={{
        scale: isClickableHovered ? 2.0 : 1,
        borderColor: isClickableHovered ? "#ffffff" : "#dfb76c",
        backgroundColor: isClickableHovered ? "rgba(223, 183, 108, 0.05)" : "rgba(223, 183, 108, 0)",
      }}
      transition={{ duration: 0.18 }}
      className="fixed top-0 left-0 w-8 h-8 border border-[#dfb76c]/60 rounded-full pointer-events-none z-[9999] hidden lg:block flex items-center justify-center shadow-[inset_0_0_5px_rgba(223,183,108,0.1)]"
    >
      {cursorLabel && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-[6.5px] font-accent-lux font-bold tracking-[0.2em] text-[#dfb76c]"
        >
          {cursorLabel}
        </motion.span>
      )}
    </motion.div>

    <AnimatePresence>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{ left: spark.x - 16, top: spark.y - 16 }}
          className="fixed pointer-events-none z-[9998] flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-[#dfb76c]" />
        </motion.div>
      ))}
    </AnimatePresence>
  </>
);

export const ObsidianBackground = ({ bgOffset }) => (
  <>
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <motion.div style={{ x: bgOffset.x * 0.9, y: bgOffset.y * 0.9 }} className="absolute top-[-15%] left-[-15%] w-[800px] h-[800px] rounded-full bg-violet-950/25 blur-[150px] animate-blob-slow" />
      <motion.div style={{ x: bgOffset.x * -0.7, y: bgOffset.y * -0.7 }} className="absolute top-[8%] right-[-15%] w-[900px] h-[900px] rounded-full bg-amber-500/10 blur-[170px] animate-blob-medium" />
      <motion.div style={{ x: bgOffset.x * 0.8, y: bgOffset.y * 0.8 }} className="absolute top-[40%] left-[-20%] w-[750px] h-[750px] rounded-full bg-fuchsia-950/15 blur-[160px] animate-blob-slow" />
      <motion.div style={{ x: bgOffset.x * -0.6, y: bgOffset.y * -0.6 }} className="absolute bottom-[10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-emerald-950/15 blur-[140px] animate-blob-fast" />
      <motion.div style={{ x: bgOffset.x, y: bgOffset.y }} className="absolute bottom-[-15%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#dfb76c]/12 blur-[160px] animate-blob-slow" />
    </div>

    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#dfb76c]"
          style={{
            width: i % 3 === 0 ? "3px" : "1.5px",
            height: i % 3 === 0 ? "3px" : "1.5px",
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0.15 + Math.random() * 0.45,
          }}
          animate={{ y: [0, -35 - Math.random() * 45, 0], x: [0, 15 - Math.random() * 30, 0], opacity: [0.15, 0.65, 0.15] }}
          transition={{ duration: 9 + Math.random() * 9, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 6 }}
        />
      ))}
    </div>
  </>
);
