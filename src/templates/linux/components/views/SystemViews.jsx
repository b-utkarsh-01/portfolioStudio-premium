import { ASCII_MONITOR, THEME_PALETTES } from "../../linuxConstants";

export const renderTimeView = ({ palette }) => {
  const now = new Date();
  const fullDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const fullTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className="space-y-1 max-w-3xl font-mono text-xs">
      <p><span className={`${palette.text} font-bold`}>DAY:</span> {fullDate}</p>
      <p><span className={`${palette.text} font-bold`}>TIME:</span> {fullTime}</p>
    </div>
  );
};

export const renderNeofetchView = ({ palette, profile, projects, experiences, education, formattedUptime }) => (
  <div className="flex flex-col md:flex-row gap-6 items-start font-mono text-xs">
    <pre className={`${palette.text} leading-none select-none`}>{ASCII_MONITOR}</pre>
    <div className="space-y-1 text-neutral-300">
      <p><span className={`${palette.badgeText} font-bold`}>ROOT</span>@<span className={`${palette.text} font-bold`}>PORTFOLIOOS</span></p>
      <p className="text-neutral-600">----------------------</p>
      <p><span className={`${palette.text}`}>OS:</span> Linux Terminal Portfolio OS</p>
      <p><span className={`${palette.text}`}>Host:</span> {profile.name || "Developer"}</p>
      <p><span className={`${palette.text}`}>Kernel:</span> ReactTerminal v1.2.0</p>
      <p><span className={`${palette.text}`}>Uptime:</span> {formattedUptime}</p>
      <p><span className={`${palette.text}`}>Shell:</span> PortfolioShell</p>
      <p><span className={`${palette.text}`}>Theme:</span> {palette.name}</p>
      <p><span className={`${palette.text}`}>Projects:</span> {projects.length}</p>
      <p><span className={`${palette.text}`}>Timeline Nodes:</span> {experiences.length + education.length}</p>
    </div>
  </div>
);

export const renderThemeListView = () => (
  <div className="space-y-2">
    <p className="text-white font-bold">AVAILABLE COLOR THEMES:</p>
    <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 font-mono text-neutral-400">
      <div className="contents"><span className="text-[#33ff33] font-bold">matrix</span><span>Classic hacker green (default)</span></div>
      <div className="contents"><span className="text-[#ffb000] font-bold">amber</span><span>Retro CRT amber monitor</span></div>
      <div className="contents"><span className="text-[#ff00ff] font-bold">neon</span><span>Cyberpunk hot magenta</span></div>
      <div className="contents"><span className="text-[#1e1e24] font-bold">light</span><span>Terminal printer light background</span></div>
      <div className="contents"><span className="text-[#00e5ff] font-bold">blue</span><span>Hacker cyan on dark blue</span></div>
      <div className="contents"><span className="text-white font-bold">mono</span><span>Monochromatic white on black</span></div>
    </div>
    <p className="text-neutral-500 mt-2">Usage: color &lt;theme_name&gt; (e.g. 'color amber')</p>
  </div>
);

export const resolveThemeChange = ({ arg, palette }) => {
  if (!arg) {
    return {
      output: renderThemeListView()
    };
  }

  if (THEME_PALETTES[arg]) {
    return {
      output: <p className={`${palette.text} font-bold`}>SYSTEM CONFIG: Theme changed successfully to '{THEME_PALETTES[arg].name}'.</p>,
      nextTheme: arg
    };
  }

  return {
    output: <p className="text-rose-500">bash: color palette '{arg}' not found. Type 'color' to view available palettes.</p>
  };
};

