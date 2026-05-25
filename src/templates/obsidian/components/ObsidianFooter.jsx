const ObsidianFooter = ({ name }) => (
  <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-accent-lux text-neutral-500 py-4 mt-8 border-t border-white/[0.04]">
    <p>© {new Date().getFullYear()} {name || "Portfolio Builder"}. All rights reserved.</p>
    <p className="tracking-widest uppercase">// SECURED VIA PORTFOLIO STUDIO //</p>
  </footer>
);

export default ObsidianFooter;
