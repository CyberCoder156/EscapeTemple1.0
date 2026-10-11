// ============================================================
// src/components/Footer.jsx: Ancient Temple Footer
// ============================================================
import React from 'react';

function Footer() {
  return (
    <footer className="bg-temple-dark border-t-2 border-stone-800 text-amber-200/60 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h3 className="font-temple text-lg text-temple-gold font-bold tracking-wider">
            EscapeTemple
          </h3>
          <p className="text-xs text-amber-300/50 mt-1">
            An ancient educational puzzle adventure game. Explore, discover, solve, and escape.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-amber-200/70">
          <span>React.js + Tailwind</span>
          <span>•</span>
          <span>Node.js + Express</span>
          <span>•</span>
          <span>MySQL Database</span>
        </div>

        <div className="text-xs text-amber-400/50">
          Built with care for learning & exploration
        </div>
      </div>
    </footer>
  );
}

export default Footer;
