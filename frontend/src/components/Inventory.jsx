// ============================================================
// src/components/Inventory.jsx: Player Keys & Clues Panel
// ============================================================
import React from 'react';

function Inventory({ items = [] }) {
  return (
    <div className="bg-temple-stone/95 border-2 border-temple-gold/40 p-4 rounded-xl shadow-torch space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎒</span>
          <h3 className="font-temple text-sm font-bold text-temple-gold tracking-wider">
            Player Inventory
          </h3>
        </div>
        <span className="text-[10px] font-mono text-amber-300/70 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-amber-200/40 italic">
          Your satchel is empty.<br />
          Inspect objects in the chamber to find keys and clues!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {items.map((item, idx) => {
            const icon = item.item_type === 'key' ? '🔑' : item.item_type === 'relic' ? '💎' : '📜';
            return (
              <div
                key={idx}
                className="bg-stone-900/90 border border-stone-800 hover:border-temple-gold/50 p-2.5 rounded-lg flex items-center gap-3 transition"
              >
                <div className="w-9 h-9 rounded bg-temple-wood/90 border border-amber-600/40 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                  {icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-amber-100 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-amber-300/60 truncate">
                    {item.description || `${item.item_type} discovered in chamber`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Inventory;
