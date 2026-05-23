import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./aboutAnimations";
import SectionHeader from "./SectionHeader";
import { usePortfolioData } from "../features/portfolio/PortfolioDataContext";

const TestimonialsSection = ({ title = "Testimonials" }) => {
  const { testimonials = [], sectionIcons } = usePortfolioData();
  const safeTestimonials = Array.isArray(testimonials)
    ? testimonials.filter((item) => item?.quote || item?.name || item?.role)
    : [];

  if (!safeTestimonials.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="space-y-5"
    >
      <SectionHeader icon={sectionIcons.certifications} title={title} subtitle="What people say" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {safeTestimonials.map((item, index) => (
          <motion.article
            key={`${item.name || "testimonial"}-${index}`}
            variants={fadeInUp}
            className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5"
          >
            <p className="text-sm leading-relaxed text-slate-200">"{item.quote || "Great to work with."}"</p>
            <p className="mt-4 text-sm font-semibold text-orange-300">{item.name || "Anonymous"}</p>
            {item.role ? <p className="text-xs text-slate-400">{item.role}</p> : null}
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;

