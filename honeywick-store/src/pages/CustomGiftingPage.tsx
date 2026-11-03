import React, { useState } from 'react';
import { useStoreData } from '../context/StoreDataContext';
import { useNavigation } from '../context/NavigationContext';
import { Gift, HeartHandshake, Sparkles, CheckCircle2, Upload, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomGiftingPage: React.FC = () => {
  const { addCustomEnquiry } = useStoreData();
  const { navigate } = useNavigation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: 'Wedding & Reception Favors',
    quantity: 50,
    requiredDate: '',
    message: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const occasions = [
    'Wedding & Reception Favors',
    'Baby Shower & Birth Announcements',
    'Birthday & Milestone Celebrations',
    'Corporate, PR & Festive Hampers',
    'Housewarming (Griha Pravesh)',
    'Pinterest-Inspired Custom Recreation',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;

    const id = addCustomEnquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      occasion: form.occasion,
      quantity: Number(form.quantity),
      requiredDate: form.requiredDate || 'Flexible / Within 1 month',
      message: form.message,
    });

    setSubmittedId(id);
  };

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-3">
            <Gift className="w-3.5 h-3.5 text-honey" />
            <span>Bespoke Favors & Milestone Gifts</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa leading-tight">
            Personalized Candles For Your Celebrations
          </h1>

          <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
            From intimate weddings with personalized monogram stickers to milestone birthdays and baby showers. Tell us your vision, and we’ll handcraft unforgettable candle memories.
          </p>
        </div>

        {/* 2-Column Split: Inspiration Showcase + Custom Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Real Custom Showcase */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl overflow-hidden bg-surface border border-border shadow-warm p-3">
              <img
                src="/images/products/custom-favors.jpeg"
                alt="Custom Wedding Candle Favors"
                className="w-full h-80 object-cover rounded-2xl mb-4"
              />
              <div className="p-3">
                <span className="text-xs font-bold text-berry uppercase tracking-wider">
                  Featured Custom Order
                </span>
                <h3 className="font-serif text-xl font-bold text-cocoa mt-0.5">
                  The Bushra & Sushrita Wedding Monogram
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Clear glass jar candles topped with hand-poured ruby red heart wax melts and custom floral emblem stickers.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-surface border border-border shadow-warm p-3">
              <img
                src="/images/products/honeywick-packaging.jpeg"
                alt="Honeywick Kraft Packaging"
                className="w-full h-72 object-cover rounded-2xl mb-4"
              />
              <div className="p-3">
                <span className="text-xs font-bold text-berry uppercase tracking-wider">
                  Bespoke Packaging
                </span>
                <h3 className="font-serif text-xl font-bold text-cocoa mt-0.5">
                  Branded Kraft Boxes with Satin Ribbons
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Individual gift-ready boxes complete with custom thank-you notes and tamper-evident seals.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Enquiry Form */}
          <div className="lg:col-span-7 bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-warm">
            
            {submittedId ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto ring-8 ring-success/5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h2 className="font-serif text-3xl font-bold text-cocoa">
                  Enquiry Received!
                </h2>

                <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{form.name}</strong>. Our head candle artisan has received your custom order request and will reach out via WhatsApp/email with design mockups and a bulk discount quote.
                </p>

                <div className="p-3 rounded-2xl bg-cream border border-border text-xs font-semibold text-cocoa inline-block">
                  Reference ID: <strong className="text-berry font-mono text-sm">{submittedId}</strong>
                </div>

                <div className="pt-6 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        occasion: occasions[0],
                        quantity: 50,
                        requiredDate: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-cream text-cocoa hover:text-berry text-xs font-semibold border border-border"
                  >
                    Submit Another Request
                  </button>

                  <button
                    onClick={() => navigate('admin')}
                    className="px-6 py-2.5 rounded-full bg-berry text-white text-xs font-bold hover:bg-berry-dark"
                  >
                    Track in Owner Portal
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-border/60 pb-3">
                  <h2 className="font-serif text-2xl font-bold text-cocoa">
                    Custom Gifting & Bulk Order Form
                  </h2>
                  <p className="text-xs text-muted mt-0.5">
                    Fill in your details below for custom stickers, scents, and packaging quotes.
                  </p>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                    Select Occasion / Purpose *
                  </label>
                  <select
                    value={form.occasion}
                    onChange={e => setForm({ ...form, occasion: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  >
                    {occasions.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                {/* Estimated Quantity & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                      Estimated Candle Quantity *
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={2000}
                      step={5}
                      value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                      placeholder="e.g. 50 pieces"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                      Required by Date
                    </label>
                    <input
                      type="date"
                      value={form.requiredDate}
                      onChange={e => setForm({ ...form, requiredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                    />
                  </div>
                </div>

                {/* Contact: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Riya Sen"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="riya@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                    required
                  />
                </div>

                {/* Message / Custom Sticker & Scent requirements */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                    Custom Sticker Text & Preferences
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., We want names 'Riya & Kabir' with date '14 Feb 2026', English Rose scent, and pink ribbon packaging."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-honey" />
                  <span>Submit Custom Enquiry For Free Quote</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted pt-1">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>No upfront payment required • Quotes shared within 24 hours</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
