import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CollectionsGrid } from '../components/home/CollectionsGrid';
import { FragranceBar } from '../components/home/FragranceBar';
import { GiftingSplitBanner } from '../components/home/GiftingSplitBanner';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/catalogue';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf, Flame } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-0">
      {/* 3D Hero Section */}
      <HeroSection />

      {/* Trust & Craft Value Strip */}
      <section className="bg-surface border-b border-border/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-berry mb-2">
                <Leaf className="w-5 h-5" />
              </span>
              <h4 className="font-semibold text-xs sm:text-sm text-cocoa">100% Pure Soy Wax</h4>
              <p className="text-[11px] text-muted">Clean burning, biodegradable & non-toxic</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-berry mb-2">
                <Flame className="w-5 h-5 text-honey" />
              </span>
              <h4 className="font-semibold text-xs sm:text-sm text-cocoa">Lead-Free Cotton Wicks</h4>
              <p className="text-[11px] text-muted">Smokeless, steady & calming flame</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-berry mb-2">
                <Heart className="w-5 h-5 text-rose" />
              </span>
              <h4 className="font-semibold text-xs sm:text-sm text-cocoa">Hand-Poured Small Batches</h4>
              <p className="text-[11px] text-muted">Artisanal attention in every piece</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-berry mb-2">
                <ShieldCheck className="w-5 h-5 text-success" />
              </span>
              <h4 className="font-semibold text-xs sm:text-sm text-cocoa">Carefully Packaged</h4>
              <p className="text-[11px] text-muted">Damage-free India-wide doorstep delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products: Meet Your Next Glow */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Catalogue</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa">
                Meet Your Next Glow
              </h2>
              <p className="text-sm text-muted mt-2 max-w-lg">
                Explore our signature hand-poured creations. From cozy jars to playful bubbles and festive ladoos.
              </p>
            </div>

            <button
              onClick={() => navigate('shop')}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-berry hover:text-berry-dark group"
            >
              <span>View Full Shop</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* Curated Collections Grid */}
      <CollectionsGrid />

      {/* Fragrance Bar Exploration */}
      <FragranceBar />

      {/* Custom Gifting & Favors Split Banner */}
      <GiftingSplitBanner />

      {/* Brand Story Preview Quote */}
      <section className="py-20 bg-blush/30 border-t border-border/50 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-12 rounded-full bg-surface border border-rose/30 mx-auto mb-4 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-honey" />
          </div>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-cocoa leading-snug">
            “We believe every room deserves a gentle light that calms the mind, softens the evening, and makes memories sweeter.”
          </blockquote>
          <p className="mt-4 text-xs tracking-widest uppercase font-bold text-berry">
            — The Honeywick Studio
          </p>
        </div>
      </section>
    </div>
  );
};
