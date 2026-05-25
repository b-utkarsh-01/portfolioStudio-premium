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
          <span className="text-[#ff00ff] font-semibold">{`/${stage.commandName || stage.id}`}</span>
          <span className="opacity-80">{`Display ${stage.title || stage.commandName || stage.id}`}</span>
        </div>
      ))}
    </div>
  </div>
);

