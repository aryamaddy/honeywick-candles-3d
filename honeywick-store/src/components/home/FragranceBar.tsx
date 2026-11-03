import React, { useState } from 'react';
import { FRAGRANCES } from '../../data/catalogue';
import { Sparkles, Wind, CheckCircle2 } from 'lucide-react';

export const FragranceBar: React.FC = () => {
  const [selectedScent, setSelectedScent] = useState(FRAGRANCES[0]);

  return (
    <section className="py-16 sm:py-20 bg-blush-light border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-3">
            <Wind className="w-3.5 h-3.5" />
            <span>Catalogue Aromatics</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa">
            Find Your Signature Fragrance
          </h2>
          <p className="mt-3 text-sm text-muted">
            Crafted with safe, high-grade fragrance oils and botanical essences. Pick your favorite scent for your DELULU, GOLU GLOW, or BLOOM BABY candle.
          </p>
        </div>

        {/* Fragrance Pills Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-8">
          {FRAGRANCES.map(f => {
            const isSelected = selectedScent.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedScent(f)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all transform active:scale-95 ${
                  isSelected
                    ? 'bg-berry text-white shadow-warm ring-2 ring-berry/20 scale-105'
                    : 'bg-surface text-cocoa hover:bg-blush/60 border border-border/80'
                }`}
              >
                {f.name}
                {f.badge && (
                  <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-blush text-berry'}`}>
                    {f.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Fragrance Feature Card */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-surface p-6 sm:p-8 border border-border shadow-warm transition-all animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
                  {selectedScent.name}
                </h3>
                {selectedScent.badge && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-honey-light text-cocoa">
                    {selectedScent.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-rose uppercase tracking-wider mt-1">
                Aromatic Profile
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-cream border border-border text-xs text-muted flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>Available in single & set packs</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-cocoa/90 leading-relaxed mt-4">
            {selectedScent.description}
          </p>

          <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-muted">
            <span className="font-semibold text-cocoa">Fragrance Notes:</span>
            <span className="text-berry font-medium">{selectedScent.notes}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
