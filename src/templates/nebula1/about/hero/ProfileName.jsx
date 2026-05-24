import BlurText from "../../BlurText";

const toCapitalizedWords = (value = "") =>
  `${value}`
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const ProfileName = ({ name }) => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  const displayName = toCapitalizedWords(name) || "Your Name";

  return (
    <div className="min-w-0 flex-1">
      <BlurText
        text={displayName}
        delay={200}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="hero-text-animate text-3xl font-bold leading-tight text-slate-100 tracking-tight sm:text-5xl"
      />
    </div>
  );
};

export default ProfileName;
