import React, { useState, useMemo } from 'react';
import { PRODUCTS, COLLECTIONS } from '../data/catalogue';
import { ProductCard } from '../components/product/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { Search, SlidersHorizontal, X, Sparkles, Filter } from 'lucide-react';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const { currentParam } = useNavigation();

  // State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    (currentParam as ProductCategory) || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFragranceFilter, setSelectedFragranceFilter] = useState<'all' | 'scented' | 'unscented'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(300);

  // Sync if category changed from URL param
  React.useEffect(() => {
    if (currentParam && ['all', 'jar', 'floral', 'bubble', 'festive'].includes(currentParam)) {
      setSelectedCategory(currentParam as ProductCategory);
    }
  }, [currentParam]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesTag = p.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      // Fragrance mode
      if (selectedFragranceFilter === 'unscented') {
        const hasUnscented = p.fragranceModes.includes('without_fragrance');
        if (!hasUnscented) return false;
      } else if (selectedFragranceFilter === 'scented') {
        const hasScented = p.fragranceModes.includes('with_fragrance') || p.fragranceModes.includes('ladoo');
        if (!hasScented) return false;
      }

      // Max price
      if (p.minPrice > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.minPrice - b.minPrice;
      if (sortBy === 'price-desc') return b.minPrice - a.minPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedFragranceFilter, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedFragranceFilter('all');
    setMaxPrice(300);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedFragranceFilter !== 'all' ||
    maxPrice < 300;

  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose">
            Artisanal Hand-Poured Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cocoa mt-1">
            The Candle Shop
          </h1>
          <p className="text-sm text-muted mt-2">
            Explore pure soy wax candles in sculptural silhouettes and signature comforting scents.
          </p>
        </div>

        {/* Search & Main Filter Controls Bar */}
        <div className="bg-surface p-4 sm:p-6 rounded-3xl border border-border shadow-warm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candle by name, shape, notes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs sm:text-sm bg-cream/60 border border-border focus:outline-none focus:border-berry text-cocoa"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-cocoa"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Fragrance Mode Pills */}
            <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs text-muted font-medium whitespace-nowrap mr-1">Aroma:</span>
              {(['all', 'scented', 'unscented'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedFragranceFilter(mode)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                    selectedFragranceFilter === mode
                      ? 'bg-berry text-white'
                      : 'bg-cream text-cocoa hover:bg-blush/60 border border-border/80'
                  }`}
                >
                  {mode === 'all' ? 'All Types' : mode}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto justify-end">
              <span className="text-xs text-muted font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="py-1.5 px-3 rounded-xl text-xs font-semibold bg-cream border border-border text-cocoa focus:outline-none focus:border-berry"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-border/50 flex flex-wrap items-center gap-2">
            {COLLECTIONS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose text-white shadow-sm'
                    : 'bg-cream text-cocoa hover:bg-blush/60 border border-border/60'
                }`}
              >
                {cat.title} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Bar & Active Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="text-xs text-muted font-medium">
            Showing <strong className="text-cocoa">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'candle design' : 'candle designs'}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-berry hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-surface p-12 text-center border border-border max-w-md mx-auto my-12">
            <Filter className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-cocoa mb-1">
              No matching candles found
            </h3>
            <p className="text-xs text-muted mb-6">
              Try adjusting your fragrance mode, search terms, or category filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-berry text-white text-xs font-bold hover:bg-berry-dark transition-colors shadow-warm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
