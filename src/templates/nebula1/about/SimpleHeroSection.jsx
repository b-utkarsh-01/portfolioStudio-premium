import { usePortfolioData } from "../features/portfolio/PortfolioDataContext";

const SimpleHeroSection = () => {
  const { profile, badgeName } = usePortfolioData();

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/50 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Portfolio</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-100 sm:text-4xl">{profile?.name || "Your Name"}</h1>
      <p className="mt-3 text-lg text-slate-300">{(profile?.title || []).join(" · ")}</p>
      <p className="mt-4 max-w-3xl text-slate-300">{profile?.summary || "Add your profile summary from dashboard."}</p>
      <div className="mt-5 inline-flex rounded-lg border border-slate-600 px-3 py-1 text-sm text-slate-200">
        {badgeName?.badgeTitle || "Portfolio Owner"}
      </div>
    </section>
  );
};

export default SimpleHeroSection;

