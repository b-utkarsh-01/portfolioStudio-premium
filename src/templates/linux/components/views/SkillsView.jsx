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

