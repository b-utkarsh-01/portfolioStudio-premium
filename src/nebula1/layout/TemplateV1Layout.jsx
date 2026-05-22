import { CircleArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { defaultTemplates } from "portfolio-studio-default/src";
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
      <div className={`relative min-h-screen overflow-x-hidden ${theme.bgClassName} text-white`}>
        {showGalaxy ? (
          <div className="pointer-events-none fixed inset-0 z-0">
            <Galaxy
              className="h-full w-full"
              trackGlobalMouse
              density={theme.galaxy.density}
              glowIntensity={theme.galaxy.glowIntensity}
              saturation={theme.galaxy.saturation}
              hueShift={theme.galaxy.hueShift}
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
