// ============================================================
// src/pages/Home.jsx: Landing Page for EscapeTemple
// ============================================================
import React from 'react';

function Home({ onBegin }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-b from-stone-900/90 via-temple-stone to-temple-dark border-b border-temple-gold/30">
        {/* Ambient Torch Glow Background Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-temple-gold/40 text-xs text-temple-gold font-mono tracking-wider">
            <span>🔥</span>
            <span>ENTER THE GATES OF WISDOM</span>
            <span>🔥</span>
          </div>

          <h1 className="font-temple text-4xl sm:text-6xl font-black text-amber-100 tracking-wider drop-shadow-md">
            Unravel The Mysteries Of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-temple-goldBright to-yellow-500">
              The Ancient Temple
            </span>
          </h1>

          <p className="text-amber-200/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Step inside forgotten chambers carved from weathered stone. Inspect rugs, tapestries, 
            and urns for hidden keys, solve academic puzzles in your chosen subject, 
            and escape before time runs out.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onBegin}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-stone-950 font-temple font-black text-lg tracking-wider shadow-torch hover:shadow-torch-lg hover:scale-105 active:scale-95 transition transform"
            >
              Begin Your Adventure →
            </button>
          </div>
        </div>
      </section>

      {/* 2. HOW TO PLAY SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-temple text-3xl font-bold text-temple-gold tracking-wide">
            How To Escape
          </h2>
          <p className="text-amber-200/70 text-sm max-w-lg mx-auto">
            Each temple chamber is guarded by ancient locks. Follow the ancient laws to escape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', icon: '📜', title: 'Choose Subject', desc: 'Select your field of wisdom — Mathematics, Computer Science, Physics, Chemistry, or General Knowledge.' },
            { step: '02', icon: '🔍', title: 'Inspect Chamber', desc: 'Click carpets, clay urns, wooden chests, and statues to trigger animations and discover hidden relics.' },
            { step: '03', icon: '🧩', title: 'Solve Chamber Riddles', desc: 'Answer academic questions inscribed on stone tablets to power the ancient mechanism.' },
            { step: '04', icon: '🚪', title: 'Unlock Exit Door', desc: 'When all requirements are satisfied, the colossal stone doors swing open to the next level.' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-temple-stone/90 border border-stone-800 hover:border-temple-gold/60 p-6 rounded-xl relative group transition hover:-translate-y-1 shadow-md"
            >
              <div className="text-xs font-mono font-bold text-amber-500/50 mb-3">
                STEP {item.step}
              </div>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-temple text-lg font-bold text-amber-100 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SUBJECTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-stone-900 via-temple-stone to-stone-900 border-2 border-temple-gold/30 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-temple text-3xl font-bold text-temple-gold">
            Five Disciplines Of Ancient Wisdom
          </h2>
          <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
            Choose your path through the labyrinth. Questions adapt to your chosen discipline and scale in difficulty as you delve deeper.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {[
              { name: 'Mathematics', icon: '📐' },
              { name: 'Computer Science', icon: '💻' },
              { name: 'Physics', icon: '⚡' },
              { name: 'Chemistry', icon: '🧪' },
              { name: 'General Knowledge', icon: '🌍' }
            ].map((s, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-lg bg-stone-800/90 border border-amber-600/30 text-amber-200 text-xs font-temple flex items-center gap-2"
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </span>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={onBegin}
              className="px-6 py-2.5 rounded bg-temple-gold text-stone-950 font-temple font-bold text-sm hover:bg-temple-goldBright transition"
            >
              Choose Subject & Begin →
            </button>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4 text-xs text-amber-200/60 leading-relaxed">
        <h3 className="font-temple text-base text-temple-gold font-bold">
          About EscapeTemple
        </h3>
        <p>
          EscapeTemple is designed as an interactive educational experience. 
          By combining point-and-click escape room exploration with academic problem-solving, 
          students reinforce core academic concepts through an atmospheric temple journey.
        </p>
      </section>

    </div>
  );
}

export default Home;
