import { CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultTemplates } from "portfolio-studio-default";
import Galaxy from "../Galaxy";
import TargetCursor from "../TargetCursor";
import { PortfolioDataProvider } from "../features/portfolio/PortfolioDataContext";
import { premiumV1Template } from "../premium-v1.template";
import Navbar from "./Navbar";

const templateThemeMap = Object.fromEntries(defaultTemplates.map((template) => [template.id, template.theme]));
templateThemeMap[premiumV1Template.id] = premiumV1Template.theme;

const TemplateV1Layout = ({
  children,
  showPreviewLabel = false,
  portfolioData,
  templateId = "default-v1",
}) => {
  const theme = templateThemeMap[templateId] || templateThemeMap["default-v1"];
  const showGalaxy = theme.effects === "galaxy";
  const template =
    defaultTemplates.find((item) => item.id === templateId) ||
    (templateId === premiumV1Template.id ? premiumV1Template : null);

  return (
    <PortfolioDataProvider value={portfolioData}>
      <div className={`relative h-screen overflow-y-auto overflow-x-hidden nebula-scrollbar ${theme.bgClassName} ${theme.textClassName || "text-white"}`}>
        <style>{`
          .nebula-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(244, 114, 182, 0.95) rgba(10, 8, 26, 0.96);
            scrollbar-gutter: stable;
          }
          .nebula-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
          .nebula-scrollbar::-webkit-scrollbar-track {
            background: rgba(10, 8, 26, 0.96);
            border-left: 1px solid rgba(192, 132, 252, 0.35);
          }
          .nebula-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(244, 114, 182, 0.98), rgba(168, 85, 247, 0.98));
            border-radius: 999px;
            border: 2px solid rgba(10, 8, 26, 0.96);
          }
          .nebula-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, rgba(251, 146, 200, 1), rgba(196, 181, 253, 1));
          }
        `}</style>

        {showGalaxy ? (
          <div className="pointer-events-none fixed inset-0 z-0">
            <Galaxy
              className="h-full w-full"
              trackGlobalMouse
              density={theme.galaxy.density}
              glowIntensity={theme.galaxy.glowIntensity}
              saturation={theme.galaxy.saturation}
              hueShift={theme.galaxy.hueShift}
              twinkleIntensity={0.18}
              rotationSpeed={0.05}
              transparent={false}
            />
          </div>
        ) : null}

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          {showPreviewLabel ? (
            <div className="mb-4 flex items-center gap-2 sm:gap-3">
              <Link
                to="/templates"
                className={`cursor-target cursor-none inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${theme.cardClassName}`}
              >
                <CircleArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <p className="w-[80%] text-center text-sm text-slate-300">
                {theme.title} · {template?.name || "Template"}
              </p>
            </div>
          ) : null}
          {children}
        </div>

        {showGalaxy ? <TargetCursor /> : null}
        <Navbar />
      </div>
    </PortfolioDataProvider>
  );
};

export default TemplateV1Layout;
