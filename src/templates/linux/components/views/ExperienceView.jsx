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

