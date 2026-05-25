import ShinyText from "../../ShinyText";
import { usePortfolioData } from "../../features/portfolio/PortfolioDataContext";
import { useLocation } from "react-router-dom";

const BrandLink = () => {
  const { badgeName, profile } = usePortfolioData();
  const { pathname } = useLocation();
  const isTemplatePreview = pathname === "/templates/portfolio-v1";
  const resolvedName = (badgeName?.name || "").trim() || (profile?.name || "").trim() || "Portfolio";
  const brandText = isTemplatePreview ? "Template 1" : resolvedName.toUpperCase();

  return (
    <a
      href="#top"
      className="no-cursor-target cursor-none flex h-10 min-w-20 shrink-0 items-center justify-center rounded-xl border border-zinc-600/80 bg-zinc-800 px-3 text-xl font-bold tracking-wide sm:h-12 sm:min-w-[140px] sm:px-4 sm:text-2xl"
      title={brandText}
    >
      <ShinyText text={brandText} />
    </a>
  );
};

export default BrandLink;
