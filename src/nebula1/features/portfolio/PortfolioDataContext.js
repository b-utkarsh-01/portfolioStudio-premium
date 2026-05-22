import { createContext, useContext, useMemo } from "react";

const defaultPortfolioData = {
  profile: {
    name: "Your Name",
    title: ["Full Stack Developer"],
    summary: "Add a quick overview of your background, passions, and the problems you solve.",
    highlights: ["Node.js", "Express.js", "MongoDB"],
    contacts: [],
  },
  badgeName: {
    name: "Your Name",
    logo: "YN",
    badgeTitle: "Portfolio Studio User",
  },
  skills: {},
  education: [],
  experiences: [],
  projects: [],
  services: [],
  testimonials: [],
  certifications: [],
  customStages: [],
  layout: {
    stages: [],
  },
  sectionIcons: {},
  experienceIcons: {},
  projectIcons: {},
  contactIcons: {},
  skillGroupIcons: {},
  skillIcons: {},
};

const PortfolioDataContext = createContext(defaultPortfolioData);

export const PortfolioDataProvider = ({ value, children }) => {
  const data = useMemo(() => ({ ...defaultPortfolioData, ...(value || {}) }), [value]);
  return <PortfolioDataContext.Provider value={data}>{children}</PortfolioDataContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolioData = () => useContext(PortfolioDataContext);
