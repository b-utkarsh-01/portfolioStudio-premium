import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { PAGE_STAGGER } from "./components/ui";
import { BurstParticles, ComicStyles, CursorFollower, DotBackdrop } from "./components/CartoonEffects";
import {
  CertificationsBlock,
  ContactSidebar,
  CustomStagesBlock,
  HeroBlock,
  PortfolioFooter,
  ProfileBlock,
  ProjectsBlock,
  ServicesBlock,
  SkillsBlock,
  TestimonialsBlock,
  TimelineBlock,
} from "./components/CartoonLayoutSections";
import { getContactIcon, getStage, getTopSkills } from "./utils/cartoonUtils";

const CartoonPortfolio = ({ data }) => {
  if (!data) return null;
  const stages = data.layout?.stages || [];

  const profileStage = getStage(stages, "profile", "Who Am I");
  const skillsStage = getStage(stages, "skills", "My Powers");
  const workStage = getStage(stages, "work", "My Journey");
  const socialStage = getStage(stages, "social", "Super Services");
  const publishStage = getStage(stages, "publish", "Credentials");

  const customStages = useMemo(
    () =>
      (Array.isArray(data.customStages) ? data.customStages : []).filter((item) =>
        item?.kind === "cards" ? Array.isArray(item.cards) && item.cards.length : `${item?.paragraph || ""}`.trim()
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
  const roleTitles = (Array.isArray(data.profile?.title) ? data.profile.title : []).map((item) => `${item || ""}`.trim()).filter(Boolean);

  const timelineItems = useMemo(() => {
    const list = [];
    experiences.forEach((exp) => {
      list.push({ type: "experience", date: exp.period, title: exp.title, subtitle: exp.company, description: exp.description });
    });
    education.forEach((edu) => {
      const first = edu.items?.[0] || {};
      list.push({ type: "education", date: edu.subtitle, title: first.degree || "Degree", subtitle: first.institute || "Institute", description: "" });
    });
    return list;
  }, [experiences, education]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isClickableHovered, setIsClickableHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [bursts, setBursts] = useState([]);
  const springConfig = { damping: 20, stiffness: 240 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest("a, button, [role='button'], input, textarea, .cursor-pointer");
      setIsClickableHovered(!!isClickable);
    };
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = (e) => {
      setIsMouseDown(false);
      const comicWords = ["POP!", "BOOM!", "ZAP!", "BANG!", "WOW!", "WHAM!", "POW!"];
      const colors = ["#fde047", "#ec4899", "#06b6d4", "#22c55e", "#a855f7"];
      const newBurst = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        word: comicWords[Math.floor(Math.random() * comicWords.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: (Math.random() - 0.5) * 36,
      };
      setBursts((prev) => [...prev, newBurst]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== newBurst.id)), 500);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={PAGE_STAGGER}
      className="w-full h-screen overflow-y-auto overflow-x-hidden cartoon-scrollbar bg-[#fffdf0] text-neutral-900 antialiased selection:bg-[#ec4899] selection:text-white relative font-sans-lux pb-8 lg:cursor-none"
    >
      <ComicStyles />
      <CursorFollower cursorXSpring={cursorXSpring} cursorYSpring={cursorYSpring} isMouseDown={isMouseDown} isClickableHovered={isClickableHovered} />
      <BurstParticles bursts={bursts} />
      <DotBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-12 items-start">
          <HeroBlock data={data} roleTitles={roleTitles} experiences={experiences} education={education} projects={projects} topSkills={topSkills} />
          <ContactSidebar contactLinks={contactLinks} getContactIcon={getContactIcon} />

          <div className="md:col-span-8 space-y-6">
            <ProfileBlock profileStage={profileStage} data={data} />
            <ProjectsBlock projects={projects} />
            <ServicesBlock socialStage={socialStage} services={services} />
            <TestimonialsBlock socialStage={socialStage} testimonials={testimonials} />
            <CustomStagesBlock customStages={customStages} />
          </div>

          <div className="md:col-span-4 space-y-6">
            <SkillsBlock skillsStage={skillsStage} topSkills={topSkills} />
            <TimelineBlock workStage={workStage} timelineItems={timelineItems} />
            <CertificationsBlock publishStage={publishStage} certifications={certifications} />
          </div>
        </div>

        <PortfolioFooter name={data.profile?.name} />
      </div>
    </motion.div>
  );
};

export default CartoonPortfolio;
