import { motion } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, Layers, Quote, Terminal, Zap } from "lucide-react";
import { CARD_STAGGER, Card, DecryptedHeader, Section, SectionHeading } from "./CyberPrimitives";

export const ProjectsSection = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-12" sysRef="SYS_PRJ_LOGS">
      <div className="flex justify-between items-center border-b border-[#00f0ff]/10 pb-4 mb-6">
        <div className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#00f0ff]" /><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00f0ff] font-accent-lux">INDEX TRACES</span></div>
        <h2 className="text-3xl font-light tracking-tight text-white font-serif-lux uppercase"><DecryptedHeader text="Active Creations" /></h2>
      </div>
      <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((item, idx) => {
          const techList = item.tech ? item.tech.split(",").map((t) => t.trim()) : [];
          return (
            <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[180px] group">
              <div className="space-y-3">
                <div className="flex justify-between items-start"><span className="font-accent-lux text-[9px] text-[#ff00ff] font-bold tracking-wider">INDEX // 0x0{idx + 1}</span><span className="text-neutral-600 transition-colors duration-300 group-hover:text-[#ff00ff]"><ArrowUpRight className="w-4 h-4" /></span></div>
                <h3 className="font-serif-lux text-lg text-white font-medium group-hover:text-[#00f0ff] transition-colors leading-tight">{item.name}</h3>
                <p className="text-xs text-neutral-400 font-sans-lux leading-relaxed line-clamp-3 font-light">{item.description}</p>
              </div>
              {techList.length > 0 && <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#00f0ff]/10">{techList.map((techItem, tIdx) => <span key={tIdx} className="px-2 py-0.5 rounded bg-black border border-[#00f0ff]/20 text-[9px] font-medium text-[#00f0ff] font-sans-lux">{techItem}</span>)}</div>}
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
        {experiences.length > 0 && <div><SectionHeading label="WORK HISTORY" title="INDEX TRACE // EXP" icon={Briefcase} /><div className="space-y-6 ml-2">{experiences.map((item, idx) => <div key={idx} className="relative pl-6 border-l border-[#00f0ff]/20 pb-6"><div className="absolute -left-[5px] top-2.5 w-2 h-2 bg-black border border-[#00f0ff] rotate-45" /><span className="text-[9px] text-[#ff00ff] font-bold font-accent-lux uppercase tracking-wider">{item.period}</span><h3 className="font-serif-lux text-sm text-white font-medium leading-snug">{item.title}</h3><p className="text-[10px] font-bold text-neutral-400 font-accent-lux">{item.company}</p></div>)}</div></div>}
        {education.length > 0 && <div><SectionHeading label="ACADEMIC RECORDS" title="INDEX TRACE // EDU" icon={Award} /><div className="space-y-6 ml-2">{education.map((item, idx) => { const first = item.items?.[0] || {}; return <div key={idx} className="relative pl-6 border-l border-[#00f0ff]/20 pb-6"><div className="absolute -left-[5px] top-2.5 w-2 h-2 bg-black border border-[#00f0ff] rotate-45" /><span className="text-[9px] text-[#ff00ff] font-bold font-accent-lux uppercase tracking-wider">{item.subtitle}</span><h3 className="font-serif-lux text-sm text-white font-medium leading-snug">{first.degree || "Degree"}</h3><p className="text-[10px] font-bold text-neutral-400 font-accent-lux">{first.institute || "Institute"}</p></div>; })}</div></div>}
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
        {services.map((item, idx) => <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[140px]"><h4 className="font-serif-lux text-base text-white font-medium">{item.name}</h4>{item.description && <p className="text-xs text-neutral-400 font-sans-lux leading-relaxed mt-2 font-light">{item.description}</p>}<Zap className="w-3.5 h-3.5 text-[#ff00ff]" /></Card>)}
      </motion.div>
    </Section>
  );
};

export const CredentialsSection = ({ publishStage, certifications }) => {
  if (!publishStage.enabled || !certifications || certifications.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-6" sysRef="SYS_REG_CRED">
      <SectionHeading label="REGISTRY" title={publishStage.title} icon={Award} />
      <div className="space-y-3">{certifications.map((item, idx) => <div key={`${item.name}-${idx}`} className="p-4 rounded-xl bg-black/30 border border-[#00f0ff]/15"><h4 className="font-serif-lux text-sm text-white font-medium">{item.name}</h4><p className="text-[10px] font-accent-lux text-neutral-500 font-semibold">{item.provider}</p></div>)}</div>
    </Section>
  );
};

export const TestimonialsSection = ({ socialStage, testimonials }) => {
  if (!socialStage.enabled || !testimonials || testimonials.length === 0) return null;
  return (
    <Section className="col-span-1 md:col-span-6" sysRef="SYS_RX_TRANS">
      <SectionHeading label="SIGNALS" title="CLIENT TRANSCRIPTS" icon={Quote} />
      <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="space-y-4">{testimonials.map((item, idx) => <Card key={`${item.name}-${idx}`} className="relative p-6 overflow-hidden"><p className="text-sm italic font-light font-serif-lux leading-relaxed text-neutral-300">&ldquo;{item.quote}&rdquo;</p><cite className="not-italic text-xs font-semibold text-white font-accent-lux">{item.name}</cite></Card>)}</motion.div>
    </Section>
  );
};

export const CustomStagesSection = ({ customStages }) => {
  if (!customStages || customStages.length === 0) return null;
  const getStageBadge = (value) => { const base = `${value || ""}`.trim(); if (!base) return "CUSTOM_STAGE"; return base.toUpperCase().replace(/\s+/g, "_"); };
  return <>{customStages.map((stage) => <Section key={stage.id} className="col-span-1 md:col-span-12" sysRef={`SYS_NODE_${(stage.id || 'CUST').substring(0, 4).toUpperCase()}`}><SectionHeading label={getStageBadge(stage.title)} title={stage.title || "Custom Stage"} icon={Terminal} />{stage.kind === "cards" ? <div className="grid gap-4 sm:grid-cols-2">{stage.cards.map((card, idx) => <Card key={`${stage.id}-${idx}`} className="flex flex-col justify-between min-h-[140px] group"><h4 className="font-serif-lux text-base text-white font-medium">{card.title}</h4>{card.subtitle && <p className="text-[10px] font-accent-lux text-[#ff00ff] font-semibold">{card.subtitle}</p>}{card.description && <p className="text-xs text-neutral-500 font-sans-lux leading-relaxed">{card.description}</p>}</Card>)}</div> : <p className="text-sm leading-relaxed text-neutral-400 font-sans-lux font-light bg-black/40 border border-[#00f0ff]/10 p-5 rounded-2xl">{stage.paragraph}</p>}</Section>)}</>;
};

export const CyberFooter = ({ name }) => (
  <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-accent-lux text-neutral-500 py-4 mt-8 border-t border-[#00f0ff]/10">
    <p>© {new Date().getFullYear()} {name || "Portfolio Builder"}. All rights reserved.</p>
    <p className="tracking-widest uppercase">// SECURED VIA CYBER TERMINAL SECURITY //</p>
  </footer>
);
