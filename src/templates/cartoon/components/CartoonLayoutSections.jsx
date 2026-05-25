import { motion } from "framer-motion";
import { ArrowUpRight, Award, Briefcase, Cpu, Layers, Mail, Quote, Sparkles, Star, Terminal, User, Zap } from "lucide-react";
import { Card, CARD_STAGGER, EmptyState, Section, SectionHeading } from "./ui";

export const HeroBlock = ({ data, roleTitles, experiences, education, projects, topSkills }) => (
  <Section className="md:col-span-8 flex flex-col justify-between min-h-[380px] bg-[#06b6d4]/10">
    <div className="space-y-6">
      <motion.div whileHover={{ scale: 1.05, rotate: -2 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 border-4 border-black rounded-xl bg-[#ec4899] text-white shadow-[3px_3px_0px_#000] rotate-1 font-accent-lux text-xs font-black uppercase cursor-default select-none"><Sparkles className="w-4 h-4" /> Boom! Welcome</motion.div>
      {(data.badgeName?.name || data.badgeName?.badgeTitle) ? (
        <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black rounded-lg bg-[#fde047] text-[10px] font-black uppercase tracking-wider">
          {(data.badgeName?.name || "Portfolio")} {data.badgeName?.badgeTitle ? `| ${data.badgeName.badgeTitle}` : ""}
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none font-serif-lux text-black drop-shadow-[5px_5px_0px_#ec4899] tracking-wider select-none">{data.profile?.name || "Alex Carter"}</h1>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {(roleTitles.length ? roleTitles : ["Super Hero"]).map((title, idx) => {
              const colors = ["bg-[#fde047]", "bg-[#22c55e]", "bg-[#ec4899]"];
              const rot = idx % 2 === 0 ? "rotate-1" : "-rotate-1";
              return <motion.span key={title} whileHover={{ scale: 1.08, rotate: idx % 2 === 0 ? -1 : 1 }} className={["rounded-xl border-4 border-black px-3.5 py-1 text-sm font-black tracking-wide text-black font-accent-lux shadow-[3px_3px_0px_#000] transform cursor-default select-none", colors[idx % colors.length], rot].join(" ")}>{title.toUpperCase()}</motion.span>;
            })}
          </div>
        </div>
        {data.profile?.avatar && <motion.div whileHover={{ scale: 1.05, rotate: -2 }} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-black bg-white overflow-hidden flex-shrink-0 shadow-[4px_4px_0px_#000] rotate-2 transition-transform self-start md:self-auto"><img src={data.profile.avatar} alt={data.profile.name} className="w-full h-full object-cover" /></motion.div>}
      </div>
      <p className="max-w-2xl text-lg font-bold leading-relaxed text-black font-sans-lux bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000]">{data.profile?.summary || "I construct super-powered websites, fight slow build times, and build epic user interfaces!"}</p>
      {Array.isArray(data.profile?.highlights) && data.profile.highlights.filter(Boolean).length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.profile.highlights.filter(Boolean).slice(0, 5).map((item) => (
            <span key={item} className="rounded-lg border-2 border-black bg-white px-2.5 py-1 text-[10px] font-black">
              #{item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
    <div className="grid grid-cols-3 gap-4 border-t-4 border-black pt-6 mt-8">
      <div><p className="text-3xl sm:text-5xl font-black font-serif-lux text-black drop-shadow-[2px_2px_0px_#fde047]">{experiences.length > 0 ? `${experiences.length + education.length}+` : "05+"}</p><p className="text-[11px] font-black tracking-wider uppercase text-neutral-600 font-accent-lux mt-0.5">Milestones</p></div>
      <div><p className="text-3xl sm:text-5xl font-black font-serif-lux text-black drop-shadow-[2px_2px_0px_#22c55e]">{projects.length > 0 ? `${projects.length}+` : "12+"}</p><p className="text-[11px] font-black tracking-wider uppercase text-neutral-600 font-accent-lux mt-0.5">Completed Projects</p></div>
      <div><p className="text-3xl sm:text-5xl font-black font-serif-lux text-black drop-shadow-[2px_2px_0px_#ec4899]">{topSkills.length > 0 ? `${topSkills.length}` : "10+"}</p><p className="text-[11px] font-black tracking-wider uppercase text-neutral-600 font-accent-lux mt-0.5">Power Skills</p></div>
    </div>
  </Section>
);

export const ContactSidebar = ({ contactLinks, getContactIcon }) => (
  <Section className="md:col-span-4 flex flex-col justify-between min-h-[380px] bg-[#fde047]/10">
    <div>
      <SectionHeading label="CONNECT" title="Call Me!" icon={Mail} colorClass="bg-[#22c55e] text-white" />
      <div className="space-y-3 mt-4">
        {contactLinks.length ? contactLinks.map((item, idx) => (
          <motion.a key={`${item.type}-${idx}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} whileHover={{ x: 3, y: 3, boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }} whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }} transition={{ duration: 0.1 }} className="group flex items-center justify-between rounded-2xl border-4 border-black bg-white px-4 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#ec4899]/15">{getContactIcon(item.type)}</div><div><p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 font-accent-lux leading-none">{item.type}</p><p className="text-xs font-bold text-black mt-1 font-sans-lux">{item.text}</p></div></div>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        )) : <p className="rounded-xl border-4 border-dashed border-neutral-400 py-8 text-center text-xs font-bold text-neutral-500">No signals found!</p>}
      </div>
    </div>
    <div className="mt-8 border-t-4 border-black pt-4"><div className="flex items-center gap-3 rounded-2xl bg-white border-4 border-black p-3 shadow-[4px_4px_0px_#000] rotate-1"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black shadow-[0_0_8px_#10b981]"></span></span><p className="text-[10px] font-black uppercase tracking-wider text-black font-accent-lux">ONLINE & ON DUTY</p></div></div>
  </Section>
);

export const ProfileBlock = ({ profileStage, data }) => !profileStage.enabled ? null : (
  <Section>
    <SectionHeading label="BIO" title={profileStage.title} icon={User} colorClass="bg-[#06b6d4]" />
    <div className="space-y-4 max-w-3xl font-sans-lux">
      <p className="text-xl font-bold text-black">Hey! I'm {data.profile?.name || "Alex"}.</p>
      <p className="text-sm font-medium leading-relaxed text-neutral-600">{data.profile?.summary || "I build high-end interactive systems, Neo-Brutalist layouts and responsive web apps that compile successfully with beautiful cartoon effects."}</p>
    </div>
  </Section>
);

export const SkillsBlock = ({ skillsStage, topSkills }) => !skillsStage.enabled ? null : (
  <Section className="bg-[#fde047]/5">
    <SectionHeading label="POWERS" title={skillsStage.title} icon={Cpu} colorClass="bg-[#ec4899] text-white" />
    {topSkills.length ? <div className="flex flex-wrap gap-2.5">{topSkills.map((skill, idx) => { const colors = ["bg-[#ec4899]/10", "bg-[#06b6d4]/10", "bg-[#22c55e]/10", "bg-[#fde047]/10"]; return <motion.span key={`${skill}-${idx}`} whileHover={{ y: -3, scale: 1.08 }} transition={{ duration: 0.12 }} className={["cursor-default rounded-xl border-2 border-black px-3.5 py-1.5 text-xs font-bold text-black transition-all shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] font-sans-lux", colors[idx % colors.length]].join(" ")}>{skill}</motion.span>; })}</div> : <EmptyState message="No powers unlocked yet!" />}
  </Section>
);

export const TimelineBlock = ({ workStage, timelineItems }) => !workStage.enabled || !timelineItems.length ? null : (
  <Section className="bg-[#06b6d4]/5">
    <SectionHeading label="STEPS" title={workStage.title} icon={Briefcase} colorClass="bg-[#fde047]" />
    <div className="space-y-6 ml-2">{timelineItems.map((item, idx) => { const isLast = idx === timelineItems.length - 1; return <div key={idx} className={["relative pl-6 border-l-4 border-black pb-6", isLast ? "pb-0 border-transparent" : ""].join(" ")}><motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="absolute -left-[10px] top-1.5 w-4 h-4 rounded-full bg-[#fde047] border-2 border-black flex items-center justify-center shadow-[1px_1.5px_0px_#000] cursor-pointer"><Star className="w-2 h-2 text-black fill-black" /></motion.div><div className="space-y-1 bg-white border-2 border-black p-3.5 rounded-xl shadow-[3px_3px_0px_#000] font-sans-lux"><span className="text-[9px] text-[#ec4899] font-black font-accent-lux uppercase tracking-wider">{item.date}</span><h3 className="font-serif-lux text-xl text-black leading-snug tracking-wide">{item.title}</h3><p className="text-[10px] font-black text-neutral-500 font-accent-lux">{item.subtitle}</p>{item.description && <p className="text-[11px] text-neutral-600 leading-relaxed pt-1 font-semibold">{item.description}</p>}</div></div>; })}</div>
  </Section>
);

export const ServicesBlock = ({ socialStage, services }) => !socialStage.enabled || !services.length ? null : (
  <Section className="bg-[#ec4899]/5">
    <SectionHeading label="CAPABILITIES" title="Super Powers" icon={Layers} colorClass="bg-[#22c55e] text-white" />
    <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2">
      {services.map((item, idx) => <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[140px] bg-white"><div><div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#fde047] mb-3"><Zap className="w-4 h-4 text-black" /></div><h4 className="font-serif-lux text-2xl text-black tracking-wide">{item.name}</h4>{item.description && <p className="text-xs text-neutral-600 font-sans-lux leading-relaxed mt-2 font-semibold">{item.description}</p>}</div></Card>)}
    </motion.div>
  </Section>
);

export const ProjectsBlock = ({ projects }) => !projects.length ? null : (
  <Section className="bg-[#22c55e]/5">
    <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-6"><div className="flex items-center gap-2"><Terminal className="w-4 h-4 text-black" /><span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black font-accent-lux">PROJECT STRIPS</span></div><h2 className="text-3xl font-black tracking-wide text-black font-serif-lux uppercase">My Creations</h2></div>
    <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2">
      {projects.map((item, idx) => { const techList = item.tech ? item.tech.split(",").map((t) => t.trim()) : []; const cardColors = ["bg-[#ec4899]/5", "bg-[#06b6d4]/5", "bg-[#fde047]/5"]; return <Card key={`${item.name}-${idx}`} colorClass={cardColors[idx % cardColors.length]} className="flex flex-col justify-between min-h-[190px] group"><div className="space-y-3">{item.image && <div className="w-full h-36 rounded-xl border-4 border-black overflow-hidden bg-white mb-3 shadow-[3px_3px_0px_#000] relative"><img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>}<div className="flex justify-between items-start"><span className="font-accent-lux text-[9px] font-black uppercase text-black bg-[#fde047] px-2 py-0.5 border-2 border-black rounded-lg">CELL // 0{idx + 1}</span><ArrowUpRight className="w-4 h-4 text-black" /></div><h3 className="font-serif-lux text-2xl text-black tracking-wide leading-tight">{item.name}</h3><p className="text-xs text-neutral-600 font-sans-lux leading-relaxed line-clamp-3 font-semibold">{item.description}</p></div>{techList.length > 0 && <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t-2 border-dashed border-black">{techList.map((techItem, tIdx) => <span key={tIdx} className="px-2 py-0.5 rounded-lg border-2 border-black bg-white text-[9px] font-bold text-black font-accent-lux">#{techItem}</span>)}</div>}</Card>; })}
    </motion.div>
  </Section>
);

export const TestimonialsBlock = ({ socialStage, testimonials }) => !socialStage.enabled || !testimonials.length ? null : (
  <Section className="bg-[#fde047]/5">
    <SectionHeading label="SIGNALS" title="Client Speak" icon={Quote} colorClass="bg-[#ec4899] text-white" />
    <motion.div variants={CARD_STAGGER} initial="hidden" animate="show" className="space-y-6">
      {testimonials.map((item, idx) => <motion.div key={`${item.name}-${idx}`} whileHover={{ rotate: [0, -1, 1, -1, 0] }} transition={{ duration: 0.4 }} className="relative pb-4"><div className="relative rounded-2xl border-4 border-black p-5 bg-white shadow-[6px_6px_0px_#000] bubble-tail bubble-tail-inner"><Quote className="absolute -top-3 -right-2 w-10 h-10 text-neutral-200 rotate-12 pointer-events-none" /><blockquote className="space-y-4"><p className="text-sm italic font-bold leading-relaxed text-black font-sans-lux">&ldquo;{item.quote}&rdquo;</p></blockquote></div><div className="flex items-center gap-3 mt-8 pl-10"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#06b6d4] text-[11px] font-black text-white font-accent-lux shadow-[2px_2px_0px_#000]">{(item.name || "?")[0].toUpperCase()}</div><div><cite className="not-italic text-xs font-black text-black font-accent-lux uppercase">{item.name}</cite><p className="text-[10px] text-neutral-500 font-sans-lux font-semibold">{item.role}</p></div></div></motion.div>)}
    </motion.div>
  </Section>
);

export const CustomStagesBlock = ({ customStages }) => customStages.map((stage) => (
  <Section key={stage.id}>
    <SectionHeading label="STORY" title={stage.title || "Custom Panel"} icon={Terminal} colorClass="bg-[#fde047]" />
    {stage.kind === "cards" ? <div className="space-y-4">{stage.cards.map((card, idx) => <Card key={`${stage.id}-${idx}`} className="flex flex-col justify-between min-h-[140px] group"><div className="space-y-2">{card.image && <div className="w-full h-36 rounded-xl border-4 border-black overflow-hidden bg-white mb-3 shadow-[3px_3px_0px_#000] relative"><img src={card.image} alt={card.title} className="w-full h-full object-cover" /></div>}<div className="flex justify-between items-start"><h4 className="font-serif-lux text-2xl text-black tracking-wide">{card.title}</h4>{card.link && <a href={card.link} target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform"><ArrowUpRight className="w-4 h-4" /></a>}</div>{card.subtitle && <p className="text-[10px] font-accent-lux text-neutral-500 font-bold uppercase">{card.subtitle}</p>}{card.description && <p className="text-xs text-neutral-600 font-sans-lux leading-relaxed font-semibold">{card.description}</p>}</div></Card>)}</div> : <p className="text-sm leading-relaxed text-black font-sans-lux font-semibold bg-neutral-100 border-4 border-black p-5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-0.5">{stage.paragraph}</p>}
  </Section>
));

export const CertificationsBlock = ({ publishStage, certifications }) => !publishStage.enabled || !certifications.length ? null : (
  <Section className="bg-[#22c55e]/5">
    <SectionHeading label="REGISTRY" title={publishStage.title} icon={Award} colorClass="bg-[#06b6d4] text-white" />
    <div className="space-y-3">{certifications.map((item, idx) => <div key={`${item.name}-${idx}`} className="p-4 rounded-xl bg-white border-4 border-black shadow-[4px_4px_0px_#000] transition-all flex justify-between items-center group font-sans-lux"><div className="space-y-1"><h4 className="font-serif-lux text-xl text-black leading-none">{item.name}</h4><p className="text-[10px] font-accent-lux text-neutral-500 font-bold uppercase">{item.provider}</p></div>{item.link && <a href={item.link} target="_blank" rel="noreferrer" className="font-accent-lux text-[9px] font-black text-black hover:text-[#ec4899] inline-flex items-center gap-1 uppercase tracking-wider">Verify ↗</a>}</div>)}</div>
  </Section>
);

export const PortfolioFooter = ({ name }) => (
  <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-accent-lux text-neutral-500 py-4 mt-8 border-t border-white/[0.04]">
    <p>© {new Date().getFullYear()} {name || "Portfolio Builder"}. All rights reserved.</p>
    <p className="tracking-widest uppercase">// SECURED VIA COMIC STUDIO //</p>
  </footer>
);
