const LinuxTerminalHeader = ({ palette }) => (
  <div className={`bg-neutral-900/90 border-b ${palette.borderHeader} px-4 py-2.5 flex items-center justify-between select-none`}>
    <div className="flex gap-2">
      <span className="w-3 h-3 rounded-full bg-rose-500/70" />
      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
      <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
    </div>
    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold font-mono">
      visitor@portfolio-terminal: ~
    </span>
    <div className="w-12" />
  </div>
);

export default LinuxTerminalHeader;
