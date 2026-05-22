export const premiumV1Template = {
  id: "premium-v1",
  tier: "premium",
  name: "Premium Nebula",
  description: "Creative visual style with richer glow and contrast accents.",
  theme: {
    bgClassName: "bg-[#090412]",
    cardClassName: "border-fuchsia-400/50 bg-fuchsia-950/40 text-fuchsia-100 hover:bg-fuchsia-900/40",
    title: "Premium Preview",
    effects: "galaxy",
    galaxy: { density: 1.25, glowIntensity: 0.72, saturation: 0.9, hueShift: 305 },
  },
};

export const PREMIUM_TEMPLATE_IDS = [premiumV1Template.id];
