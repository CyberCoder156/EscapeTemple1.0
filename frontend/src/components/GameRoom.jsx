// ============================================================
// src/components/GameRoom.jsx: 2D Illustrated Ancient Temple Room
// ============================================================
import React, { useState } from 'react';

// Visual emoji and styling representation for room objects
const OBJECT_VISUALS = {
  rug: { icon: '🟫', label: 'Patterned Rug', defaultAnim: 'hover:-translate-y-1' },
  vase: { icon: '🏺', label: 'Clay Urn', defaultAnim: 'hover:rotate-6' },
  chest: { icon: '📦', label: 'Wooden Chest', defaultAnim: 'hover:scale-105' },
  table: { icon: '🪵', label: 'Altar Table', defaultAnim: 'hover:brightness-110' },
  curtains: { icon: '🏮', label: 'Tapestry', defaultAnim: 'hover:translate-x-1' },
  statue: { icon: '🦅', label: 'Falcon Statue', defaultAnim: 'hover:scale-105' },
  symbol: { icon: '💠', label: 'Lapis Symbol', defaultAnim: 'animate-gold-pulse' },
  door: { icon: '🚪', label: 'Exit Gateway', defaultAnim: 'hover:scale-105' }
};

function GameRoom({ objects = [], onInteract, isExitUnlocked, isDoorVisible = false }) {
  const [activeAnimId, setActiveAnimId] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);

  function handleClick(obj) {
    setActiveAnimId(obj.id);
    // Reset animation state after 600ms
    setTimeout(() => setActiveAnimId(null), 600);
    onInteract(obj);
  }

  return (
    <div className="relative w-full aspect-[16/10] max-h-[580px] bg-gradient-to-b from-[#181512] via-[#221f1a] to-[#12100d] rounded-2xl border-4 border-amber-900/60 shadow-2xl overflow-hidden select-none">
      
      {/* 1. ROOM ARCHITECTURE: Stone Blocks & Background Ambient Details */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#443a2b_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Carved Temple Archway at Top */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-stone-950 via-stone-900 to-transparent border-b border-amber-600/30 flex items-center justify-center">
        <div className="text-[11px] font-mono tracking-[0.4em] text-amber-500/60 uppercase">
          ✦ ANCIENT SANCTUARY CHAMBER ✦
        </div>
      </div>

      {/* Stone Pillars on Left & Right */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-stone-950 via-stone-900 to-transparent border-r border-stone-800" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-stone-950 via-stone-900 to-transparent border-l border-stone-800" />

      {/* Weathered Stone Floor */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-stone-950 via-[#1a1714] to-transparent border-t border-stone-800/80" />

      {/* 2. WALL TORCHES (Left & Right with Flicker Animation) */}
      <div className="absolute left-8 sm:left-14 top-1/4 flex flex-col items-center pointer-events-none">
        <div className="text-3xl animate-torch drop-shadow-[0_0_18px_rgba(255,140,56,0.8)]">🔥</div>
        <div className="w-2.5 h-12 bg-amber-950 rounded-b border border-amber-800" />
      </div>

      <div className="absolute right-8 sm:right-14 top-1/4 flex flex-col items-center pointer-events-none">
        <div className="text-3xl animate-torch drop-shadow-[0_0_18px_rgba(255,140,56,0.8)]">🔥</div>
        <div className="w-2.5 h-12 bg-amber-950 rounded-b border border-amber-800" />
      </div>

      {/* 3. INTERACTIVE ROOM OBJECTS (Rendered from Database Positions) */}
      {objects.map((obj) => {
        // CHANGE 1 & 6: Main exit door remains completely hidden until question phase is solved
        if (obj.object_type === 'door' && !isDoorVisible) {
          return null;
        }

        const visual = OBJECT_VISUALS[obj.object_type] || { icon: '❓', label: obj.object_name };
        const isAnimating = activeAnimId === obj.id;
        const isDoor = obj.object_type === 'door';

        return (
          <button
            key={obj.id}
            type="button"
            onClick={() => handleClick(obj)}
            onMouseEnter={() => setHoveredObject(obj)}
            onMouseLeave={() => setHoveredObject(null)}
            style={{
              left: `${obj.position_x}%`,
              top: `${obj.position_y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`absolute z-20 group focus:outline-none transition-transform duration-300 ${
              isAnimating ? 'scale-125 animate-shake' : 'hover:scale-110 active:scale-95'
            }`}
          >
            {/* Visual Container */}
            <div
              className={`p-3 rounded-xl backdrop-blur-sm border-2 transition shadow-lg flex flex-col items-center ${
                isDoor
                  ? isExitUnlocked
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-torch-lg animate-pulse'
                    : 'bg-stone-950/90 border-amber-800/80 shadow-md'
                  : 'bg-stone-900/80 border-amber-600/40 hover:border-temple-gold hover:bg-stone-800/90'
              }`}
            >
              {/* Object Icon */}
              <span className={`text-3xl sm:text-4xl ${isDoor && isExitUnlocked ? 'filter drop-shadow-[0_0_12px_#34d399]' : ''}`}>
                {visual.icon}
              </span>

              {/* Object Name Label */}
              <span className="text-[10px] font-temple font-bold text-amber-200 mt-1 whitespace-nowrap bg-stone-950/80 px-1.5 py-0.5 rounded border border-stone-800">
                {obj.object_name}
              </span>
            </div>

            {/* Desktop Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
              <div className="bg-stone-950 text-amber-200 text-[11px] px-2.5 py-1 rounded border border-temple-gold shadow-torch whitespace-nowrap font-sans">
                {obj.description || `Click to inspect ${obj.object_name}`}
              </div>
            </div>
          </button>
        );
      })}

      {/* 4. HOVER INSPECTOR BAR AT BOTTOM */}
      <div className="absolute bottom-2 inset-x-4 bg-stone-950/80 border border-stone-800 px-4 py-1.5 rounded-lg text-xs text-amber-300/80 flex items-center justify-between font-mono pointer-events-none">
        <span>
          {hoveredObject 
            ? `Target: ${hoveredObject.object_name} (${hoveredObject.object_type})` 
            : 'Explore chamber: Click rugs, urns, chests & altar'}
        </span>
        <span className="hidden sm:inline text-amber-500/70">
          Front-View 2D Sanctuary
        </span>
      </div>

    </div>
  );
}

export default GameRoom;
