import { motion } from "framer-motion";
import { Award, Briefcase, Cpu } from "lucide-react";
import { EmptyState, Section, SectionHeading } from "./ui";

const ObsidianRightColumn = ({
  skillsStage,
  topSkills,
  workStage,
  timelineItems,
  hoveredTimelineIdx,
  setHoveredTimelineIdx,
  publishStage,
  certifications,
}) => (
  <div className="md:col-span-4 space-y-6">
    {skillsStage.enabled ? (
      <Section>
        <SectionHeading label="EXPERTISE" title={skillsStage.title} icon={Cpu} />
        {topSkills.length ? (
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, idx) => (
              <motion.span
                key={`${skill}-${idx}`}
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.15 }}
                className="cursor-default rounded-lg border border-[#dfb76c]/15 bg-neutral-950/40 px-3.5 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-[#dfb76c]/45 hover:bg-[#dfb76c]/5 hover:text-white font-sans-lux"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        ) : (
          <EmptyState message="No skills listed yet." />
        )}
      </Section>
    ) : null}

    {workStage.enabled && timelineItems.length > 0 ? (
      <Section>
        <SectionHeading label="TIMELINE" title={workStage.title} icon={Briefcase} />
        <div className="space-y-6 ml-2">
          {timelineItems.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredTimelineIdx(idx)}
              onMouseLeave={() => setHoveredTimelineIdx(null)}
              className="timeline-card-target relative pl-6 border-l border-[#dfb76c]/15 pb-6 group"
            >
              <div className={`absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-neutral-950 border border-[#dfb76c]/40 transition-all duration-300 ${hoveredTimelineIdx === idx ? "bg-[#dfb76c] border-[#dfb76c] scale-125 shadow-[0_0_12px_#dfb76c]" : "group-hover:bg-[#dfb76c] group-hover:border-[#dfb76c] group-hover:shadow-[0_0_8px_#dfb76c]"}`} />
              <span className="text-[9px] text-[#dfb76c] font-bold font-accent-lux uppercase tracking-wider">{item.date}</span>
              <h3 className="font-serif-lux text-sm text-white font-medium leading-snug">{item.title}</h3>
              <p className="text-[10px] font-bold text-neutral-400 font-accent-lux">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </Section>
    ) : null}

    {publishStage.enabled && certifications.length > 0 ? (
      <Section>
        <SectionHeading label="REGISTRY" title={publishStage.title} icon={Award} />
        <div className="space-y-3">
          {certifications.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="p-4 rounded-xl bg-neutral-950/20 border border-[#dfb76c]/15 hover:border-[#dfb76c]/35 transition-all duration-300 flex justify-between items-center group">
              <div className="space-y-1">
                <h4 className="font-serif-lux text-sm text-white font-medium group-hover:text-[#dfb76c] transition-colors">{item.name}</h4>
                <p className="text-[10px] font-accent-lux text-neutral-500 font-semibold">{item.provider}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    ) : null}
  </div>
);

export default ObsidianRightColumn;
