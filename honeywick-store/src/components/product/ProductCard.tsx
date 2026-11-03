import React, { useState } from 'react';
import { Product } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import { Sparkles, ArrowRight, Eye, Box } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProduct } = useNavigation();
  const [isHovered, setIsHovered] = useState(false);

  // Switch to alternate lit image on hover if available
  const displayImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      onClick={() => openProduct(product.slug)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-surface rounded-2xl sm:rounded-3xl border border-border/80 overflow-hidden shadow-warm hover:shadow-warm-lg hover:border-rose/50 transition-all duration-300 cursor-pointer"
    >
      {/* 4:5 Studio Image Frame */}
      <div className="relative aspect-[4/5] w-full bg-cream overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cream/90 text-cocoa backdrop-blur-md shadow-xs border border-border/60">
            {product.categoryLabel}
          </span>

          {product.has3DModel && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-berry text-white shadow-sm">
              <Box className="w-3 h-3 text-honey" />
              <span>3D Interactive</span>
            </span>
          )}
        </div>

        {/* Quick View Hover Action Banner */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-cocoa/60 via-cocoa/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface text-berry text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Customize & View</span>
          </span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Swatch Previews */}
          <div className="flex items-center gap-1.5 mb-2">
            {product.availableColors.slice(0, 4).map(c => (
              <span
                key={c.id}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-border/60"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.availableColors.length > 4 && (
              <span className="text-[10px] text-muted font-medium">
                +{product.availableColors.length - 4} shades
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-cocoa group-hover:text-berry transition-colors leading-tight">
            {product.name}
          </h3>

          <p className="text-xs text-muted line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & CTA Button */}
        <div className="pt-4 mt-3 border-t border-border/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted block -mb-0.5">
              {product.hasPriceRange ? 'From' : 'Price'}
            </span>
            <div className="font-serif text-xl font-bold text-cocoa">
              ₹{product.minPrice}
              {product.hasPriceRange && (
                <span className="text-xs font-normal text-muted ml-1">
                  - ₹{product.maxPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              openProduct(product.slug);
            }}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blush text-berry group-hover:bg-berry group-hover:text-white transition-colors"
          >
            <span>Options</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
