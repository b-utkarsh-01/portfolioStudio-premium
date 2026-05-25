import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STARTUP_LOGS = [
  "SYSTEM STATUS: SECURE",
  "PORTFOLIO MATRIX MODULE: LOADED",
  "DECRYPTING PROFILE SUMMARY DATA...",
  "RESOLVED // OUTPUTTING DATA LOG:",
];

export const TypewriterShell = ({ summary }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let currentLogIdx = 0;
    const finalSummaryText =
      summary ||
      "Welcome to my secure developer terminal. Review my digital footprints, project coordinates, and credentials.";
    const finalSummaryWords = finalSummaryText.split(" ");
    const displayedSummaryWords = [];

    const interval = setInterval(() => {
      if (currentLogIdx < STARTUP_LOGS.length) {
        setLines((prev) => [...prev, STARTUP_LOGS[currentLogIdx]]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
        let wordIdx = 0;
        const wordTimer = setInterval(() => {
          if (wordIdx < finalSummaryWords.length) {
            displayedSummaryWords.push(finalSummaryWords[wordIdx]);
            setLines((prev) => {
              const base = prev.slice(0, STARTUP_LOGS.length);
              return [...base, displayedSummaryWords.join(" ")];
            });
            wordIdx++;
          } else {
            clearInterval(wordTimer);
          }
        }, 80);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [summary]);

  return (
    <div className="font-mono text-xs text-neutral-400 bg-black/85 p-4 border border-[#00f0ff]/20 rounded-2xl relative shadow-[inset_0_0_20px_rgba(0,240,255,0.06)] overflow-hidden min-h-[180px]">
      <div className="absolute top-3 right-3 flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-2 mt-2 leading-relaxed">
        {lines.map((line, idx) => {
          const isLast = idx === lines.length - 1;
          const isSummary = idx === STARTUP_LOGS.length || (lines.length > STARTUP_LOGS.length && idx === lines.length - 1);
          return (
            <p key={idx} className={isSummary ? "text-[#00f0ff] font-medium" : "text-neutral-500"}>
              <span className="text-[#ff00ff] mr-2">&gt;</span>
              {line}
              {isLast && <span className="inline-block w-1.5 h-3.5 bg-[#00f0ff] ml-1 animate-pulse" />}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(canvas.width / 20) + 1;
    const ypos = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 3, 4, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00f0ff";
      ctx.font = "11px monospace";

      for (let i = 0; i < ypos.length; i++) {
        const char = Math.random() > 0.5 ? "1" : "0";
        const x = i * 20;
        const y = ypos[i];

        ctx.fillStyle = Math.random() > 0.95 ? "#ff00ff" : "#00f0ff";
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          ypos[i] = 0;
        } else {
          ypos[i] += 20;
        }
      }
    };

    const run = () => {
      draw();
      animationId = requestAnimationFrame(run);
    };
    run();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="matrix-canvas" className="absolute inset-0 w-full h-full object-cover z-0 opacity-15 pointer-events-none" />;
};

export const TelemetryWidgets = () => {
  const [cpu, setCpu] = useState(42);
  const [mem, setMem] = useState(64);
  const [packets, setPackets] = useState(1280);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu((prev) => {
        const next = prev + Math.floor(Math.random() * 15) - 7;
        return Math.min(Math.max(next, 20), 85);
      });
      setMem((prev) => {
        const next = prev + Math.floor(Math.random() * 3) - 1;
        return Math.min(Math.max(next, 58), 70);
      });
      setPackets((prev) => prev + Math.floor(Math.random() * 12) + 2);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4 border-t border-[#00f0ff]/10 pt-6 mt-8">
      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#ff00ff] font-accent-lux mb-2">SYSTEM TELEMETRY</p>

      <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
        <div className="border border-[#00f0ff]/15 bg-black/40 p-2.5 rounded-lg">
          <div className="flex justify-between mb-1.5 text-neutral-500">
            <span>CPU_LOAD</span>
            <span className="text-[#00f0ff]">{cpu}%</span>
          </div>
          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${cpu}%` }} transition={{ duration: 0.8 }} className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff]" />
          </div>
        </div>

        <div className="border border-[#00f0ff]/15 bg-black/40 p-2.5 rounded-lg">
          <div className="flex justify-between mb-1.5 text-neutral-500">
            <span>SYS_MEM</span>
            <span className="text-[#00f0ff]">{mem}%</span>
          </div>
          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${mem}%` }} transition={{ duration: 0.8 }} className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff]" />
          </div>
        </div>
      </div>

      <div className="border border-[#00f0ff]/15 bg-black/40 p-3 rounded-lg flex justify-between items-center text-[10px]">
        <div className="space-y-0.5">
          <p className="text-neutral-500 uppercase">SYS_LOG_PACKETS</p>
          <p className="text-white font-bold">{packets} RX/TX</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-[#00f0ff]/5 border border-[#00f0ff]/20 px-2 py-0.5 text-[#00f0ff] uppercase tracking-wider text-[8px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          SECURE_SSL
        </div>
      </div>
    </div>
  );
};

export const BiosBootScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING COGNITIVE INTERFACE...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING RETRO CYBER-DECK ENVIRONMENT...",
    "MEMTEST86+ CLOCK 3200MHz // CL16 STATUS: OK",
    "ALLOCATING HEAP VIRTUAL BUFFER (16GB)...",
    "LINKING FRONTEND ROUTER ENGINE...",
    "PORTFOLIO CONFIG DECRYPTION: IN PROGRESS...",
    "PORTFOLIO CONFIG DECRYPTION: COMPLETED",
    "PREPARING NEON MATRIX CANVAS RENDERER...",
    "SYSTEM SECURE. BOOT SUCCESSFUL.",
  ];

  useEffect(() => {
    let logIdx = 0;
    let progressVal = 0;

    const logInterval = setInterval(() => {
      if (logIdx < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIdx]]);
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 180);

    const progressInterval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 8) + 4;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
      setProgress(progressVal);
    }, 70);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const barWidth = Math.floor(progress / 5);
  const loadingBar = "¦".repeat(barWidth) + "¦".repeat(20 - barWidth);

  return (
    <div onClick={onComplete} className="fixed inset-0 bg-[#020203] z-[99999] flex flex-col justify-between p-6 sm:p-12 font-mono text-[#00f0ff] cursor-pointer selection:bg-none">
      <div className="space-y-4">
        <div className="border-b border-[#00f0ff]/20 pb-4 flex justify-between items-start text-xs sm:text-sm text-neutral-500">
          <div>
            <p>ANTIGRAVITY BIOS v4.02.88</p>
            <p>COPYRIGHT (C) 2026 CYBERNETICS CORP.</p>
          </div>
          <p className="text-right">NODE // 0x93FF</p>
        </div>

        <div className="space-y-2 text-xs sm:text-sm max-h-[60vh] overflow-y-auto no-scrollbar">
          {logs.map((log, idx) => (
            <p key={idx} className={idx === logs.length - 1 ? "text-white" : "text-[#00f0ff]/80"}>
              <span className="text-[#ff00ff] mr-2">&gt;&gt;</span>
              {log}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs sm:text-sm">
          <span>DECRYPTION PROGRESS:</span>
          <span>{progress}%</span>
        </div>
        <p className="text-sm font-semibold tracking-wider">{loadingBar}</p>
        <p className="text-[10px] text-neutral-500 animate-pulse">CLICK ANYWHERE TO BYPASS BOOT PROTOCOL</p>
      </div>
    </div>
  );
};
