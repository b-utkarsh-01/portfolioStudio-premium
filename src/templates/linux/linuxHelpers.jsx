import { WELCOME_BANNER } from "./linuxConstants";

export const parseLinuxData = (data) => {
  const profile = {
    ...(data?.profile || {}),
    badgeName: data?.badgeName || {},
  };
  const experiences = (data?.experiences || []).slice(0, 6);
  const education = (data?.education || []).slice(0, 6);
  const projects = (data?.projects || []).slice(0, 8);

  const customStages = (Array.isArray(data?.customStages) ? data.customStages : []).filter((item) =>
    item?.kind === "cards"
      ? Array.isArray(item.cards) && item.cards.length
      : `${item?.paragraph || ""}`.trim()
  );

  let skillsList = {};
  if (data?.skills) {
    if (typeof data.skills === "object" && !Array.isArray(data.skills)) {
      skillsList = data.skills;
    } else {
      skillsList = { "Core Skills": Array.isArray(data.skills) ? data.skills.filter(Boolean) : [] };
    }
  }

  return { profile, experiences, education, projects, customStages, skillsList };
};

export const getFormattedUptime = (uptime) => {
  const hrs = Math.floor(uptime / 3600).toString().padStart(2, "0");
  const mins = Math.floor((uptime % 3600) / 60).toString().padStart(2, "0");
  const secs = (uptime % 60).toString().padStart(2, "0");
  return `${hrs}h ${mins}m ${secs}s`;
};

export const getSuggestions = ({ inputVal, commandList, customStages }) => {
  if (!inputVal.trim()) return [];
  const parts = inputVal.trim().split(/\s+/);
  if (parts.length > 1) return [];

  const rawVal = parts[0];
  const query = (rawVal.startsWith("/") ? rawVal.slice(1) : rawVal).toLowerCase();
  if (!query) return [];

  const basicMatch = commandList.map((item) => item.name).filter((name) => name.startsWith(query) && name !== query);
  const customMatch = customStages.map((stage) => stage.id).filter((id) => id.startsWith(query) && id !== query);
  return [...basicMatch, ...customMatch].slice(0, 5);
};

export const getWelcomeOutputLogs = () =>
  WELCOME_BANNER.split("\n").map((line) => ({
    type: "output",
    content: <div className="font-mono text-xs opacity-80 min-h-[14px]">{line}</div>
  }));
