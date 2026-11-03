import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../components/ui/InstagramIcon';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const faqs = [
    {
      q: 'How long do Honeywick candles take to ship?',
      a: 'Standard orders are handcrafted in small batches and dispatched within 1–2 business days. Courier transit takes 2–4 business days across major Indian cities.',
    },
    {
      q: 'Do you offer customized wedding or party favors?',
      a: 'Yes! We specialize in custom sticker labels (with couple names, dates, or monograms), chosen fragrance blends, and reference packaging. Visit our Custom Gifting section to get a tailored quote.',
    },
    {
      q: 'What wax do you use?',
      a: 'Our jar candles and delicate shapes are poured using 100% pure organic soy wax and natural soy blends, ensuring a smokeless, non-toxic, long burn.',
    },
    {
      q: 'Are your fragrances safe for pets?',
      a: 'Yes, our fragrances are carefully balanced with phthalate-free, non-toxic oils. However, as with all aromatherapy, we recommend burning candles in well-ventilated rooms.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cocoa">
            We’d Love to Hear From You
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted">
            Have a question regarding candle care, bulk corporate hampers, or order status? Send us a message or find us on Instagram.
          </p>
        </div>

        {/* 2-Column: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm">
              <div className="w-10 h-10 rounded-2xl bg-blush flex items-center justify-center text-berry mb-4">
                <InstagramIcon className="w-5 h-5 text-rose" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa">Instagram Studio</h3>
              <p className="text-xs text-muted mt-1 mb-3">
                Tag your unboxing photos and DM us directly for quick questions.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-berry hover:underline inline-block"
              >
                @_honeywick_ →
              </a>
            </div>

            <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm">
              <div className="w-10 h-10 rounded-2xl bg-blush flex items-center justify-center text-berry mb-4">
                <Mail className="w-5 h-5 text-berry" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa">Customer Support Email</h3>
              <p className="text-xs text-muted mt-1 mb-3">
                For order tracking queries, replacements, and business collaborations.
              </p>
              <span className="text-xs font-bold text-cocoa">
                care@honeywickcandles.in
              </span>
            </div>

            <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm">
              <div className="w-10 h-10 rounded-2xl bg-blush flex items-center justify-center text-berry mb-4">
                <MapPin className="w-5 h-5 text-honey" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa">Artisan Studio</h3>
              <p className="text-xs text-muted mt-1">
                Hand-poured with love in India. Doorstep shipping available pan-India.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-warm">
            {sent ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cocoa">Message Sent!</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Thank you for reaching out. A Honeywick studio representative will reply to your email within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-4 px-6 py-2 rounded-full bg-cream text-cocoa hover:text-berry text-xs font-semibold border border-border"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
                  Leave a Note
                </h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanya Gupta"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sanya@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bulk order enquiry, Custom scent request..."
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help make your space cozier?"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-berry text-white font-bold text-xs sm:text-sm hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-cocoa text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-3xl bg-surface border border-border shadow-xs">
                <h4 className="font-serif text-xl font-bold text-cocoa mb-2">{faq.q}</h4>
                <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
