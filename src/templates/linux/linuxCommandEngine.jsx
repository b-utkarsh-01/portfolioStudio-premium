import {
  renderHelpView,
  renderProfileView,
  renderSkillsView,
  renderProjectsView,
  renderExperienceView,
  renderContactView,
  renderTimeView,
  renderNeofetchView,
  resolveThemeChange,
  renderCustomStageView
} from "./components/LinuxCommandViews";

export const executeLinuxCommand = ({
  cmdName,
  trimmed,
  args,
  palette,
  data,
  formattedUptime
}) => {
  const { profile, experiences, education, projects, customStages, skillsList, commandList } = data;

  switch (cmdName) {
    case "help":
    case "?":
      return {
        output: renderHelpView({ palette, commandList, customStages })
      };

    case "profile":
    case "about":
      return {
        output: renderProfileView({ palette, profile })
      };

    case "skills":
      return {
        output: renderSkillsView({ palette, skillsList })
      };

    case "projects":
      return {
        output: renderProjectsView({ palette, projects })
      };

    case "experience":
    case "work":
      return {
        output: renderExperienceView({ palette, experiences, education })
      };

    case "contact":
      return {
        output: renderContactView({ palette, profile })
      };

    case "time":
    case "date":
      return {
        output: renderTimeView({ palette })
      };

    case "neofetch":
    case "sys":
      return {
        output: renderNeofetchView({ palette, profile, projects, experiences, education, formattedUptime })
      };

    case "color":
    case "theme": {
      const arg = args.toLowerCase();
      return resolveThemeChange({ arg, palette });
    }

    default: {
      const matchedCustom = customStages.find(
        (stage) => stage.id === cmdName || stage.commandName === cmdName
      );
      if (!matchedCustom) {
        return {
          output: <p className="text-rose-500">bash: command not found: '{trimmed}'. Type 'help' to view catalog.</p>
        };
      }

      return {
        output: renderCustomStageView({ matchedCustom, palette })
      };
    }
  }
};
