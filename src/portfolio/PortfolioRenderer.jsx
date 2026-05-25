import { usePortfolioData } from "../templates/nebula1/features/portfolio/PortfolioDataContext";
import CertificationsSection from "../templates/nebula1/about/CertificationsSection";
import CustomStagesSection from "../templates/nebula1/about/CustomStagesSection";
import EducationSection from "../templates/nebula1/about/EducationSection";
import ExperienceSection from "../templates/nebula1/about/ExperienceSection";
import HeroSection from "../templates/nebula1/about/HeroSection";
import ProjectsSection from "../templates/nebula1/about/ProjectsSection";
import ServicesSection from "../templates/nebula1/about/ServicesSection";
import SimpleHeroSection from "../templates/nebula1/about/SimpleHeroSection";
import SkillsSection from "../templates/nebula1/about/SkillsSection";
import TestimonialsSection from "../templates/nebula1/about/TestimonialsSection";
import Obsidian from "../templates/obsidian/obsidian";
import CartoonPortfolio from "../templates/cartoon/cartoon";
import CyberPortfolio from "../templates/cyber/cyber";
import LinuxPortfolio from "../templates/linux/linux";

const getStage = (stages, id, fallbackTitle) => {
  const match = (Array.isArray(stages) ? stages : []).find((stage) => stage?.id === id);
  return {
    enabled: match?.enabled !== false,
    title: match?.title?.trim() || fallbackTitle,
  };
};

const PremiumPortfolioRenderer = ({ appReady, templateId = "default-v1" }) => {
  const data = usePortfolioData();

  if (templateId === "premium-obsidian") {
    return <Obsidian data={data} />;
  }

  if (templateId === "premium-cartoon") {
    return <CartoonPortfolio data={data} />;
  }

  if (templateId === "premium-cyber") {
    return <CyberPortfolio data={data} />;
  }

  if (templateId === "premium-linux") {
    return <LinuxPortfolio data={data} />;
  }

  const stages = data.layout?.stages || [];
  const usePremiumVisualHero = templateId === "premium-v1";
  const profileStage = getStage(stages, "profile", "Profile");
  const workStage = getStage(stages, "work", "Work & Education");
  const skillsStage = getStage(stages, "skills", "Skills");
  const socialStage = getStage(stages, "social", "Services & Reviews");
  const publishStage = getStage(stages, "publish", "Publish");

  return (
    <div id="top" className="mx-auto max-w-6xl space-y-8 pb-32 sm:pb-36">
      {profileStage.enabled ? (
        <section id="hero" className="scroll-mt-24 no-cursor-target">
          {usePremiumVisualHero ? <HeroSection appReady={appReady} /> : <SimpleHeroSection />}
        </section>
      ) : null}
      {workStage.enabled ? (
        <section id="education" className="scroll-mt-24 no-cursor-target">
          <EducationSection title={workStage.title} />
        </section>
      ) : null}
      {skillsStage.enabled ? (
        <section id="skills" className="scroll-mt-24">
          <SkillsSection title={skillsStage.title} />
        </section>
      ) : null}
      {workStage.enabled ? (
        <section id="experience" className="scroll-mt-24 no-cursor-target">
          <ExperienceSection title={workStage.title} />
        </section>
      ) : null}
      {workStage.enabled ? (
        <section id="projects" className="scroll-mt-24">
          <ProjectsSection title={workStage.title} />
        </section>
      ) : null}
      {socialStage.enabled ? (
        <section id="services" className="scroll-mt-24">
          <ServicesSection title={socialStage.title} />
        </section>
      ) : null}
      {socialStage.enabled ? (
        <section id="testimonials" className="scroll-mt-24">
          <TestimonialsSection title={socialStage.title} />
        </section>
      ) : null}
      {publishStage.enabled ? (
        <section id="certifications" className="scroll-mt-24">
          <CertificationsSection title={publishStage.title} />
        </section>
      ) : null}
      <section id="custom-stages" className="scroll-mt-24">
        <CustomStagesSection />
      </section>
    </div>
  );
};

export default PremiumPortfolioRenderer;
