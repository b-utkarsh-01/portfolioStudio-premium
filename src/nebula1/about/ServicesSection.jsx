import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./aboutAnimations";
import SectionHeader from "./SectionHeader";
import { usePortfolioData } from "../features/portfolio/PortfolioDataContext";

const ServicesSection = ({ title = "Services" }) => {
  const { services = [], sectionIcons } = usePortfolioData();
  const safeServices = Array.isArray(services)
    ? services.filter((service) => service?.name || service?.description)
    : [];

  if (!safeServices.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="space-y-5"
    >
      <SectionHeader icon={sectionIcons.projects} title={title} subtitle="What I can help you with" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {safeServices.map((service, index) => (
          <motion.article
            key={`${service.name || "service"}-${index}`}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"
          >
            <h3 className="text-slate-100 text-lg font-semibold">{service.name || "Service"}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {service.description || "Service details coming soon."}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default ServicesSection;

