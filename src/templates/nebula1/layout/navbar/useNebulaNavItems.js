import { useMemo } from "react";
import { usePortfolioData } from "../../features/portfolio/PortfolioDataContext";

const hasNonEmptyText = (value) => `${value || ""}`.trim().length > 0;

const hasSkills = (skills) => {
  if (!skills) return false;
  if (Array.isArray(skills)) return skills.some((item) => hasNonEmptyText(item));
  if (typeof skills === "object") {
    return Object.values(skills).some((list) =>
      Array.isArray(list) ? list.some((item) => hasNonEmptyText(item)) : false
    );
  }
  return false;
};

const hasEducation = (education) =>
  (Array.isArray(education) ? education : []).some((group) => {
    const subtitleFilled = hasNonEmptyText(group?.subtitle);
    const hasItems = (Array.isArray(group?.items) ? group.items : []).some(
      (item) => hasNonEmptyText(item?.degree) || hasNonEmptyText(item?.institute)
    );
    return subtitleFilled || hasItems;
  });

const hasExperience = (experiences) =>
  (Array.isArray(experiences) ? experiences : []).some(
    (item) =>
      hasNonEmptyText(item?.title) ||
      hasNonEmptyText(item?.company) ||
      hasNonEmptyText(item?.period) ||
      hasNonEmptyText(item?.description)
  );

const hasProjects = (projects) =>
  (Array.isArray(projects) ? projects : []).some(
    (item) =>
      hasNonEmptyText(item?.name) ||
      hasNonEmptyText(item?.description) ||
      hasNonEmptyText(item?.tech) ||
      hasNonEmptyText(item?.link)
  );

const hasSimpleCards = (list, keys) =>
  (Array.isArray(list) ? list : []).some((item) => keys.some((key) => hasNonEmptyText(item?.[key])));

const getStageMap = (layoutStages) =>
  (Array.isArray(layoutStages) ? layoutStages : []).reduce((acc, stage) => {
    const key = `${stage?.id || ""}`.trim();
    if (!key) return acc;
    acc[key] = {
      enabled: stage?.enabled !== false,
      title: hasNonEmptyText(stage?.title) ? stage.title.trim() : "",
    };
    return acc;
  }, {});

export const useNebulaNavItems = () => {
  const data = usePortfolioData();

  return useMemo(() => {
    const stageMap = getStageMap(data?.layout?.stages);
    const isEnabled = (id) => stageMap[id]?.enabled !== false;
    const stageTitle = (id, fallback) => stageMap[id]?.title || fallback;

    const items = [];

    if (isEnabled("profile")) {
      items.push({ label: "Home", href: "#hero" });
    }

    if (isEnabled("work") && hasEducation(data?.education)) {
      items.push({ label: stageTitle("work", "Education"), href: "#education" });
    }

    if (isEnabled("skills") && hasSkills(data?.skills)) {
      items.push({ label: stageTitle("skills", "Skills"), href: "#skills" });
    }

    if (isEnabled("work") && hasExperience(data?.experiences)) {
      items.push({ label: "Experience", href: "#experience" });
    }

    if (isEnabled("work") && hasProjects(data?.projects)) {
      items.push({ label: "Projects", href: "#projects" });
    }

    if (isEnabled("social") && hasSimpleCards(data?.services, ["name", "description"])) {
      items.push({ label: "Services", href: "#services" });
    }

    if (isEnabled("social") && hasSimpleCards(data?.testimonials, ["name", "role", "quote"])) {
      items.push({ label: "Testimonials", href: "#testimonials" });
    }

    if (isEnabled("publish") && hasSimpleCards(data?.certifications, ["name", "provider", "link"])) {
      items.push({ label: stageTitle("publish", "Certifications"), href: "#certifications" });
    }

    const customStages = (Array.isArray(data?.layout?.stages) ? data.layout.stages : [])
      .filter((stage) => `${stage?.id || ""}`.startsWith("custom-") && stage?.enabled !== false)
      .filter((stage) => {
        const content = (Array.isArray(data?.customStages) ? data.customStages : []).find(
          (item) => item?.id === stage.id
        );
        if (!content) return false;
        if (content.kind === "cards") {
          return (Array.isArray(content.cards) ? content.cards : []).some(
            (card) =>
              hasNonEmptyText(card?.title) ||
              hasNonEmptyText(card?.subtitle) ||
              hasNonEmptyText(card?.description) ||
              hasNonEmptyText(card?.link) ||
              hasNonEmptyText(card?.image)
          );
        }
        return hasNonEmptyText(content?.paragraph);
      })
      .map((stage) => ({
        label: hasNonEmptyText(stage?.title) ? stage.title.trim() : "Custom",
        href: `#${stage.id}`,
      }));

    return [...items, ...customStages];
  }, [data]);
};

