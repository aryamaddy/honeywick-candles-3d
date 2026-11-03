import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Heart, Sparkles, Leaf, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-4">
            <Sparkles className="w-3.5 h-3.5 text-honey" />
            <span>The Honeywick Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa leading-tight">
            Crafted for cozy spaces, soft evenings, and warm hearts.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted leading-relaxed">
            Honeywick began with a simple yearning: to create pure, artisanal scented candles that bring peaceful sanctuary to everyday life without synthetic toxins or overwhelming chemical perfumes.
          </p>
        </div>

        {/* 2-Column Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-warm-lg bg-surface border border-border p-3">
            <img
              src="/images/products/delulu-hero-lit.jpeg"
              alt="Honeywick Handcrafted Candle Studio"
              className="w-full h-[450px] object-cover rounded-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-border">
              <span className="text-xs font-bold text-berry flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose fill-rose" />
                <span>Small Batch Hand-Poured in India</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
              "Your Daily Dose of Glow"
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Every candle in our studio starts with premium, sustainably sourced 100% natural soy wax and lead-free organic cotton wicks. We hand-blend fine IFRA-certified botanical fragrances and gently stir them at exact curing temperatures to ensure an exquisite cold and hot scent throw.
            </p>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              From our sculptural peony blooms and playful pastel bubble cubes to our signature DELULU clear glass jars and celebratory GOLU GLOW festive ladoos, each piece is designed to be as much an artistic decor sculpture as an aromatic sanctuary.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface border border-border">
                <Leaf className="w-5 h-5 text-berry mb-2" />
                <h4 className="font-bold text-sm text-cocoa">Clean Soy Wax</h4>
                <p className="text-xs text-muted">Burns 50% longer than paraffin with zero black soot.</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface border border-border">
                <Flame className="w-5 h-5 text-honey mb-2" />
                <h4 className="font-bold text-sm text-cocoa">Cotton Wicks</h4>
                <p className="text-xs text-muted">Pure braided cotton fibers with no heavy metals or zinc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Follow Banner */}
        <div className="rounded-3xl bg-surface border border-border p-8 sm:p-12 shadow-warm text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-blush p-2 mx-auto mb-4">
            <img src="/logo-icon.svg" alt="Honeywick Logo" className="w-full h-full object-contain" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
            Join the Honeywick Community
          </h3>

          <p className="text-xs sm:text-sm text-muted mt-2 mb-6">
            Follow our daily hand-pouring journey, behind-the-scenes candle testing, and community tags on Instagram at <strong>@_honeywick_</strong>.
          </p>

          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 rounded-full bg-berry text-white font-bold text-sm hover:bg-berry-dark shadow-warm inline-flex items-center gap-2"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
