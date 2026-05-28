import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Section, SectionHeading } from "./ui";
import { getContactIcon } from "../utils/obsidianUtils";

const ObsidianTopRow = ({ data, nameParts, roleTitles, experiences, education, topSkills, contactLinks }) => (
  <>
    <Section className="md:col-span-8 flex flex-col justify-between min-h-[380px]">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <svg className="w-12 h-12 text-[#dfb76c] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="50" cy="50" r="42" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <path d="M50 15 L50 85 M15 50 L85 50" strokeWidth="0.8" opacity="0.5" />
          </svg>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-accent-lux text-[10px] uppercase tracking-widest text-[#dfb76c] font-bold">CREATIVE CABINET</span>
            </div>
            <p className="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase leading-none">ESTABLISHED // PORTFOLIO</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between pt-2">
          <div className="space-y-4">
            {(data.badgeName?.name || data.badgeName?.badgeTitle) ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 font-accent-lux">
                {(data.badgeName?.name || "Portfolio")} {data.badgeName?.badgeTitle ? `| ${data.badgeName.badgeTitle}` : ""}
              </p>
            ) : null}
            <h1 className="text-4xl sm:text-7xl font-extralight leading-none tracking-tight font-serif-lux select-none bg-gradient-to-r from-[#f3e7c4] via-[#dfb76c] to-[#a47734] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(223,183,108,0.15)] pb-1">
              {nameParts.first} {nameParts.last}
            </h1>
            <div className="flex flex-wrap gap-2 pt-1">
              {(roleTitles.length ? roleTitles : ["Creative Designer"]).map((title) => (
                <span key={title} className="rounded-full border border-[#dfb76c]/30 bg-neutral-950/60 px-4 py-1.5 text-[9px] font-bold tracking-widest text-[#dfb76c] font-accent-lux shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                  {title.toUpperCase()}
                </span>
              ))}
            </div>
            {Array.isArray(data.profile?.highlights) && data.profile.highlights.filter(Boolean).length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {data.profile.highlights.filter(Boolean).slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full border border-[#dfb76c]/20 bg-[#dfb76c]/[0.02] px-3 py-1 text-[9px] font-bold text-[#dfb76c]/80 font-accent-lux tracking-wider uppercase">
                    #{item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {data.profile?.avatar && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#dfb76c]/20 bg-neutral-900 overflow-hidden flex-shrink-0 shadow-[0_8px_30px_rgba(0,0,0,0.8)] relative group">
              <img src={data.profile.avatar} alt={data.profile.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#dfb76c]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          )}
        </div>

        <p className="max-w-2xl text-lg font-light leading-relaxed text-neutral-300 font-sans-lux pt-3">
          {data.profile?.summary || "Passionate developer & designer crafting elegant digital masterpieces using modern standards."}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-white/[0.04] pt-6 mt-8 relative">
        <div className="space-y-1">
          <p className="text-3xl sm:text-5xl font-extralight font-serif-lux bg-gradient-to-r from-[#f3e7c4] to-[#dfb76c] bg-clip-text text-transparent">{experiences.length > 0 ? `${experiences.length + education.length}+` : "05+"}</p>
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 font-accent-lux mt-1">Milestones</p>
        </div>
        <div className="space-y-1 border-l border-white/[0.04] pl-4 sm:pl-8">
          <p className="text-3xl sm:text-5xl font-extralight font-serif-lux bg-gradient-to-r from-[#f3e7c4] to-[#dfb76c] bg-clip-text text-transparent">{(data.projects || []).length > 0 ? `${(data.projects || []).length}+` : "12+"}</p>
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 font-accent-lux mt-1">Projects</p>
        </div>
        <div className="space-y-1 border-l border-white/[0.04] pl-4 sm:pl-8">
          <p className="text-3xl sm:text-5xl font-extralight font-serif-lux bg-gradient-to-r from-[#f3e7c4] to-[#dfb76c] bg-clip-text text-transparent">{topSkills.length > 0 ? `${topSkills.length}` : "10+"}</p>
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-500 font-accent-lux mt-1">Expertise</p>
        </div>
      </div>
    </Section>

    <Section className="md:col-span-4 flex flex-col justify-between min-h-[380px]">
      <div>
        <SectionHeading label="CONNECT" title="Get In Touch" icon={Mail} />
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
                className="contact-card-target group flex items-center justify-between rounded-xl border border-[#dfb76c]/15 bg-neutral-950/30 px-4 py-3 transition-all duration-300 hover:border-[#dfb76c]/40 hover:bg-[#dfb76c]/[0.03]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-neutral-900/50 transition-colors group-hover:border-[#dfb76c]/30">
                    {getContactIcon(item.type)}
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 font-accent-lux leading-none">{item.type}</p>
                    <p className="text-xs font-medium text-neutral-300 mt-1 font-sans-lux">{item.text}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#dfb76c]" />
              </motion.a>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-white/10 py-8 text-center text-xs font-medium text-neutral-500">No contact links configured.</p>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-white/[0.04] pt-4">
        <div className="flex items-center gap-3 rounded-xl bg-neutral-950/35 border border-white/[0.03] p-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
          </span>
          <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 font-accent-lux">AVAILABLE FOR COLLABORATION</p>
        </div>
      </div>
    </Section>
  </>
);

export default ObsidianTopRow;
