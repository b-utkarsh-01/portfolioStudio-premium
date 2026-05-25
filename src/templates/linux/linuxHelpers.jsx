import { WELCOME_BANNER } from "./linuxConstants";

const slugifyCommand = (value) =>
  `${value || ""}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const parseLinuxData = (data) => {
  const stages = Array.isArray(data?.layout?.stages) ? data.layout.stages : [];
  const layoutTitleById = new Map(
    stages.map((stage) => [`${stage?.id || ""}`, `${stage?.title || ""}`.trim()])
  );

  const profile = {
    ...(data?.profile || {}),
    badgeName: data?.badgeName || {},
  };
  const experiences = (data?.experiences || []).slice(0, 6);
  const education = (data?.education || []).slice(0, 6);
  const projects = (data?.projects || []).slice(0, 8);

  const usedCommands = new Set();
  const makeUniqueCommand = (seed, fallback) => {
    let base = slugifyCommand(seed) || slugifyCommand(fallback) || "custom-stage";
    let candidate = base;
    let idx = 2;
    while (usedCommands.has(candidate)) {
      candidate = `${base}-${idx}`;
      idx += 1;
    }
    usedCommands.add(candidate);
    return candidate;
  };

  const customStages = (Array.isArray(data?.customStages) ? data.customStages : [])
    .filter((item) =>
      item?.kind === "cards"
        ? Array.isArray(item.cards) && item.cards.length
        : `${item?.paragraph || ""}`.trim()
    )
    .map((item) => {
      const id = `${item?.id || ""}`.trim();
      const title = `${layoutTitleById.get(id) || item?.title || ""}`.trim();
      return {
        ...item,
        id,
        title,
        commandName: makeUniqueCommand(title, id),
      };
    });

  const normalizeSkills = (rawSkills) => {
    if (!rawSkills) return {};

    const pushSkill = (bucket, value) => {
      const next = `${value ?? ""}`.trim();
      if (!next) return;
      if (!bucket.some((item) => item.toLowerCase() === next.toLowerCase())) {
        bucket.push(next);
      }
    };

    if (Array.isArray(rawSkills)) {
      const list = [];
      rawSkills.forEach((item) => pushSkill(list, item));
      return list.length ? { "Core Skills": list } : {};
    }

    if (typeof rawSkills !== "object") return {};

    const merged = {};
    Object.entries(rawSkills).forEach(([groupName, groupSkills]) => {
      const cleanGroup = `${groupName ?? ""}`.trim();
      if (!cleanGroup) return;

      const normalizedKey = cleanGroup.toLowerCase();
      if (!merged[normalizedKey]) {
        merged[normalizedKey] = { label: cleanGroup, list: [] };
      }

      const target = merged[normalizedKey].list;
      if (Array.isArray(groupSkills)) {
        groupSkills.forEach((item) => pushSkill(target, item));
      } else {
        pushSkill(target, groupSkills);
      }
    });

    return Object.values(merged).reduce((acc, item) => {
      if (item.list.length) acc[item.label] = item.list;
      return acc;
    }, {});
  };

  const skillsList = normalizeSkills(data?.skills);

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
  const customMatch = customStages
    .map((stage) => stage.commandName || stage.id)
    .filter((name) => name.startsWith(query) && name !== query);
  return [...basicMatch, ...customMatch].slice(0, 5);
};

export const getWelcomeOutputLogs = () =>
  WELCOME_BANNER.split("\n").map((line) => ({
    type: "output",
    content: <div className="font-mono text-xs opacity-80 min-h-[14px]">{line}</div>
  }));
