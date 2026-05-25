import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Cpu,
  Layers,
  Mail,
  Quote,
  Terminal,
  User,
  Zap,
} from "lucide-react";
import {
  CARD_STAGGER,
  Card,
  DecryptedHeader,
  EmptyState,
  Section,
  SectionHeading,
  getContactIcon,
} from "./CyberPrimitives";
import { MatrixRain, TelemetryWidgets, TypewriterShell } from "./CyberEffects";

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

export const HeroSection = ({ data, roleTitles, experiences, education, projects, topSkills }) => (
  <Section className="col-span-1 md:col-span-8 flex flex-col justify-between min-h-[380px] bg-black/30" sysRef="SYS_HERO_NODE">
    <div className="space-y-6">
      <div className="flex items-center gap-2 border border-[#00f0ff]/30 w-fit px-3 py-1 rounded bg-[#00f0ff]/5 select-none">
        <Terminal className="w-3.5 h-3.5 text-[#ff00ff]" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#00f0ff]">ROOT@TERMINAL:~#</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-bold leading-none tracking-tight font-serif-lux text-white text-glow-cyan select-none">
            {data.profile?.name || "Alex Carter"}
          </h1>
          <div className="flex flex-wrap gap-2 pt-2">
            {(roleTitles.length ? roleTitles : ["Hacker Specialist"]).map((title) => (
              <span key={title} className="rounded border border-[#ff00ff]/30 bg-black/60 px-3 py-1 text-xs font-semibold tracking-wide text-[#ff00ff] font-sans-lux shadow-sm">
                {title.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        {data.profile?.avatar && (
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-2 border-[#00f0ff]/30 bg-black overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)] relative group self-start md:self-auto glitch-image-hover">
            <img src={data.profile.avatar} alt={data.profile.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/10 to-transparent pointer-events-none" />
          </div>
        )}
      </div>
      <TypewriterShell summary={data.profile?.summary} />
    </div>
    <div className="grid grid-cols-3 gap-4 border-t border-[#00f0ff]/10 pt-6 mt-8">
      <div>
        <p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{experiences.length > 0 ? `${experiences.length + education.length}` : "05"}</p>
        <p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Milestones</p>
      </div>
      <div>
        <p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{projects.length > 0 ? `${projects.length}` : "12"}</p>
        <p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Index Traces</p>
      </div>
      <div>
        <p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{topSkills.length > 0 ? `${topSkills.length}` : "10"}</p>
        <p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Core Skills</p>
      </div>
    </div>
  </Section>
);

export const ContactSection = ({ contactLinks }) => (
  <Section className="col-span-1 md:col-span-4 flex flex-col justify-between min-h-[380px] bg-black/30" sysRef="SYS_PORT_MGMT">
    <div>
      <SectionHeading label="CONNECT" title="GET IN TOUCH" icon={Mail} />
      <div className="space-y-3 mt-4">
        {contactLinks.length ? (
          contactLinks.map((item, idx) => (
            <motion.a
              key={`${item.type}-${idx}`}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center justify-between rounded-xl border border-[#00f0ff]/15 bg-black/40 px-4 py-3 transition-all duration-300 hover:border-[#ff00ff]/40 hover:bg-[#ff00ff]/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded border border-[#00f0ff]/20 bg-black transition-colors group-hover:border-[#ff00ff]/30">
                  {getContactIcon(item.type)}
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 font-accent-lux leading-none">{item.type}</p>
                  <p className="text-xs font-medium text-neutral-300 mt-1 font-sans-lux">{item.text}</p>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff00ff]" />
            </motion.a>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-[#00f0ff]/20 py-8 text-center text-xs font-medium text-neutral-500">No ports open.</p>
        )}
      </div>
    </div>

    <div className="mt-8 border-t border-[#00f0ff]/10 pt-4">
      <div className="flex items-center gap-3 rounded-xl bg-black/60 border border-[#00f0ff]/20 p-3 shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
        </span>
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#00f0ff] font-accent-lux">HOST ONLINE // NODE: 0x93FF</p>
      </div>
      <TelemetryWidgets />
    </div>
  </Section>
);

export const BioSection = ({ data, profileStage }) => {
  if (!profileStage.enabled) return null;
  return (
    <Section className="col-span-1 md:col-span-7" sysRef="SYS_BIO_DATA">
      <SectionHeading label="BIO NODE" title={profileStage.title} icon={User} />
      <div className="space-y-4 max-w-3xl font-sans-lux">
        <p className="text-lg font-light text-[#00f0ff] leading-relaxed">IDENT: {data.profile?.name || "Alex"}.</p>
        <p className="text-sm font-light leading-relaxed text-neutral-400">
          {data.profile?.summary || "Developer specialized in high-performance web systems and glitch responsive layouts."}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-2.5 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[9px] font-semibold text-[#00f0ff] font-accent-lux">CYBER DESIGN</span>
          <span className="px-2.5 py-0.5 rounded bg-[#ff00ff]/10 border border-[#ff00ff]/20 text-[9px] font-semibold text-[#ff00ff] font-accent-lux">MONOSPACED LOGIC</span>
        </div>
      </div>
    </Section>
  );
};

export const SkillsSection = ({ skillsStage, topSkills }) => {
  if (!skillsStage.enabled) return null;
  return (
    <Section className="col-span-1 md:col-span-5" sysRef="SYS_SKILL_EXP">
      <SectionHeading label="EXPERTISE" title={skillsStage.title} icon={Cpu} />
      {topSkills.length ? (
        <div className="flex flex-wrap gap-2 pt-2">
          {topSkills.map((skill, idx) => (
            <motion.span
              key={`${skill}-${idx}`}
              whileHover={{ y: -2, scale: 1.05, borderColor: "#ff00ff", color: "#ffffff" }}
              transition={{ duration: 0.15 }}
              className="cursor-default bg-black/75 border border-[#00f0ff]/30 px-3 py-1.5 text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider relative transition-colors shadow-[0_0_8px_rgba(0,240,255,0.05)] hover:shadow-[0_0_12px_rgba(255,0,255,0.2)]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              <span className="text-[#ff00ff] mr-1.5">//</span>
              {skill}
            </motion.span>
          ))}
        </div>
      ) : (
        <EmptyState message="No parameters configured." />
      )}
    </Section>
  );
};

export const ProjectsSection = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-12" sysRef="SYS_PRJ_LOGS">
      <div className="flex justify-between items-center border-b border-[#00f0ff]/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00f0ff]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00f0ff] font-accent-lux">INDEX TRACES</span>
        </div>
        <h2 className="text-3xl font-light tracking-tight text-white font-serif-lux uppercase">
          <DecryptedHeader text="Active Creations" />
        </h2>
      </div>

      <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, idx) => {
          const techList = item.tech ? item.tech.split(",").map((t) => t.trim()) : [];
          return (
            <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[180px] group">
              <div className="space-y-3">
                {item.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-[#00f0ff]/20 mb-3 relative bg-black glitch-image-hover">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
                    <div className="absolute inset-0 bg-[#00f0ff]/10 pointer-events-none" />
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <span className="font-accent-lux text-[9px] text-[#ff00ff] font-bold tracking-wider">INDEX // 0x0{idx + 1}</span>
                  <span className="text-neutral-600 transition-colors duration-300 group-hover:text-[#ff00ff]">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <h3 className="font-serif-lux text-lg text-white font-medium group-hover:text-[#00f0ff] transition-colors leading-tight">{item.name}</h3>
                <p className="text-xs text-neutral-400 font-sans-lux leading-relaxed line-clamp-3 font-light">{item.description}</p>
              </div>
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#00f0ff]/10">
                  {techList.map((techItem, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-black border border-[#00f0ff]/20 text-[9px] font-medium text-[#00f0ff] font-sans-lux">
                      {techItem}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </motion.div>
    </Section>
  );
};

export const TimelineSection = ({ workStage, experiences, education }) => {
  if (!workStage.enabled || (experiences.length === 0 && education.length === 0)) return null;
  return (
    <Section className="col-span-1 md:col-span-12" sysRef="SYS_TIME_TRACE">
      <div className="grid gap-8 md:grid-cols-2">
        {experiences.length > 0 && (
          <div>
            <SectionHeading label="WORK HISTORY" title="INDEX TRACE // EXP" icon={Briefcase} />
            <div className="space-y-6 ml-2">
              {experiences.map((item, idx) => {
                const isLast = idx === experiences.length - 1;
                return (
                  <div key={idx} className={`relative pl-6 border-l border-[#00f0ff]/20 pb-6 ${isLast ? "pb-0 border-transparent" : ""} group`}>
                    <div className="absolute -left-[5px] top-2.5 w-2 h-2 bg-black border border-[#00f0ff] group-hover:bg-[#ff00ff] group-hover:border-[#ff00ff] group-hover:shadow-[0_0_8px_#ff00ff] transition-all duration-300 rotate-45" />
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#ff00ff] font-bold font-accent-lux uppercase tracking-wider">{item.period}</span>
                      <h3 className="font-serif-lux text-sm text-white font-medium leading-snug group-hover:text-[#00f0ff] transition-colors">{item.title}</h3>
                      <p className="text-[10px] font-bold text-neutral-400 font-accent-lux">{item.company}</p>
                      {item.description && <p className="text-[11px] text-neutral-500 font-sans-lux leading-relaxed pt-1 font-light">{item.description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <SectionHeading label="ACADEMIC RECORDS" title="INDEX TRACE // EDU" icon={Award} />
            <div className="space-y-6 ml-2">
              {education.map((item, idx) => {
                const isLast = idx === education.length - 1;
                const first = item.items?.[0] || {};
                return (
                  <div key={idx} className={`relative pl-6 border-l border-[#00f0ff]/20 pb-6 ${isLast ? "pb-0 border-transparent" : ""} group`}>
                    <div className="absolute -left-[5px] top-2.5 w-2 h-2 bg-black border border-[#00f0ff] group-hover:bg-[#ff00ff] group-hover:border-[#ff00ff] group-hover:shadow-[0_0_8px_#ff00ff] transition-all duration-300 rotate-45" />
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#ff00ff] font-bold font-accent-lux uppercase tracking-wider">{item.subtitle}</span>
                      <h3 className="font-serif-lux text-sm text-white font-medium leading-snug group-hover:text-[#00f0ff] transition-colors">{first.degree || "Degree"}</h3>
                      <p className="text-[10px] font-bold text-neutral-400 font-accent-lux">{first.institute || "Institute"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export const ServicesSection = ({ socialStage, services }) => {
  if (!socialStage.enabled || !services || services.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-12" sysRef="SYS_SVC_CAPS">
      <SectionHeading label="CAPABILITIES" title="CORE UTILITIES" icon={Layers} />
      <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item, idx) => (
          <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex h-7 w-7 items-center justify-center rounded border border-[#00f0ff]/20 bg-black mb-3">
                <Zap className="w-3.5 h-3.5 text-[#ff00ff]" />
              </div>
              <h4 className="font-serif-lux text-base text-white font-medium">{item.name}</h4>
              {item.description && <p className="text-xs text-neutral-400 font-sans-lux leading-relaxed mt-2 font-light">{item.description}</p>}
            </div>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

export const CredentialsSection = ({ publishStage, certifications }) => {
  if (!publishStage.enabled || !certifications || certifications.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-6" sysRef="SYS_REG_CRED">
      <SectionHeading label="REGISTRY" title={publishStage.title} icon={Award} />
      <div className="space-y-3">
        {certifications.map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="p-4 rounded-xl bg-black/30 border border-[#00f0ff]/15 hover:border-[#ff00ff]/35 transition-all duration-300 flex justify-between items-center group">
            <div className="space-y-1">
              <h4 className="font-serif-lux text-sm text-white font-medium group-hover:text-[#00f0ff] transition-colors">{item.name}</h4>
              <p className="text-[10px] font-accent-lux text-neutral-500 font-semibold">{item.provider}</p>
            </div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="font-accent-lux text-[9px] font-bold text-[#ff00ff] hover:text-[#00f0ff] inline-flex items-center gap-1 uppercase tracking-wider">
                Verify ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export const TestimonialsSection = ({ socialStage, testimonials }) => {
  if (!socialStage.enabled || !testimonials || testimonials.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-6" sysRef="SYS_RX_TRANS">
      <SectionHeading label="SIGNALS" title="CLIENT TRANSCRIPTS" icon={Quote} />
      <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="space-y-4">
        {testimonials.map((item, idx) => (
          <Card key={`${item.name}-${idx}`} className="relative p-6 overflow-hidden">
            <Quote className="absolute -top-3 -left-2 w-16 h-16 text-white/[0.02] rotate-12 pointer-events-none" />
            <blockquote className="space-y-4">
              <p className="text-sm italic font-light font-serif-lux leading-relaxed text-neutral-300">&ldquo;{item.quote}&rdquo;</p>
              <footer className="flex items-center gap-3 border-t border-[#00f0ff]/10 pt-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-black border border-[#00f0ff]/20 text-[11px] font-bold text-[#ff00ff] font-accent-lux">
                  {(item.name || "?")[0].toUpperCase()}
                </div>
                <div>
                  <cite className="not-italic text-xs font-semibold text-white font-accent-lux">{item.name}</cite>
                  <p className="text-[10px] text-neutral-500 font-sans-lux">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

export const CustomStagesSection = ({ customStages }) => {
  if (!customStages || customStages.length === 0) return null;
  return (
    <>
      {customStages.map((stage) => (
        <Section key={stage.id} className="col-span-1 md:col-span-12" sysRef={`SYS_NODE_${(stage.id || 'CUST').substring(0, 4).toUpperCase()}`}>
          <SectionHeading label="STAGE_LOG" title={stage.title || "Custom Node"} icon={Terminal} />
          {stage.kind === "cards" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {stage.cards.map((card, idx) => (
                <Card key={`${stage.id}-${idx}`} className="flex flex-col justify-between min-h-[140px] group">
                  <div className="space-y-2">
                    {card.image && (
                      <div className="w-full h-32 rounded-lg overflow-hidden border border-[#00f0ff]/20 mb-3 relative bg-black glitch-image-hover">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none opacity-40" />
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif-lux text-base text-white font-medium group-hover:text-[#00f0ff] transition-colors">{card.title}</h4>
                      {card.link && (
                        <a href={card.link} target="_blank" rel="noreferrer" className="text-neutral-600 transition-colors group-hover:text-[#00f0ff]">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {card.subtitle && <p className="text-[10px] font-accent-lux text-[#ff00ff] font-semibold">{card.subtitle}</p>}
                    {card.description && <p className="text-xs text-neutral-500 font-sans-lux leading-relaxed">{card.description}</p>}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-neutral-400 font-sans-lux font-light bg-black/40 border border-[#00f0ff]/10 p-5 rounded-2xl">{stage.paragraph}</p>
          )}
        </Section>
      ))}
    </>
  );
};

export const CyberFooter = ({ name }) => (
  <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-accent-lux text-neutral-500 py-4 mt-8 border-t border-[#00f0ff]/10">
    <p>© {new Date().getFullYear()} {name || "Portfolio Builder"}. All rights reserved.</p>
    <p className="tracking-widest uppercase">// SECURED VIA CYBER TERMINAL SECURITY //</p>
  </footer>
);
