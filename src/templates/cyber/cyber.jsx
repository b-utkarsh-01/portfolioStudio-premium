import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { PAGE_STAGGER, getStage } from "./components/CyberPrimitives";
import { BiosBootScreen } from "./components/CyberEffects";
import {
  CYBER_GLOBAL_STYLES,
  ContactSection,
  CyberChrome,
  CyberClickParticles,
  CyberCursorOverlay,
  CyberFooter,
  HeroSection,
  BioSection,
  SkillsSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
  CustomStagesSection,
  TimelineSection,
  CredentialsSection,
} from "./components/CyberSections";

const CyberPortfolio = ({ data }) => {
  if (!data) return null;

  const [booting, setBooting] = useState(true);
  const stages = data.layout?.stages || [];

  const profileStage = getStage(stages, "profile", "Profile Node");
  const skillsStage = getStage(stages, "skills", "Powers");
  const workStage = getStage(stages, "work", "Index Trace");
  const socialStage = getStage(stages, "social", "Super Services");
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

  const topSkills = useMemo(() => {
    if (!data.skills) return [];
    if (Array.isArray(data.skills)) return data.skills.filter(Boolean);
    if (typeof data.skills === "object") return Object.values(data.skills).flat().filter(Boolean);
    return [];
  }, [data.skills]);

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

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isClickableHovered, setIsClickableHovered] = useState(false);
  const [bits, setBits] = useState([]);

  const springConfig = { damping: 22, stiffness: 220 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setCoords({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest("a, button, [role='button'], input, textarea, .cursor-pointer, .card-glow-hover");
      setIsClickableHovered(!!isClickable);
    };

    const handleMouseUp = (e) => {
      const now = Date.now();
      const colors = ["#00f0ff", "#ff00ff", "#ffffff"];
      const particleTypes = ["text", "reticle", "ring", "hex"];
      const bitValues = ["01", "10", "SYS", "ERR", "OK", "0x93FF", "DATA"];

      const newParticles = Array.from({ length: 5 }).map((_, idx) => {
        const angle = (Math.PI * 2 * idx) / 5 + (Math.random() - 0.5) * 0.5;
        const speed = 40 + Math.random() * 40;
        return {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
          value: bitValues[Math.floor(Math.random() * bitValues.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          xDir: Math.cos(angle) * speed,
          yDir: Math.sin(angle) * speed - 20,
          rotateVal: (Math.random() - 0.5) * 360,
        };
      });

      setBits((prev) => [...prev, ...newParticles]);
      newParticles.forEach((p) => {
        setTimeout(() => {
          setBits((prev) => prev.filter((b) => b.id !== p.id));
        }, 600);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: "hidden" }}>
        <defs>
          <linearGradient id="laser-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        {booting && (
          <motion.div
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "brightness(3) contrast(2) saturate(0.5)",
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="fixed inset-0 z-[99999]"
          >
            <BiosBootScreen onComplete={() => setBooting(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate={booting ? "hidden" : "show"}
        variants={PAGE_STAGGER}
        className="w-full h-screen overflow-y-auto overflow-x-hidden cyber-scrollbar bg-[#030304] text-[#00f0ff] antialiased selection:bg-[#ff00ff]/30 selection:text-white relative font-mono pb-8 lg:cursor-none"
      >
        <style>{CYBER_GLOBAL_STYLES}</style>

        <CyberCursorOverlay
          booting={booting}
          cursorXSpring={cursorXSpring}
          cursorYSpring={cursorYSpring}
          isClickableHovered={isClickableHovered}
          coords={coords}
        />

        <CyberClickParticles bits={bits} />
        <CyberChrome />

        <div className="relative z-10 mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Row 1: Profile & Connect */}
            <HeroSection
              data={data}
              roleTitles={roleTitles}
              experiences={experiences}
              education={education}
              projects={projects}
              topSkills={topSkills}
            />
            <ContactSection contactLinks={contactLinks} />

            {/* Row 2: Bio & Skills */}
            <BioSection data={data} profileStage={profileStage} />
            <SkillsSection skillsStage={skillsStage} topSkills={topSkills} />

            {/* Row 3: Projects (Full Width 3-Col Bento Grid) */}
            <ProjectsSection projects={projects} />

            {/* Row 4: Experience & Education Timeline (Full Width Split Layout) */}
            <TimelineSection workStage={workStage} experiences={experiences} education={education} />

            {/* Row 5: Services / Capabilities */}
            <ServicesSection socialStage={socialStage} services={services} />

            {/* Row 6: Credentials & Testimonials (Balanced 6-6 Split) */}
            <CredentialsSection publishStage={publishStage} certifications={certifications} />
            <TestimonialsSection socialStage={socialStage} testimonials={testimonials} />

            {/* Row 7: Custom Stages */}
            <CustomStagesSection customStages={customStages} />
          </div>

          <CyberFooter name={data.profile?.name} />
        </div>
      </motion.div>
    </>
  );
};

export default CyberPortfolio;
