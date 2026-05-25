import { Github, Globe, Linkedin, Mail, Phone, Twitter } from "lucide-react";

export const getStage = (stages, id, fallbackTitle) => {
  const match = (Array.isArray(stages) ? stages : []).find((stage) => stage?.id === id);
  return {
    enabled: match?.enabled !== false,
    title: match?.title?.trim() || fallbackTitle,
  };
};

export const getContactIcon = (type = "") => {
  const t = type.toLowerCase();
  if (t.includes("email") || t.includes("mail")) return <Mail className="w-4 h-4 text-[#dfb76c]" />;
  if (t.includes("phone") || t.includes("call") || t.includes("mobile")) return <Phone className="w-4 h-4 text-[#dfb76c]" />;
  if (t.includes("linkedin")) return <Linkedin className="w-4 h-4 text-[#dfb76c]" />;
  if (t.includes("github") || t.includes("git")) return <Github className="w-4 h-4 text-[#dfb76c]" />;
  if (t.includes("twitter") || t.includes("x.com")) return <Twitter className="w-4 h-4 text-[#dfb76c]" />;
  return <Globe className="w-4 h-4 text-[#dfb76c]" />;
};

export const getTopSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (typeof skills === "object") return Object.values(skills).flat().filter(Boolean);
  return [];
};
