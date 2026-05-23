import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./aboutAnimations";
import SectionHeader from "./SectionHeader";
import { sectionIcons } from "./aboutData";
import { usePortfolioData } from "../features/portfolio/PortfolioDataContext";

const CustomStagesSection = () => {
  const { layout, customStages } = usePortfolioData();
  const orderedCustomStages = (Array.isArray(layout?.stages) ? layout.stages : [])
    .filter((stage) => stage?.enabled !== false && `${stage?.id || ""}`.startsWith("custom-"))
    .map((layoutStage) => ({
      layoutStage,
      content: (Array.isArray(customStages) ? customStages : []).find((item) => item.id === layoutStage.id),
    }))
    .filter(({ layoutStage, content }) => {
      if (!layoutStage) return false;
      if (!content) return false;
      if (content.kind === "cards") return Array.isArray(content.cards) && content.cards.length > 0;
      return Boolean(`${content.paragraph || ""}`.trim());
    });

  if (!orderedCustomStages.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="space-y-5"
    >
      {orderedCustomStages.map(({ layoutStage, content }) => (
        <motion.div key={layoutStage.id} variants={fadeInUp} className="space-y-4">
          <SectionHeader
            icon={sectionIcons.projects}
            title={layoutStage.title || "Custom Stage"}
            subtitle={content.kind === "cards" ? "Card view" : "Paragraph view"}
          />
          {content.kind === "cards" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {content.cards.map((card, index) => (
                <article key={`${layoutStage.id}-card-${index}`} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
                  <h3 className="text-slate-100 text-lg font-semibold">{card.title || "Card"}</h3>
                  {card.subtitle ? <p className="mt-1 text-sm text-orange-300">{card.subtitle}</p> : null}
                  {card.description ? <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.description}</p> : null}
                  {card.link ? (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      Open link
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{content.paragraph}</p>
            </div>
          )}
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CustomStagesSection;

