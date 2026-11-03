import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Flame, Scissors, Wind, Heart, Sparkles, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export const CandleCarePage: React.FC = () => {
  const { navigate } = useNavigation();

  const rules = [
    {
      step: '01',
      title: 'The Golden First Burn (Wax Memory)',
      desc: 'When lighting your candle for the very first time, allow it to burn for 2 to 3 consecutive hours until the melted wax forms an even pool reaching all edges of the container. Soy wax has a "memory" — skipping this step causes tunneling, where the wick burrows down leaving wasted wax on the sides.',
      icon: <Flame className="w-6 h-6 text-honey" />,
    },
    {
      step: '02',
      title: 'Trim the Wick to 1/4 Inch (5mm)',
      desc: 'Before every subsequent burn, always trim the cotton wick to approximately 1/4 inch (5mm). A shorter wick ensures a calm, smokeless flame, prevents mushrooming on the tip, and maximizes your candle’s total burning hours.',
      icon: <Scissors className="w-6 h-6 text-berry" />,
    },
    {
      step: '03',
      title: 'Burn on a Heat-Resistant Surface',
      desc: 'For sculptural pillar candles like BLOOM BABY, GOLU GLOW, and BUBBLE GUM, always place them atop a ceramic dish, marble tray, or brass thali with raised rims. Sculptural shapes melt naturally and create artistic organic wax drips.',
      icon: <ShieldAlert className="w-6 h-6 text-rose" />,
    },
    {
      step: '04',
      title: 'Keep Away from Drafts & Vents',
      desc: 'Avoid placing burning candles near ceiling fans, air conditioners, open windows, or heavy foot traffic. Drafts cause uneven burning, flickering, and soot formation.',
      icon: <Wind className="w-6 h-6 text-berry" />,
    },
    {
      step: '05',
      title: 'Extinguish Gently (Use a Snuffer)',
      desc: 'Instead of blowing vigorously onto the flame, gently use a candle snuffer or dip the wick into the melted wax pool and straighten it back up. This prevents smoke and keeps the cotton wick primed for the next lighting.',
      icon: <CheckCircle2 className="w-6 h-6 text-success" />,
    },
    {
      step: '06',
      title: 'Repurpose Your DELULU Glass Tumbler',
      desc: 'When only 1/2 inch of wax remains at the bottom, gently pour warm water to loosen the wax disk and cotton base. Wash with soap and reuse the premium thermal glass tumbler as a makeup brush holder, pen stand, or succulent planter!',
      icon: <Sparkles className="w-6 h-6 text-honey" />,
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-3">
            <Flame className="w-3.5 h-3.5 text-honey" />
            <span>Essential Maintenance</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa leading-tight">
            How to Love & Care For Your Candles
          </h1>

          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            Every Honeywick candle is hand-poured with natural, pure soy wax. Follow these simple rituals to ensure the cleanest burn, safest atmosphere, and longest lasting aroma.
          </p>
        </div>

        {/* 6 Step Care Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rules.map(rule => (
            <div
              key={rule.step}
              className="bg-surface rounded-3xl border border-border p-8 shadow-warm hover:border-rose/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-cream border border-border flex items-center justify-center">
                    {rule.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-berry/30">
                    {rule.step}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
                  {rule.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 text-[11px] font-semibold text-rose uppercase tracking-wider">
                Honeywick Tested Rule
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-blush/40 border border-border p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-cocoa mb-3">
            Ready to find your daily dose of glow?
          </h2>
          <p className="text-sm text-muted mb-6 max-w-md mx-auto">
            Discover our collection of scented jar candles, botanical flowers, and aesthetic bubble cubes.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 rounded-full bg-berry text-white font-bold text-sm hover:bg-berry-dark shadow-warm inline-flex items-center gap-2"
          >
            <span>Explore The Candle Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
