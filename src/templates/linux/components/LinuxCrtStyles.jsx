const LinuxCrtStyles = () => (
  <style>{`
    @keyframes crt-flicker {
      0% { opacity: 0.985; }
      50% { opacity: 0.998; }
      100% { opacity: 0.985; }
    }

    @keyframes terminal-hard-blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }

    .crt-screen {
      animation: crt-flicker 0.18s infinite;
    }

    .terminal-hard-caret {
      animation: terminal-hard-blink 1s steps(1, end) infinite;
    }

    .crt-scanlines::after {
      content: " ";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%),
        linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      z-index: 100;
      background-size: 100% 3px, 3px 100%;
      pointer-events: none;
      opacity: 0.85;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

export default LinuxCrtStyles;
