import { useMemo } from "react";
import { motion } from "framer-motion";

import { PAGE_STAGGER } from "./components/ui";
import { ObsidianBackground, ObsidianCursor, ObsidianGlobalStyles } from "./components/ObsidianDecor";
import ObsidianFooter from "./components/ObsidianFooter";
import ObsidianLeftColumn from "./components/ObsidianLeftColumn";
import ObsidianRightColumn from "./components/ObsidianRightColumn";
import ObsidianTopRow from "./components/ObsidianTopRow";
import { useObsidianEffects } from "./hooks/useObsidianEffects";
import { getStage, getTopSkills } from "./utils/obsidianUtils";

const Obsidian = ({ data }) => {
  if (!data) return null;

  const stages = data.layout?.stages || [];
  const profileStage = getStage(stages, "profile", "Profile");
  const skillsStage = getStage(stages, "skills", "Expertise");
  const workStage = getStage(stages, "work", "Work Experience");
  const socialStage = getStage(stages, "social", "Services & Reviews");
  const publishStage = getStage(stages, "publish", "Credentials");

  const customStages = useMemo(
    () =>
      (Array.isArray(data.customStages) ? data.customStages : []).filter((item) =>
        item?.kind === "cards"
          ? Array.isArray(item.cards) && item.cards.length
          : `${item?.paragraph || ""}`.trim()
      ),
    [data.customStages]
  );

  const topSkills = useMemo(() => getTopSkills(data.skills), [data.skills]);
  const contactLinks = (data.profile?.contacts || []).slice(0, 4);
  const projects = (data.projects || []).slice(0, 6);
  const experiences = (data.experiences || []).slice(0, 6);
  const education = (data.education || []).slice(0, 6);
  const services = (data.services || []).slice(0, 6);
  const certifications = (data.certifications || []).slice(0, 8);
  const testimonials = (data.testimonials || []).slice(0, 4);

  const roleTitles = (Array.isArray(data.profile?.title) ? data.profile.title : [])
    .map((item) => `${item || ""}`.trim())
    .filter(Boolean);

  const nameParts = useMemo(() => {
    const rawName = data.profile?.name || "Alicia Reed";
    const parts = rawName.trim().split(/\s+/);
    if (parts.length === 1) return { first: parts[0], last: "" };
    return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
  }, [data.profile?.name]);

  const timelineItems = useMemo(() => {
    const list = [];
    experiences.forEach((exp) => {
      list.push({
        type: "experience",
        date: exp.period,
        title: exp.title,
        subtitle: exp.company,
        description: exp.description,
      });
    });
    education.forEach((edu) => {
      const first = edu.items?.[0] || {};
      list.push({
        type: "education",
        date: edu.subtitle,
        title: first.degree || "Degree",
        subtitle: first.institute || "Institute",
        description: "",
      });
    });
    return list;
  }, [experiences, education]);

  const {
    bgOffset,
    cursorLabel,
    isClickableHovered,
    sparks,
    hoveredTimelineIdx,
    setHoveredTimelineIdx,
    dotXSpring,
    dotYSpring,
    ringXSpring,
    ringYSpring,
  } = useObsidianEffects();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={PAGE_STAGGER}
      className="w-full min-h-screen bg-[#040407] text-neutral-300 antialiased selection:bg-[#dfb76c]/30 selection:text-white relative overflow-hidden font-sans-lux pb-8 lg:cursor-none"
    >
      <ObsidianGlobalStyles />
      <ObsidianCursor
        dotXSpring={dotXSpring}
        dotYSpring={dotYSpring}
        ringXSpring={ringXSpring}
        ringYSpring={ringYSpring}
        isClickableHovered={isClickableHovered}
        cursorLabel={cursorLabel}
        sparks={sparks}
      />
      <ObsidianBackground bgOffset={bgOffset} />

      <div className="relative z-10 mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <ObsidianTopRow
            data={data}
            nameParts={nameParts}
            roleTitles={roleTitles}
            experiences={experiences}
            education={education}
            topSkills={topSkills}
            contactLinks={contactLinks}
          />

          <ObsidianLeftColumn
            data={data}
            profileStage={profileStage}
            projects={projects}
            socialStage={socialStage}
            services={services}
            testimonials={testimonials}
            customStages={customStages}
          />

          <ObsidianRightColumn
            skillsStage={skillsStage}
            topSkills={topSkills}
            workStage={workStage}
            timelineItems={timelineItems}
            hoveredTimelineIdx={hoveredTimelineIdx}
            setHoveredTimelineIdx={setHoveredTimelineIdx}
            publishStage={publishStage}
            certifications={certifications}
          />
        </div>

        <ObsidianFooter name={data.profile?.name} />
      </div>
    </motion.div>
  );
};

export default Obsidian;
