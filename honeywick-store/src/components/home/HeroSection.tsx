import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { CandleScene3D } from '../three/CandleScene3D';
import { Sparkles, ArrowRight, Flame, Gift, ShieldCheck, Heart } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate, openProduct } = useNavigation();
  const [heroLit, setHeroLit] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-blush/20 to-cream pt-6 pb-16 sm:py-20 lg:py-24 border-b border-border/40">
      {/* Decorative ambient background warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-honey/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-0 w-80 h-80 bg-rose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: 45% Editorial Brand Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-blush/80 border border-rose/30 text-xs font-semibold tracking-wider uppercase text-berry mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-honey" />
              <span>Your Daily Dose of Glow</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-cocoa leading-[1.08] tracking-tight">
              A little glow. <br />
              <span className="italic font-normal text-berry">A softer space.</span>
            </h1>

            {/* Brand Story Paragraph */}
            <p className="mt-5 text-base sm:text-lg text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Hand-poured with pure, non-toxic soy wax and comforting botanical scents. Made for cozy reading corners, tranquil baths, and celebrations close to your heart.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('shop')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-berry text-white text-sm font-bold tracking-wide hover:bg-berry-dark shadow-warm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>Shop Candles</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('custom-gifting')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-surface text-cocoa hover:text-berry text-sm font-semibold border border-border hover:border-rose transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Gift className="w-4 h-4 text-berry" />
                <span>Custom & Wedding Favors</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-border/60 grid grid-cols-3 gap-2 text-center lg:text-left">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-cocoa block">100%</span>
                <span className="text-[11px] text-muted">Natural Soy Wax</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-cocoa block">8+</span>
                <span className="text-[11px] text-muted">Custom Fragrances</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-cocoa block">₹79</span>
                <span className="text-[11px] text-muted">Starting Price</span>
              </div>
            </div>
          </div>

          {/* Right Column: 55% 3D Interactive Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-xl h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-surface/80 border border-border/80 shadow-warm-lg p-2 flex flex-col justify-between">
              
              {/* Top Banner on 3D Stage */}
              <div className="absolute top-4 inset-x-6 flex items-center justify-between z-20 pointer-events-none">
                <div className="pointer-events-auto">
                  <span className="text-xs font-semibold tracking-wider text-cocoa uppercase bg-cream/90 px-3 py-1 rounded-full border border-border shadow-xs">
                    Featured: DELULU Jar
                  </span>
                </div>

                <button
                  onClick={() => openProduct('delulu')}
                  className="pointer-events-auto px-3 py-1 rounded-full text-xs font-bold text-berry bg-blush hover:bg-rose/40 border border-rose/40 transition-colors shadow-xs"
                >
                  View Details & Buy →
                </button>
              </div>

              {/* Three.js Interactive WebGL Candle Scene */}
              <div className="w-full h-full">
                <CandleScene3D
                  candleType="jar"
                  initialLit={heroLit}
                  onLightToggle={setHeroLit}
                  className="w-full h-full"
                  showControls={true}
                  interactive={true}
                />
              </div>

              {/* Bottom Subtle Bar */}
              <div className="pt-1 px-4 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-honey" />
                  <span>Interactive Real-time 3D Shader Lighting</span>
                </span>
                <span className="hidden sm:inline">Clear Glass Tumbler • Soy Wax</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
