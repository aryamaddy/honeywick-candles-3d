import React, { useState, useEffect } from 'react';
import { PRODUCTS, FRAGRANCES, calculateVariantPrice } from '../data/catalogue';
import { ProductCard } from '../components/product/ProductCard';
import { CandleScene3D } from '../components/three/CandleScene3D';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';
import { FragranceMode, ColorOption, FragranceOption } from '../types';
import {
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  Check,
  ShieldCheck,
  Clock,
  Flame,
  Leaf,
  Layers,
  ChevronDown,
  ChevronUp,
  Box,
  Image as ImageIcon,
  Heart,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { currentParam, navigate, openProduct } = useNavigation();
  const { addItem } = useCart();

  const product = PRODUCTS.find(p => p.slug === currentParam) || PRODUCTS[0];

  // Options state
  const [selectedPack, setSelectedPack] = useState<'Single' | 'Set of 2'>('Single');
  const [selectedFragranceMode, setSelectedFragranceMode] = useState<FragranceMode>('with_fragrance');
  const [selectedFragrance, setSelectedFragrance] = useState<FragranceOption>(FRAGRANCES[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.availableColors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | '3d'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('care');

  // Reset or adjust options on product change
  useEffect(() => {
    setSelectedPack('Single');
    if (product.id === 'golu-glow') {
      setSelectedFragranceMode('ladoo');
      setSelectedFragrance(FRAGRANCES.find(f => f.id === 'ladoo') || FRAGRANCES[0]);
    } else if (product.fragranceModes.includes('with_fragrance')) {
      setSelectedFragranceMode('with_fragrance');
      setSelectedFragrance(FRAGRANCES[0]);
    } else {
      setSelectedFragranceMode('without_fragrance');
    }
    setSelectedColor(product.availableColors[0]);
    setActiveImageIndex(0);
    setActiveMediaTab('photos');
    setQuantity(1);
  }, [product.id]);

  // Current calculated price based on selected pack & fragrance
  const currentPrice = calculateVariantPrice(product, selectedPack, selectedFragranceMode);
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    const scentName = selectedFragranceMode !== 'without_fragrance' ? selectedFragrance.name : undefined;
    addItem(product, selectedPack, selectedFragranceMode, scentName, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-8 sm:py-14 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted mb-6">
          <button
            onClick={() => navigate('shop')}
            className="hover:text-berry flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>
          <span>/</span>
          <span className="capitalize">{product.categoryLabel}</span>
          <span>/</span>
          <span className="text-cocoa font-semibold">{product.name}</span>
        </div>

        {/* Main Product Stage: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-surface p-6 sm:p-10 rounded-3xl border border-border shadow-warm">
          
          {/* Left Column: Visual Media & 3D Interactive Stage */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Media Mode Tabs: Photos vs 3D Model */}
            {product.has3DModel && (
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-cream border border-border/80 self-start">
                <button
                  onClick={() => setActiveMediaTab('photos')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMediaTab === 'photos'
                      ? 'bg-surface text-berry shadow-xs'
                      : 'text-muted hover:text-cocoa'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Studio Gallery</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMediaTab === '3d'
                      ? 'bg-berry text-white shadow-warm'
                      : 'text-muted hover:text-cocoa'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-honey" />
                  <span>3D Interactive Studio</span>
                </button>
              </div>
            )}

            {/* Main Visual Display */}
            {activeMediaTab === 'photos' ? (
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream border border-border shadow-xs group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cocoa shadow-xs">
                  Photo {activeImageIndex + 1} of {product.images.length}
                </div>
              </div>
            ) : (
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream border border-border shadow-inner p-2">
                <CandleScene3D
                  candleType={product.default3DType || 'jar'}
                  waxColorHex={selectedColor.hex}
                  className="w-full h-full"
                  showControls={true}
                  interactive={true}
                />
              </div>
            )}

            {/* Thumbnail Gallery */}
            {activeMediaTab === 'photos' && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-berry ring-2 ring-berry/20 scale-105'
                        : 'border-border/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Customization Controls & Add to Bag */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Title & Price Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose">
                  {product.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-success font-semibold bg-success/10 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock • Ready to Hand-pour</span>
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-medium text-muted mt-1">
                {product.tagline}
              </p>

              {/* Live Calculated Price */}
              <div className="mt-4 pb-4 border-b border-border/60 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-berry">
                  ₹{currentPrice}
                </span>
                <span className="text-xs text-muted">
                  {selectedPack === 'Set of 2' ? '(Price for entire Set of 2 candles)' : '(Price per single candle)'}
                </span>
              </div>
            </div>

            {/* 1. Pack Size Selector */}
            {product.availablePacks.length > 1 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa flex justify-between">
                  <span>1. Choose Pack Size</span>
                  <span className="text-muted font-normal lowercase">Select count</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {product.availablePacks.map(pack => {
                    const isSelected = selectedPack === pack;
                    return (
                      <button
                        key={pack}
                        onClick={() => setSelectedPack(pack)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-berry bg-blush/40 ring-2 ring-berry/20 font-bold text-berry'
                            : 'border-border bg-cream hover:bg-blush/20 text-cocoa font-medium'
                        }`}
                      >
                        <div className="text-sm">{pack}</div>
                        <div className="text-[11px] text-muted">
                          {pack === 'Single' ? '1 standalone candle' : 'Complete set of 2 pieces'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Fragrance Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cocoa flex justify-between">
                <span>2. Fragrance Selection</span>
                <span className="text-muted font-normal">Choose scent option</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.fragranceModes.map(mode => {
                  const isSelected = selectedFragranceMode === mode;
                  let label = 'With Fragrance';
                  let sub = 'Pick aroma below';

                  if (mode === 'without_fragrance') {
                    label = 'Unscented';
                    sub = 'Pure soy aroma';
                  } else if (mode === 'ladoo') {
                    label = 'Motichoor Ladoo';
                    sub = 'Festive exclusive';
                  }

                  return (
                    <button
                      key={mode}
                      onClick={() => {
                        setSelectedFragranceMode(mode);
                        if (mode === 'ladoo') {
                          setSelectedFragrance(FRAGRANCES.find(f => f.id === 'ladoo') || FRAGRANCES[0]);
                        }
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-berry bg-blush/50 text-berry font-bold ring-2 ring-berry/20'
                          : 'border-border bg-cream text-cocoa hover:bg-blush/20'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold">{label}</div>
                      <div className="text-[10px] text-muted">{sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Conditional Specific Scent Dropdown/Chips */}
              {selectedFragranceMode === 'with_fragrance' && (
                <div className="mt-3 p-3.5 rounded-2xl bg-cream border border-border/80 space-y-2">
                  <div className="text-xs font-semibold text-cocoa">
                    Select Scent: <strong className="text-berry">{selectedFragrance.name}</strong>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FRAGRANCES.filter(f => f.id !== 'ladoo').map(scent => (
                      <button
                        key={scent.id}
                        onClick={() => setSelectedFragrance(scent)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium text-left truncate transition-colors ${
                          selectedFragrance.id === scent.id
                            ? 'bg-berry text-white font-semibold'
                            : 'bg-surface text-cocoa hover:bg-blush border border-border/70'
                        }`}
                      >
                        {scent.name}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-muted italic pt-1">
                    Notes: {selectedFragrance.notes}
                  </p>
                </div>
              )}
            </div>

            {/* 3. Colour Shade Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cocoa flex justify-between">
                <span>3. Wax Colour: <strong>{selectedColor.name}</strong></span>
                <span className="text-muted font-normal">{product.availableColors.length} options</span>
              </label>

              <div className="flex flex-wrap items-center gap-2.5">
                {product.availableColors.map(color => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        isSelected
                          ? 'border-berry scale-125 ring-2 ring-berry/20 shadow-sm'
                          : 'border-border/80 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* 4. Quantity & Add to Bag CTA */}
            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity Picker */}
              <div className="flex items-center border border-border rounded-2xl bg-cream p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl hover:bg-blush flex items-center justify-center font-bold text-cocoa transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-sm text-cocoa">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl hover:bg-blush flex items-center justify-center font-bold text-cocoa transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA Button */}
              <button
                onClick={handleAddToCart}
                className="w-full flex-1 py-4 px-6 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all transform active:scale-98 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-4 h-4 text-honey" />
                <span>Add to Bag • ₹{totalPrice}</span>
              </button>
            </div>

            {/* Added to Bag Toast confirmation */}
            {addedToast && (
              <div className="p-3 rounded-2xl bg-success text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-warm animate-in fade-in duration-200">
                <Check className="w-4 h-4" />
                <span>Added {quantity}x {product.name} ({selectedPack}) to your Bag!</span>
              </div>
            )}

            {/* Quick Specs Pill Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/50 text-center">
              <div className="p-2 rounded-xl bg-cream">
                <Clock className="w-4 h-4 text-berry mx-auto mb-1" />
                <span className="text-[10px] text-muted block">Burn Time</span>
                <span className="text-xs font-bold text-cocoa">{product.burnTime}</span>
              </div>
              <div className="p-2 rounded-xl bg-cream">
                <Leaf className="w-4 h-4 text-berry mx-auto mb-1" />
                <span className="text-[10px] text-muted block">Wax Type</span>
                <span className="text-xs font-bold text-cocoa">Pure Soy Blend</span>
              </div>
              <div className="p-2 rounded-xl bg-cream">
                <Flame className="w-4 h-4 text-honey mx-auto mb-1" />
                <span className="text-[10px] text-muted block">Weight</span>
                <span className="text-xs font-bold text-cocoa">{product.weight}</span>
              </div>
              <div className="p-2 rounded-xl bg-cream">
                <Layers className="w-4 h-4 text-berry mx-auto mb-1" />
                <span className="text-[10px] text-muted block">Dimensions</span>
                <span className="text-xs font-bold text-cocoa">{product.dimensions}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Information Accordion */}
        <div className="mt-12 bg-surface rounded-3xl border border-border p-6 sm:p-8 space-y-4 shadow-xs">
          
          {/* Care Accordion */}
          <div className="border-b border-border/60 pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
              className="w-full flex items-center justify-between text-left font-serif text-2xl font-bold text-cocoa hover:text-berry"
            >
              <span>Tested Candle Care & Burning Tips</span>
              {openAccordion === 'care' ? <ChevronUp className="w-5 h-5 text-berry" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'care' && (
              <ul className="mt-4 space-y-2 text-sm text-muted pl-4 list-disc">
                {product.careTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Description & Story */}
          <div className="border-b border-border/60 pb-4">
            <button
              onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
              className="w-full flex items-center justify-between text-left font-serif text-2xl font-bold text-cocoa hover:text-berry"
            >
              <span>Detailed Hand-Poured Story</span>
              {openAccordion === 'desc' ? <ChevronUp className="w-5 h-5 text-berry" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'desc' && (
              <p className="mt-4 text-sm text-muted leading-relaxed">
                {product.longDescription}
              </p>
            )}
          </div>

          {/* Shipping Policy */}
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
              className="w-full flex items-center justify-between text-left font-serif text-2xl font-bold text-cocoa hover:text-berry"
            >
              <span>Doorstep Delivery & Safe Packaging</span>
              {openAccordion === 'shipping' ? <ChevronUp className="w-5 h-5 text-berry" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openAccordion === 'shipping' && (
              <p className="mt-4 text-sm text-muted leading-relaxed">
                Every candle is individually cushioned in biodegradable honeycomb wrap and boxed securely in sturdy packaging. We dispatch within 1–2 business days. Free shipping across India on orders over ₹499.
              </p>
            )}
          </div>

        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="font-serif text-3xl font-bold text-cocoa mb-8">
            You May Also Love
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
