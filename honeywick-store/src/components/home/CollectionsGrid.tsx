import React from 'react';
import { COLLECTIONS } from '../../data/catalogue';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CollectionsGrid: React.FC = () => {
  const { openCategory, navigate } = useNavigation();

  const curatedCollections = COLLECTIONS.filter(c => c.id !== 'all');

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Shapes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa">
              Shop by Silhouette
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-berry hover:text-berry-dark group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedCollections.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                openCategory(cat.id);
                navigate('shop');
              }}
              className="group relative rounded-3xl overflow-hidden bg-surface border border-border shadow-warm hover:shadow-warm-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-square w-full overflow-hidden bg-blush/20">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-4 inset-x-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    {cat.count} {cat.count === 1 ? 'Design' : 'Designs'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white drop-shadow-sm">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Tagline & Action */}
              <div className="p-4 flex items-center justify-between text-xs text-muted border-t border-border/50">
                <span className="font-medium line-clamp-1">{cat.tagline}</span>
                <ArrowRight className="w-4 h-4 text-berry flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
