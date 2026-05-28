import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Quote, Terminal, User, Zap } from "lucide-react";
import { Card, CARD_STAGGER, Section, SectionHeading } from "./ui";

const ObsidianLeftColumn = ({ data, profileStage, projects, socialStage, services, testimonials, customStages }) => (
  <div className="md:col-span-8 space-y-6">
    {profileStage.enabled ? (
      <Section>
        <SectionHeading label="ABOUT ME" title={profileStage.title} icon={User} />
        <div className="space-y-4 max-w-3xl">
          <p className="text-xl font-light leading-relaxed text-[#dfb76c] font-serif-lux">Hi, I'm {data.profile?.name || "Alicia Reed"}.</p>
          <p className="text-sm font-light leading-relaxed text-neutral-400 font-sans-lux">
            {data.profile?.summary || "I am a creator dedicated to build scalable, high-performance web products, with absolute focus on modern interface design, code structure and semantic implementation details."}
          </p>
        </div>
      </Section>
    ) : null}

    {projects.length > 0 ? (
      <Section>
        <div className="flex justify-between items-center border-b border-[#dfb76c]/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#dfb76c]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#dfb76c] font-accent-lux">SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-white font-serif-lux">Featured Projects</h2>
        </div>

        <motion.div variants={CARD_STAGGER} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
          {projects.map((item, idx) => {
            const techList = Array.isArray(item.tech) 
              ? item.tech 
              : typeof item.tech === "string" 
                ? item.tech.split(",").map(t => t.trim()).filter(Boolean) 
                : [];

            return (
              <Card key={`${item.name}-${idx}`} className="project-card-target flex flex-col justify-between min-h-[200px] group">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-accent-lux text-[9px] text-[#dfb76c]/70 font-semibold tracking-wider">PROJECT // 0{idx + 1}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-[#dfb76c] transition-colors" />
                  </div>
                  <h3 className="font-serif-lux text-xl text-white font-light group-hover:text-[#dfb76c] transition-colors leading-tight">{item.name}</h3>
                  <p className="text-xs text-neutral-400 font-sans-lux leading-relaxed line-clamp-3 font-light">{item.description}</p>
                </div>

                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04] mt-4">
                    {techList.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest bg-neutral-900/60 px-2 py-0.5 rounded border border-white/[0.02] group-hover:border-[#dfb76c]/10 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </motion.div>
      </Section>
    ) : null}

    {socialStage.enabled && services.length > 0 ? (
      <Section>
        <SectionHeading label="CAPABILITIES" title="Core Services" icon={Layers} />
        <motion.div variants={CARD_STAGGER} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
          {services.map((item, idx) => (
            <Card key={`${item.name}-${idx}`} className="flex flex-col justify-between min-h-[140px] group">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#dfb76c]/15 bg-neutral-900/50 mb-3 group-hover:border-[#dfb76c]/30 transition-colors">
                <Zap className="w-3.5 h-3.5 text-[#dfb76c]" />
              </div>
              <h4 className="font-serif-lux text-base text-white font-medium group-hover:text-[#dfb76c] transition-colors">{item.name}</h4>
            </Card>
          ))}
        </motion.div>
      </Section>
    ) : null}

    {socialStage.enabled && testimonials.length > 0 ? (
      <Section>
        <SectionHeading label="REVIEWS" title="Client Testimonials" icon={Quote} />
        <motion.div variants={CARD_STAGGER} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
          {testimonials.map((item, idx) => (
            <Card key={`${item.name}-${idx}`} className="relative p-6 overflow-hidden">
              <blockquote className="space-y-4">
                <p className="text-sm italic font-light font-serif-lux leading-relaxed text-neutral-300">&ldquo;{item.quote}&rdquo;</p>
                <cite className="not-italic text-xs font-semibold text-white font-accent-lux">{item.name}</cite>
              </blockquote>
            </Card>
          ))}
        </motion.div>
      </Section>
    ) : null}

    {customStages.map((stage) => (
      <Section key={stage.id}>
        <SectionHeading label="LOG" title={stage.title || "Custom Section"} icon={Terminal} />
        {stage.kind === "cards" ? (
          <div className="space-y-4">
            {stage.cards.map((card, idx) => (
              <Card key={`${stage.id}-${idx}`} className="flex flex-col justify-between min-h-[140px] group">
                <h4 className="font-serif-lux text-base text-white font-medium">{card.title}</h4>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-neutral-400 font-sans-lux font-light bg-neutral-950/20 border border-white/[0.03] p-5 rounded-2xl">{stage.paragraph}</p>
        )}
      </Section>
    ))}
  </div>
);

export default ObsidianLeftColumn;
