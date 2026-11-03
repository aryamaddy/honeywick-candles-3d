import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Menu, X, Sparkles, Heart, Search, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigate } = useNavigation();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Shop All', page: 'shop' as const },
    { label: 'Custom Gifting', page: 'custom-gifting' as const },
    { label: 'Candle Care', page: 'candle-care' as const },
    { label: 'Our Story', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md border-b border-border/70 transition-all">
      {/* Top Warm Announcement Bar */}
      <div className="bg-berry text-white py-2 px-4 text-center text-xs tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-honey animate-pulse" />
        <span>Your Daily Dose of Glow • Free Shipping over ₹499 • Use Code <strong>GLOW10</strong> for 10% Off</span>
        <span className="hidden sm:inline opacity-75">| Handcrafted in Small Batches</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 rounded-xl text-cocoa hover:text-berry hover:bg-blush/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo & Tagline */}
        <div
          onClick={() => navigate('home')}
          className="flex items-center gap-3 cursor-pointer group py-1"
        >
          {/* Logo Badge Icon */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-rose/30 transition-transform group-hover:scale-105">
            <img
              src="/logo-icon.svg"
              alt="Honeywick Candles Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-cocoa group-hover:text-berry transition-colors">
              Honeywick
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-widest text-muted uppercase -mt-1">
              Your Daily Dose of Glow
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                  isActive
                    ? 'text-berry font-semibold'
                    : 'text-cocoa/80 hover:text-berry hover:-translate-y-0.5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-berry rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Admin, Search, Shopping Bag */}
        <div className="flex items-center gap-3">
          {/* Admin Dashboard Pill */}
          <button
            onClick={() => navigate('admin')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blush text-berry hover:bg-rose/30 border border-rose/40 transition-all shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Portal</span>
          </button>

          {/* Quick Shop Button */}
          <button
            onClick={() => navigate('shop')}
            className="p-2.5 rounded-full text-cocoa hover:text-berry hover:bg-blush/40 transition-colors"
            title="Browse Catalogue"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Shopping Bag Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-berry text-white hover:bg-berry-dark shadow-warm transition-transform active:scale-95"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-honey-light" />
            <span className="hidden sm:inline text-sm font-medium">Bag</span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-berry text-xs font-bold">
              {itemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream border-b border-border/80 px-6 py-5 shadow-warm-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => {
                  navigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 rounded-xl text-base font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-blush/60 text-berry font-semibold'
                    : 'text-cocoa hover:bg-blush/30'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-border/50 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-semibold text-berry bg-blush/40"
              >
                <span>Owner / Admin Portal</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-muted px-3 pt-2">
                <span>Instagram: @_honeywick_</span>
                <span>Handcrafted in India</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
