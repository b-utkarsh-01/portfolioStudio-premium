import { useEffect, useMemo, useRef, useState } from "react";
import LinuxTerminalHeader from "./components/LinuxTerminalHeader";
import LinuxConsoleLogs from "./components/LinuxConsoleLogs";
import LinuxSuggestionsBar from "./components/LinuxSuggestionsBar";
import LinuxPromptInput from "./components/LinuxPromptInput";
import LinuxCrtStyles from "./components/LinuxCrtStyles";
import { COMMAND_LIST, THEME_PALETTES, WELCOME_BANNER } from "./linuxConstants";
import { executeLinuxCommand } from "./linuxCommandEngine";
import { getFormattedUptime, getSuggestions, getWelcomeOutputLogs, parseLinuxData } from "./linuxHelpers";

const renderTypedBanner = (lines, activeLineIdx) => (
  <div className="font-mono text-xs opacity-80">
    {lines.map((line, idx) => (
      <div key={`welcome-line-${idx}`} className="min-h-[14px]">
        {line}
        {idx === activeLineIdx ? <span className="inline-block w-[8px] animate-pulse">_</span> : null}
      </div>
    ))}
  </div>
);

const LinuxPortfolio = ({ data }) => {
  if (!data) return null;

  const [inputVal, setInputVal] = useState("");
  const [colorTheme, setColorTheme] = useState("matrix");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [uptime, setUptime] = useState(0);

  const inputRef = useRef(null);
  const logsEndRef = useRef(null);

  const parsedData = useMemo(() => parseLinuxData(data), [data]);
  const { customStages } = parsedData;

  const palette = THEME_PALETTES[colorTheme] || THEME_PALETTES.matrix;
  const formattedUptime = useMemo(() => getFormattedUptime(uptime), [uptime]);

  const suggestions = useMemo(
    () => getSuggestions({ inputVal, commandList: COMMAND_LIST, customStages }),
    [inputVal, customStages]
  );

  useEffect(() => {
    const timer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lines = WELCOME_BANNER.split("\n");
    const typedLines = [""];
    let lineIdx = 0;
    let charIdx = 0;
    let isCancelled = false;
    let timeoutId = null;

    const pushBannerFrame = () => {
      const activeLineIdx = lineIdx >= lines.length ? -1 : lineIdx;
      setConsoleLogs([
        {
          type: "output",
          content: renderTypedBanner([...typedLines], activeLineIdx)
        }
      ]);
    };

    pushBannerFrame();

    const typeNextChar = () => {
      if (isCancelled) return;

      if (lineIdx >= lines.length) {
        pushBannerFrame();
        return;
      }

      const activeLine = lines[lineIdx] ?? "";

      if (charIdx < activeLine.length) {
        typedLines[lineIdx] += activeLine[charIdx];
        charIdx += 1;
        pushBannerFrame();
        timeoutId = setTimeout(typeNextChar, 28);
        return;
      }

      lineIdx += 1;
      charIdx = 0;
      if (lineIdx < lines.length) typedLines.push("");
      pushBannerFrame();
      timeoutId = setTimeout(typeNextChar, 180);
    };

    timeoutId = setTimeout(typeNextChar, 180);
    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  const handleCommand = (rawCommand) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(/\s+/);
    const rawCmdName = parts[0];
    const cmdName = (rawCmdName.startsWith("/") ? rawCmdName.slice(1) : rawCmdName).toLowerCase();
    const args = parts.slice(1).join(" ").trim();

    if (cmdName === "clear" || cmdName === "cls") {
      setConsoleLogs(getWelcomeOutputLogs());
      setInputVal("");
      return;
    }

    const result = executeLinuxCommand({
      cmdName,
      trimmed,
      args,
      palette,
      formattedUptime,
      data: {
        ...parsedData,
        commandList: COMMAND_LIST
      }
    });

    if (result.nextTheme) setColorTheme(result.nextTheme);

    setConsoleLogs((prev) => [
      ...prev,
      {
        type: "command",
        command: trimmed,
        output: result.output
      }
    ]);
    setInputVal("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCommand(inputVal);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(historyIdx - 1, 0);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx === history.length - 1 ? -1 : historyIdx + 1;
      setHistoryIdx(nextIdx);
      setInputVal(nextIdx === -1 ? "" : history[nextIdx]);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (suggestions.length === 1) {
        const prefix = inputVal.startsWith("/") ? "/" : "";
        setInputVal(`${prefix}${suggestions[0]}`);
        return;
      }

      if (suggestions.length > 1) {
        const prefix = inputVal.startsWith("/") ? "/" : "";
        setConsoleLogs((prev) => [
          ...prev,
          { type: "command", command: inputVal, output: null },
          {
            type: "output",
            content: (
              <div className={`flex flex-wrap gap-x-6 ${palette.textMuted} font-mono text-xs`}>
                {suggestions.map((item) => (
                  <span key={item}>{prefix}{item}</span>
                ))}
              </div>
            )
          }
        ]);
      }
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div
      onClick={focusInput}
      className={`w-full min-h-screen ${palette.bg} ${palette.text} antialiased selection:bg-[#33ff33]/20 selection:text-white p-4 sm:p-6 font-mono text-sm leading-relaxed overflow-y-auto cursor-text select-text pb-16 transition-colors duration-500`}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`border ${palette.border} rounded-lg overflow-hidden shadow-2xl ${palette.cardBg} relative crt-screen crt-scanlines`}>
          <LinuxTerminalHeader palette={palette} />
          <LinuxConsoleLogs consoleLogs={consoleLogs} logsEndRef={logsEndRef} palette={palette} />
          <LinuxSuggestionsBar
            suggestions={suggestions}
            palette={palette}
            inputVal={inputVal}
            setInputVal={setInputVal}
            focusInput={focusInput}
          />
          <LinuxPromptInput
            palette={palette}
            inputRef={inputRef}
            inputVal={inputVal}
            setInputVal={setInputVal}
            handleKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-[10px] text-neutral-500 select-none">
          <p>HINT: Use Arrow keys for history, Tab for autocomplete</p>
          <p className="uppercase">SECURE PORTFOLIO SHELL // IP: 127.0.0.1</p>
        </div>
      </div>

      <LinuxCrtStyles />
    </div>
  );
};

export default LinuxPortfolio;
