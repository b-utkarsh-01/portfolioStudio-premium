import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const useObsidianEffects = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const [isClickableHovered, setIsClickableHovered] = useState(false);
  const [cursorLabel, setCursorLabel] = useState(null);
  const [sparks, setSparks] = useState([]);
  const [hoveredTimelineIdx, setHoveredTimelineIdx] = useState(null);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 220 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);
  const dotXSpring = useSpring(cursorX, { damping: 15, stiffness: 350 });
  const dotYSpring = useSpring(cursorY, { damping: 15, stiffness: 350 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);

      const x = (e.clientX - window.innerWidth / 2) / 60;
      const y = (e.clientY - window.innerHeight / 2) / 60;
      setBgOffset({ x, y });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isProject = target.closest(".project-card-target");
      const isContact = target.closest(".contact-card-target");
      const isTimeline = target.closest(".timeline-card-target");
      const isClickable = target.closest(
        "a, button, [role='button'], input, textarea, .cursor-pointer"
      );

      if (isProject) {
        setCursorLabel("VIEW");
        setIsClickableHovered(true);
      } else if (isContact) {
        setCursorLabel("LINK");
        setIsClickableHovered(true);
      } else if (isTimeline) {
        setCursorLabel("INFO");
        setIsClickableHovered(true);
      } else if (isClickable) {
        setCursorLabel("OPEN");
        setIsClickableHovered(true);
      } else {
        setCursorLabel(null);
        setIsClickableHovered(false);
      }
    };

    const handleMouseUp = (e) => {
      const id = Date.now() + Math.random();
      const newSpark = { id, x: e.clientX, y: e.clientY };
      setSparks((prev) => [...prev, newSpark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 500);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  return {
    bgOffset,
    cursorLabel,
    isClickableHovered,
    sparks,
    hoveredTimelineIdx,
    setHoveredTimelineIdx,
    dotXSpring,
    dotYSpring,
    ringXSpring,
    ringYSpring,
  };
};
