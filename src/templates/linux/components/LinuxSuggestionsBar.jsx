const LinuxSuggestionsBar = ({ suggestions, palette, inputVal, setInputVal, focusInput }) => {
  if (!suggestions.length) return null;

  return (
    <div className={`px-4 sm:px-6 py-2 border-t ${palette.borderHeader} bg-black/45 flex items-center gap-3 text-[10px] text-neutral-500`}>
      <span className="text-white/40 uppercase">Suggestions:</span>
      <div className="flex flex-wrap gap-x-4">
        {suggestions.map((suggestion) => (
          <span
            key={suggestion}
            onClick={(e) => {
              e.stopPropagation();
              const prefix = inputVal.startsWith("/") ? "/" : "";
              setInputVal(`${prefix}${suggestion}`);
              focusInput();
            }}
            className={`cursor-pointer hover:${palette.text} hover:underline font-bold transition-all`}
          >
            {inputVal.startsWith("/") ? "/" : ""}
            {suggestion}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LinuxSuggestionsBar;
