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

