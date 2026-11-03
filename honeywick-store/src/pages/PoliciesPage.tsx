import React, { useState } from 'react';
import { ShieldCheck, Truck, RefreshCw, FileText, Lock } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>('shipping');

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Standards</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cocoa">
            Policies & Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-2">
            Clear, honest terms regarding shipping, returns, product care, and privacy.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-border/80 pb-4">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'shipping'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping & Delivery</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'returns'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Returns & Refunds</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-warm text-sm text-cocoa/90 leading-relaxed space-y-6">
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold text-cocoa mb-4">
                Shipping & Doorstep Delivery
              </h2>
              <p>
                At Honeywick Candles, each piece is handcrafted and individually wrapped to ensure it arrives at your doorstep in pristine condition.
              </p>
              <h3 className="font-serif text-xl font-bold text-cocoa pt-2">Processing Time</h3>
              <p>
                Orders are processed and dispatched within <strong>1–2 business days</strong>. For custom orders (wedding favors, personalized labels), processing takes 3–5 business days depending on quantity.
              </p>
              <h3 className="font-serif text-xl font-bold text-cocoa pt-2">Shipping Charges & Thresholds</h3>
              <p>
                We offer <strong>Free Standard Shipping</strong> on all domestic prepaid orders over <strong>₹499</strong>. For orders below ₹499, a flat shipping fee of ₹60 is applied at checkout.
              </p>
              <h3 className="font-serif text-xl font-bold text-cocoa pt-2">Transit & Tracking</h3>
              <p>
                Once dispatched, tracking links are shared via email and SMS. Delivery typically takes 2–4 business days for metropolitan areas and 4–7 days for non-metro locations.
              </p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold text-cocoa mb-4">
                Returns & Replacement Policy
              </h2>
              <p>
                Because candles are fragile, perishable home-fragrance items, we take utmost care during transit packaging. If your candle arrives damaged, cracked, or melted due to courier handling, we offer a <strong>100% free immediate replacement or refund</strong>.
              </p>
              <h3 className="font-serif text-xl font-bold text-cocoa pt-2">Damaged in Transit Claims</h3>
              <p>
                Please email us at <strong>care@honeywickcandles.in</strong> or WhatsApp us with an unboxing photo within <strong>48 hours of delivery</strong>. Our team will verify and dispatch a replacement within 24 hours.
              </p>
              <h3 className="font-serif text-xl font-bold text-cocoa pt-2">Non-Returnable Items</h3>
              <p>
                Candles that have been lit, trimmed, or customized with personal names/dates cannot be returned due to hygienic and custom manufacturing reasons.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold text-cocoa mb-4">
                Privacy & Data Security
              </h2>
              <p>
                We respect your personal privacy. When you purchase from Honeywick Candles, your delivery name, address, phone number, and email are solely used for fulfilling your shipment and sharing dispatch alerts.
              </p>
              <p>
                We do not store your credit card or UPI credentials on our servers. All financial transactions are securely processed through industry-standard 256-bit encrypted payment gateways.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="font-serif text-3xl font-bold text-cocoa mb-4">
                Terms & Conditions
              </h2>
              <p>
                By placing an order on Honeywick Candles, you agree that hand-poured candles are artisanal products; slight variations in color hue, frosting, or minor botanical characteristics are natural signs of pure soy wax and not product defects.
              </p>
              <p>
                All prices listed in Indian Rupees (INR) are inclusive of all applicable taxes.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
