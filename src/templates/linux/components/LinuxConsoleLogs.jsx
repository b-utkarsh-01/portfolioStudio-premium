import { motion } from "framer-motion";

const LinuxConsoleLogs = ({ consoleLogs, logsEndRef, palette }) => (
  <div className="p-4 sm:p-6 space-y-4 flex-1 min-h-0 overflow-y-auto terminal-scrollbar">
    {consoleLogs.map((log, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 8, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="space-y-2"
      >
        {log.type === "command" ? (
          <p className={palette.textCommand}>
            <span className={`${palette.textPrompt} mr-2`}>visitor@terminal:~$</span>
            {log.command}
          </p>
        ) : (
          <div>{log.content}</div>
        )}
        {log.output && <div className={`pl-4 ${palette.textMuted}`}>{log.output}</div>}
      </motion.div>
    ))}

    <div ref={logsEndRef} />
  </div>
);

export default LinuxConsoleLogs;
