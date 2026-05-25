import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Mail, Terminal, User } from "lucide-react";
import {
  CARD_STAGGER,
  Card,
  DecryptedHeader,
  EmptyState,
  Section,
  SectionHeading,
  getContactIcon,
} from "./CyberPrimitives";
import { TelemetryWidgets, TypewriterShell } from "./CyberEffects";

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
      <div><p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{experiences.length > 0 ? `${experiences.length + education.length}` : "05"}</p><p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Milestones</p></div>
      <div><p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{projects.length > 0 ? `${projects.length}` : "12"}</p><p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Index Traces</p></div>
      <div><p className="text-2xl sm:text-4xl font-bold font-serif-lux text-white">{topSkills.length > 0 ? `${topSkills.length}` : "10"}</p><p className="text-[9px] font-bold tracking-wider uppercase text-neutral-500 font-accent-lux mt-0.5">Core Skills</p></div>
    </div>
  </Section>
);

export const ContactSection = ({ contactLinks }) => (
  <Section className="col-span-1 md:col-span-4 flex flex-col justify-between min-h-[380px] bg-black/30" sysRef="SYS_PORT_MGMT">
    <div>
      <SectionHeading label="CONNECT" title="GET IN TOUCH" icon={Mail} />
      <div className="space-y-3 mt-4">
        {contactLinks.length ? contactLinks.map((item, idx) => (
          <motion.a key={`${item.type}-${idx}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="group flex items-center justify-between rounded-xl border border-[#00f0ff]/15 bg-black/40 px-4 py-3 transition-all duration-300 hover:border-[#ff00ff]/40 hover:bg-[#ff00ff]/5">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded border border-[#00f0ff]/20 bg-black transition-colors group-hover:border-[#ff00ff]/30">{getContactIcon(item.type)}</div><div><p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 font-accent-lux leading-none">{item.type}</p><p className="text-xs font-medium text-neutral-300 mt-1 font-sans-lux">{item.text}</p></div></div>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff00ff]" />
          </motion.a>
        )) : <p className="rounded-xl border border-dashed border-[#00f0ff]/20 py-8 text-center text-xs font-medium text-neutral-500">No ports open.</p>}
      </div>
    </div>

    <div className="mt-8 border-t border-[#00f0ff]/10 pt-4">
      <div className="flex items-center gap-3 rounded-xl bg-black/60 border border-[#00f0ff]/20 p-3 shadow-md">
        <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span></span>
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
        <p className="text-sm font-light leading-relaxed text-neutral-400">{data.profile?.summary || "Developer specialized in high-performance web systems and glitch responsive layouts."}</p>
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
            <motion.span key={`${skill}-${idx}`} whileHover={{ y: -2, scale: 1.05, borderColor: "#ff00ff", color: "#ffffff" }} transition={{ duration: 0.15 }} className="cursor-default bg-black/75 border border-[#00f0ff]/30 px-3 py-1.5 text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider relative transition-colors shadow-[0_0_8px_rgba(0,240,255,0.05)] hover:shadow-[0_0_12px_rgba(255,0,255,0.2)]" style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
              <span className="text-[#ff00ff] mr-1.5">//</span>{skill}
            </motion.span>
          ))}
        </div>
      ) : (
        <EmptyState message="No parameters configured." />
      )}
    </Section>
  );
};
