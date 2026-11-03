import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Gift, HeartHandshake, Sparkles, ArrowRight, Check } from 'lucide-react';

export const GiftingSplitBanner: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-surface border border-border shadow-warm-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Photography Column */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden bg-blush/30">
              <div className="grid grid-cols-2 h-full gap-2 p-2">
                <img
                  src="/images/products/honeywick-packaging.jpeg"
                  alt="Honeywick Branded Gift Packaging"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <img
                  src="/images/products/custom-favors.jpeg"
                  alt="Custom Wedding Celebration Candle Favors"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-surface/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-border shadow-md">
                <span className="text-xs font-bold text-berry flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-honey" />
                  <span>Real Custom Wedding & Milestone Orders</span>
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose mb-3">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Bespoke & Celebrations</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-tight">
                Gifting Crafted Around Your Story
              </h2>

              <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                Planning a wedding, baby shower, birthday milestone, or corporate celebration? We handcraft personalized sticker labels with your names & dates, curated scents, and reference-matched gift boxes.
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-cocoa">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blush text-berry flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Personalized labels with names, monograms, and event dates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blush text-berry flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Custom packaging: kraft boxes tied with satin ribbons</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blush text-berry flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Pinterest-inspired custom candle shapes & color palette matching</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => navigate('custom-gifting')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-berry text-white text-sm font-semibold hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2"
                >
                  <span>Build Custom Gifting Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('contact')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-cream text-cocoa hover:text-berry text-sm font-medium border border-border hover:border-rose transition-colors text-center"
                >
                  Direct Contact & WhatsApp
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
