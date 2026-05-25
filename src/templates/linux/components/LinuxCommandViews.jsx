import { ASCII_MONITOR, THEME_PALETTES } from "../linuxConstants";

export const renderHelpView = ({ palette, commandList, customStages }) => (
  <div className="space-y-2">
    <p className="text-white font-bold">AVAILABLE COMMANDS:</p>
    <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 font-mono text-neutral-400">
      {commandList.map((cmd) => (
        <div key={cmd.name} className="contents">
          <span className={`${palette.text} font-semibold`}>{`/${cmd.name}`}</span>
          <span className="opacity-80">{cmd.desc}</span>
        </div>
      ))}
      {customStages.map((stage) => (
        <div key={stage.id} className="contents">
          <span className="text-[#ff00ff] font-semibold">{`/${stage.id}`}</span>
          <span className="opacity-80">{`Display custom stage: ${stage.title || stage.id}`}</span>
        </div>
      ))}
    </div>
  </div>
);

export const renderProfileView = ({ palette, profile }) => {
  const roles = (Array.isArray(profile.title) ? profile.title : []).filter(Boolean).join(" | ");
  return (
    <div className="space-y-4 max-w-3xl">
      <div className={`border ${palette.border} p-4 rounded bg-black/45`}>
        <p className="text-white font-bold text-lg">{profile.name || "Alex Carter"}</p>
        {roles && <p className={`${palette.badgeText} text-xs font-semibold mt-0.5`}>{roles.toUpperCase()}</p>}
      </div>

      <div className="space-y-2">
        <p className={`${palette.text} font-bold`}>SUMMARY</p>
        <p className="text-neutral-300 leading-relaxed pl-4 font-light">{profile.summary || "No profile summary loaded."}</p>
      </div>

      {(profile.badgeName?.name || profile.badgeName?.badgeTitle) ? (
        <div className={`border ${palette.border} p-3 rounded bg-black/35 text-xs`}>
          <p><span className={`${palette.text} font-bold`}>BADGE:</span> {(profile.badgeName?.name || "Portfolio")} {profile.badgeName?.badgeTitle ? `| ${profile.badgeName.badgeTitle}` : ""}</p>
        </div>
      ) : null}

      {Array.isArray(profile.highlights) && profile.highlights.filter(Boolean).length > 0 ? (
        <div className={`border ${palette.border} p-3 rounded bg-black/35 text-xs`}>
          <p className={`${palette.text} font-bold mb-1`}>HIGHLIGHTS</p>
          <p className="text-neutral-300">{profile.highlights.filter(Boolean).slice(0, 6).map((item) => `#${item}`).join("  ")}</p>
        </div>
      ) : null}

      {profile.avatar && (
        <div className={`flex items-center gap-3 border border-dashed ${palette.border} p-3 rounded text-xs text-neutral-500`}>
          <span className={`${palette.text}`}>IMAGE_LINK //</span>
          <a href={profile.avatar} target="_blank" rel="noreferrer" className="underline hover:text-white">
            {profile.avatar}
          </a>
        </div>
      )}
    </div>
  );
};

export const renderSkillsView = ({ palette, skillsList }) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-white font-bold">TECHNICAL EXPERTISE:</p>
    {Object.keys(skillsList).length > 0 ? (
      <div className="space-y-3">
        {Object.entries(skillsList).map(([group, list]) => (
          <div key={group} className={`border ${palette.border} rounded p-3 bg-black/40`}>
            <span className={`${palette.badgeText} font-bold text-xs uppercase tracking-wider`}>{group}</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {list.length > 0 ? (
                list.map((skill, idx) => (
                  <span key={idx} className={`px-2 py-0.5 border ${palette.border} text-neutral-300 rounded text-xs`}>
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-neutral-500 italic text-xs">Not added yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-neutral-500 italic text-xs">Skills not added yet.</p>
    )}
  </div>
);

export const renderProjectsView = ({ palette, projects }) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-white font-bold">INDEXED PROJECTS:</p>
    {projects.length > 0 ? (
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div key={idx} className={`border ${palette.border} bg-black/35 p-4 rounded relative`}>
            <div className={`flex justify-between items-start border-b ${palette.border} pb-1.5 mb-2`}>
              <span className="text-white font-bold">{proj.name}</span>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className={`${palette.badgeText} hover:underline text-xs font-semibold`}>
                  [LAUNCH -&gt;]
                </a>
              )}
            </div>
            {proj.tech && <p className={`text-[10px] ${palette.text} font-mono mb-2 uppercase`}>STACK // {proj.tech}</p>}
            <p className="text-neutral-400 text-xs leading-relaxed">{proj.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-neutral-500 italic text-xs">No projects listed.</p>
    )}
  </div>
);

export const renderExperienceView = ({ palette, experiences, education }) => {
  const workItems = experiences.map((exp) => ({
    date: exp.period || "Not added yet",
    title: exp.title || "Not added yet",
    subtitle: exp.company || "Not added yet",
    desc: exp.description || ""
  }));

  const eduItems = education.flatMap((edu) => {
    const baseDate = edu.subtitle || "Not added yet";
    const items = Array.isArray(edu.items) && edu.items.length ? edu.items : [{}];
    return items.map((item) => ({
      date: baseDate,
      title: item.degree || "Not added yet",
      subtitle: item.institute || "Not added yet",
      desc: item.description || ""
    }));
  });

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-white font-bold">TIMELINE REGISTRY:</p>
      {workItems.length || eduItems.length ? (
        <div className="space-y-5">
          <div className="space-y-3">
            <p className={`${palette.text} font-bold text-xs uppercase`}>Work Experience</p>
            {workItems.length ? (
              <div className="space-y-4 ml-2">
                {workItems.map((item, idx) => (
                  <div key={`work-${idx}`} className={`relative pl-6 border-l ${palette.border} pb-4 last:pb-0`}>
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${palette.bg} border ${palette.border}`} />
                    <div className="space-y-1">
                      <span className={`${palette.badgeText} font-bold text-[10px] uppercase tracking-wide`}>{item.date}</span>
                      <h3 className="text-white font-bold text-sm leading-snug">{item.title}</h3>
                      <p className="text-neutral-500 text-xs font-semibold">{item.subtitle}</p>
                      {item.desc && <p className="text-neutral-400 text-xs leading-relaxed pt-1.5">{item.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 italic text-xs pl-2">Work experience not added yet.</p>
            )}
          </div>

          <div className="space-y-3">
            <p className={`${palette.text} font-bold text-xs uppercase`}>Education</p>
            {eduItems.length ? (
              <div className="space-y-4 ml-2">
                {eduItems.map((item, idx) => (
                  <div key={`edu-${idx}`} className={`relative pl-6 border-l ${palette.border} pb-4 last:pb-0`}>
                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${palette.bg} border ${palette.border}`} />
                    <div className="space-y-1">
                      <span className={`${palette.badgeText} font-bold text-[10px] uppercase tracking-wide`}>{item.date}</span>
                      <h3 className="text-white font-bold text-sm leading-snug">{item.title}</h3>
                      <p className="text-neutral-500 text-xs font-semibold">{item.subtitle}</p>
                      {item.desc && <p className="text-neutral-400 text-xs leading-relaxed pt-1.5">{item.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 italic text-xs pl-2">Education details not added yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-neutral-500 italic text-xs">No records registered.</p>
      )}
    </div>
  );
};

export const renderContactView = ({ palette, profile }) => (
  <div className="space-y-2 max-w-3xl">
    <p className="text-white font-bold">OPEN PORTS / CONTACT:</p>
    {profile.contacts && profile.contacts.length > 0 ? (
      <div className="space-y-2">
        {profile.contacts.map((contact, idx) => (
          <div key={idx} className="flex gap-4 text-xs font-mono">
            <span className="text-neutral-500 w-24 uppercase">{contact.type}:</span>
            <a href={contact.href} target={contact.external ? "_blank" : undefined} rel="noreferrer" className={`${palette.text} hover:underline font-bold`}>
              {contact.text}
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-neutral-500 italic text-xs">No active links found.</p>
    )}
  </div>
);

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

export const renderCustomStageView = ({ matchedCustom, palette }) => (
  <div className="space-y-4 max-w-3xl">
    <p className="text-white font-bold">{matchedCustom.title?.toUpperCase() || matchedCustom.id.toUpperCase()}:</p>
    {matchedCustom.kind === "cards" ? (
      <div className="space-y-3">
        {matchedCustom.cards.map((card, idx) => (
          <div key={idx} className={`border ${palette.border} bg-black/35 p-3 rounded`}>
            <div className="flex justify-between items-start mb-1">
              <span className="text-white font-bold">{card.title}</span>
              {card.link && (
                <a href={card.link} target="_blank" rel="noreferrer" className={`text-xs ${palette.badgeText} hover:underline`}>
                  [Link -&gt;]
                </a>
              )}
            </div>
            {card.subtitle && <p className="text-[10px] text-neutral-500 font-semibold">{card.subtitle}</p>}
            {card.description && <p className="text-xs text-neutral-400 mt-1">{card.description}</p>}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-neutral-300 leading-relaxed text-xs pl-2 font-light">{matchedCustom.paragraph}</p>
    )}
  </div>
);
