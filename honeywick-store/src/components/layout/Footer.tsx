import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Heart } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';

export const Footer: React.FC = () => {
  const { navigate, openCategory } = useNavigation();

  return (
    <footer className="bg-cocoa text-cream pt-16 pb-10 border-t border-rose/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split: Newsletter & Brand Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-blush p-1">
                <img src="/logo-icon.svg" alt="Honeywick Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-cream">
                Honeywick Candles
              </span>
            </div>
            
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              Your Daily Dose of Glow. Hand-poured artisanal soy candles designed to bring warmth, soft lighting, and delightful bespoke fragrances into your cozy spaces.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-rose/40 text-cream transition-colors border border-white/10"
              >
                <InstagramIcon className="w-4 h-4 text-rose" />
                <span>@_honeywick_</span>
              </a>
              <span className="text-xs text-cream/50">• Follow our candle journeys</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg text-cream font-semibold mb-4 tracking-wide">
                Collections
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/75">
                <li>
                  <button onClick={() => { openCategory('all'); navigate('shop'); }} className="hover:text-honey transition-colors">
                    All Candles
                  </button>
                </li>
                <li>
                  <button onClick={() => { openCategory('jar'); navigate('shop'); }} className="hover:text-honey transition-colors">
                    Jar Candles (DELULU)
                  </button>
                </li>
                <li>
                  <button onClick={() => { openCategory('floral'); navigate('shop'); }} className="hover:text-honey transition-colors">
                    Floral (BLOOM BABY)
                  </button>
                </li>
                <li>
                  <button onClick={() => { openCategory('bubble'); navigate('shop'); }} className="hover:text-honey transition-colors">
                    Bubble Cubes
                  </button>
                </li>
                <li>
                  <button onClick={() => { openCategory('festive'); navigate('shop'); }} className="hover:text-honey transition-colors">
                    Festive (GOLU GLOW)
                  </button>
                </li>
              </ul>
            </div>

            {/* Custom Services & Care */}
            <div>
              <h4 className="font-serif text-lg text-cream font-semibold mb-4 tracking-wide">
                Services & Care
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/75">
                <li>
                  <button onClick={() => navigate('custom-gifting')} className="hover:text-honey transition-colors">
                    Wedding & Event Favors
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('custom-gifting')} className="hover:text-honey transition-colors">
                    Custom Scent & Sticker
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('candle-care')} className="hover:text-honey transition-colors">
                    Candle Care Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('about')} className="hover:text-honey transition-colors">
                    About Our Story
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('admin')} className="hover:text-honey transition-colors text-rose font-medium">
                    Owner Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-serif text-lg text-cream font-semibold mb-4 tracking-wide">
                Customer Care
              </h4>
              <ul className="space-y-2.5 text-sm text-cream/75">
                <li>
                  <button onClick={() => navigate('policies')} className="hover:text-honey transition-colors">
                    Shipping & Delivery
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('policies')} className="hover:text-honey transition-colors">
                    Returns & Refunds
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('policies')} className="hover:text-honey transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('policies')} className="hover:text-honey transition-colors">
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('contact')} className="hover:text-honey transition-colors">
                    Get in Touch
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <div className="flex items-center gap-2">
            <span>© 2026 Honeywick Candles. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cream/80">
              Crafted with <Heart className="w-3 h-3 text-rose fill-rose" /> for cozy homes
            </span>
          </div>

          <div className="flex items-center gap-4 text-cream/60">
            <span>100% Pure Soy Wax</span>
            <span>•</span>
            <span>Handmade in Small Batches</span>
            <span>•</span>
            <span>Safe & Non-Toxic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
