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

