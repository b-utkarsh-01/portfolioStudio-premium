const LinuxPromptInput = ({ palette, inputRef, inputVal, setInputVal, handleKeyDown }) => (
  <div className={`border-t ${palette.borderHeader} bg-black/55 px-4 sm:px-6 py-4 flex items-center gap-2`}>
    <span className={`${palette.textPrompt} font-bold select-none shrink-0`}>visitor@terminal:~$</span>
    <div className="relative flex-grow flex items-center">
      <input
        ref={inputRef}
        type="text"
        autoFocus
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-transparent focus:outline-none pointer-events-none"
        style={{ color: "transparent" }}
      />
      <span className={`${palette.textCommand} select-text pointer-events-auto break-all whitespace-pre-wrap`}>
        {inputVal}
      </span>
      <span className={`inline-block w-2.5 h-4 ${palette.inputCaret} animate-pulse ml-0.5 shrink-0`} />
    </div>
  </div>
);

export default LinuxPromptInput;
