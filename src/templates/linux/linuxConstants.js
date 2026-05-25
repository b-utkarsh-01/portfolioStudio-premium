export const ASCII_MONITOR = `
    _________________      
   /  _______________ \\    
  / /  _           _  \\ \\  
 / /  | |   _     | |  \\ \\ 
| |   | |  | |    | |   | |
| |   |_|  |_|    |_|   | |
 \\ \\___________________/ / 
  \\_____________________/  
         /_________\\       
        /___________\\      
`;

export const WELCOME_BANNER = `Welcome to Linux Terminal Portfolio OS (v1.2.0-LTS)

System information:
  System load:  0.08               Processes:           85
  Usage of /:   34.2% of 250GB     Users logged in:     1
  Memory usage: 22%                IPv4 address:        127.0.0.1

Type 'help' or '/help' to see the list of available commands.`;

export const COMMAND_LIST = [
  { name: "help", desc: "Show this help screen listing all commands" },
  { name: "profile", desc: "Display bio, name, roles, summary, and avatar link" },
  { name: "skills", desc: "Print list of technical skills inside structured tables" },
  { name: "projects", desc: "Display list of projects with tech stacks and links" },
  { name: "experience", desc: "Render experiences and education in a vertical ASCII timeline" },
  { name: "contact", desc: "Print available social links, email, and phone contact points" },
  { name: "time", desc: "Show current weekday, date, and local time" },
  { name: "neofetch", desc: "Show system parameters alongside a retro ASCII computer logo" },
  { name: "color", desc: "Switch terminal color palette (Usage: color amber)" },
  { name: "clear or cls", desc: "Wipe clean the active terminal console screen history" }
];

export const THEME_PALETTES = {
  matrix: {
    name: "Matrix Green",
    bg: "bg-[#070709]",
    text: "text-[#33ff33]",
    border: "border-[#33ff33]/25",
    borderHeader: "border-[#33ff33]/20",
    textMuted: "text-[#33ff33]/60",
    textCommand: "text-white",
    textPrompt: "text-[#ff00ff]",
    inputCaret: "bg-[#33ff33]",
    cardBg: "bg-[#0c0c0e]/95",
    badgeText: "text-[#ff00ff]",
    statsName: "text-[#33ff33]",
    textGlow: "shadow-[0_0_10px_rgba(51,255,51,0.2)]",
    inputColor: "#33ff33"
  },
  amber: {
    name: "Retro Amber",
    bg: "bg-[#0d0700]",
    text: "text-[#ffb000]",
    border: "border-[#ffb000]/30",
    borderHeader: "border-[#ffb000]/20",
    textMuted: "text-[#ffb000]/60",
    textCommand: "text-[#ffe599]",
    textPrompt: "text-[#00ffcc]",
    inputCaret: "bg-[#ffb000]",
    cardBg: "bg-[#180e00]/95",
    badgeText: "text-[#00ffcc]",
    statsName: "text-[#ffb000]",
    textGlow: "shadow-[0_0_10px_rgba(255,176,0,0.25)]",
    inputColor: "#ffb000"
  },
  neon: {
    name: "Cyber Neon",
    bg: "bg-[#120015]",
    text: "text-[#ff00ff]",
    border: "border-[#ff00ff]/30",
    borderHeader: "border-[#ff00ff]/20",
    textMuted: "text-[#ff00ff]/65",
    textCommand: "text-[#00f0ff]",
    textPrompt: "text-[#00f0ff]",
    inputCaret: "bg-[#ff00ff]",
    cardBg: "bg-[#1a001e]/95",
    badgeText: "text-[#00f0ff]",
    statsName: "text-[#ff00ff]",
    textGlow: "shadow-[0_0_10px_rgba(255,0,255,0.25)]",
    inputColor: "#ff00ff"
  },
  light: {
    name: "Terminal Print",
    bg: "bg-[#f4f4f7]",
    text: "text-[#1e1e24]",
    border: "border-[#1e1e24]/15",
    borderHeader: "border-[#1e1e24]/10",
    textMuted: "text-neutral-500",
    textCommand: "text-slate-900",
    textPrompt: "text-[#0066cc]",
    inputCaret: "bg-[#1e1e24]",
    cardBg: "bg-white/95",
    badgeText: "text-[#0066cc]",
    statsName: "text-[#1e1e24]",
    textGlow: "shadow-none",
    inputColor: "#1e1e24"
  },
  blue: {
    name: "Hacker Blue",
    bg: "bg-[#000a12]",
    text: "text-[#00e5ff]",
    border: "border-[#00e5ff]/30",
    borderHeader: "border-[#00e5ff]/20",
    textMuted: "text-[#00e5ff]/60",
    textCommand: "text-white",
    textPrompt: "text-[#ff007f]",
    inputCaret: "bg-[#00e5ff]",
    cardBg: "bg-[#001322]/95",
    badgeText: "text-[#ff007f]",
    statsName: "text-[#00e5ff]",
    textGlow: "shadow-[0_0_10px_rgba(0,229,255,0.25)]",
    inputColor: "#00e5ff"
  },
  mono: {
    name: "Classic Mono",
    bg: "bg-[#0c0c0c]",
    text: "text-white",
    border: "border-white/20",
    borderHeader: "border-white/10",
    textMuted: "text-neutral-400",
    textCommand: "text-white",
    textPrompt: "text-[#33ff33]",
    inputCaret: "bg-white",
    cardBg: "bg-[#181818]/95",
    badgeText: "text-[#33ff33]",
    statsName: "text-white",
    textGlow: "shadow-none",
    inputColor: "#ffffff"
  }
};
