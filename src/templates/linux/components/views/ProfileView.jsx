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

