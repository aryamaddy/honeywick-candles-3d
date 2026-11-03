import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { useStoreData } from '../context/StoreDataContext';
import { Order } from '../types';
import { ShieldCheck, ArrowLeft, CheckCircle2, CreditCard, Smartphone, Banknote, Building2, Truck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();
  const { navigate } = useNavigation();
  const { addOrder } = useStoreData();

  // Address State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-cream min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl font-bold text-cocoa mb-3">No Items in Checkout</h2>
        <p className="text-sm text-muted mb-6">Your shopping bag is empty. Please select products first.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-2.5 rounded-full bg-berry text-white font-semibold text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email address';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Please enter a 10-digit mobile number';
    if (!formData.address.trim()) errs.address = 'Please enter your complete delivery street address';
    if (!formData.city.trim()) errs.city = 'Please enter your city';
    if (!formData.pincode.trim() || formData.pincode.length !== 6 || isNaN(Number(formData.pincode))) {
      errs.pincode = 'Please enter a valid 6-digit Indian PIN code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `HW-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: orderNumber,
        orderNumber,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: [...items],
        subtotal,
        shipping,
        discount,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      navigate('order-confirmation', orderNumber);
    }, 1000);
  };

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('cart')}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-berry font-medium mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mb-8">
          Secure Doorstep Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Contact & Shipping Address Card */}
            <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3 flex items-center justify-between">
                <span>1. Shipping Details</span>
                <span className="text-xs font-sans font-normal text-muted">India Postal Serviceable</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.fullName ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                  />
                  {errors.fullName && <p className="text-[11px] text-error mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.phone ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                  />
                  {errors.phone && <p className="text-[11px] text-error mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                  Email Address (For receipt & tracking) *
                </label>
                <input
                  type="email"
                  placeholder="ananya@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.email ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                />
                {errors.email && <p className="text-[11px] text-error mt-1">{errors.email}</p>}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                  House/Flat No., Apartment, Street Address *
                </label>
                <textarea
                  rows={2}
                  placeholder="Flat 302, Lavender Heights, MG Road"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.address ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                />
                {errors.address && <p className="text-[11px] text-error mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.city ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                  />
                  {errors.city && <p className="text-[11px] text-error mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border border-border focus:outline-none focus:border-berry text-cocoa"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1">
                    PIN Code (6 digits) *
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="411001"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-cream/50 border ${errors.pincode ? 'border-error' : 'border-border'} focus:outline-none focus:border-berry text-cocoa`}
                  />
                  {errors.pincode && <p className="text-[11px] text-error mt-1">{errors.pincode}</p>}
                </div>
              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3 flex items-center justify-between">
                <span>2. Payment Option</span>
                <span className="text-xs font-sans font-semibold text-success flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </h2>

              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-berry bg-blush/40 ring-2 ring-berry/20' : 'border-border bg-cream/40 hover:bg-blush/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-berry focus:ring-berry"
                    />
                    <div>
                      <div className="text-sm font-bold text-cocoa flex items-center gap-2">
                        <span>UPI Instant (Fastest)</span>
                        <span className="text-[10px] bg-honey-light text-cocoa px-2 py-0.5 rounded-full font-bold">Recommended</span>
                      </div>
                      <div className="text-xs text-muted">Google Pay, PhonePe, Paytm, BHIM or any UPI App</div>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-berry" />
                </label>

                {/* Cards Option */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-berry bg-blush/40 ring-2 ring-berry/20' : 'border-border bg-cream/40 hover:bg-blush/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-berry focus:ring-berry"
                    />
                    <div>
                      <div className="text-sm font-bold text-cocoa">Credit / Debit Card</div>
                      <div className="text-xs text-muted">Visa, MasterCard, RuPay, Maestro</div>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-berry" />
                </label>

                {/* NetBanking */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-berry bg-blush/40 ring-2 ring-berry/20' : 'border-border bg-cream/40 hover:bg-blush/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-berry focus:ring-berry"
                    />
                    <div>
                      <div className="text-sm font-bold text-cocoa">Net Banking</div>
                      <div className="text-xs text-muted">HDFC, ICICI, SBI, Axis & 50+ Indian banks</div>
                    </div>
                  </div>
                  <Building2 className="w-5 h-5 text-berry" />
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-berry bg-blush/40 ring-2 ring-berry/20' : 'border-border bg-cream/40 hover:bg-blush/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-berry focus:ring-berry"
                    />
                    <div>
                      <div className="text-sm font-bold text-cocoa">Cash on Delivery (COD)</div>
                      <div className="text-xs text-muted">Pay in cash or UPI to courier partner at doorstep</div>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-berry" />
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Confirmation */}
          <div className="lg:col-span-5 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
              Order Review ({items.length})
            </h2>

            {/* List of checkout items */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-14 h-14 object-cover rounded-xl bg-cream border border-border flex-shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <div className="font-bold text-cocoa">{item.productName} ({item.pack})</div>
                    <div className="text-muted text-[11px]">
                      {item.color.name}
                      {item.fragranceMode !== 'without_fragrance' && ` • ${item.fragranceName}`}
                    </div>
                    <div className="text-cocoa font-medium mt-0.5">
                      Qty: {item.quantity} × ₹{item.unitPrice}
                    </div>
                  </div>
                  <div className="font-bold text-sm text-cocoa">
                    ₹{item.unitPrice * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-muted pt-2 border-t border-border/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-cocoa font-semibold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount Applied</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-cocoa font-semibold">
                  {shipping === 0 ? <strong className="text-success">FREE</strong> : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border/80 text-lg font-bold text-cocoa">
                <span className="font-serif">Grand Total</span>
                <span className="text-berry font-serif text-2xl">₹{total}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <span>Pay & Place Order • ₹{total}</span>
              )}
            </button>

            <div className="p-3 rounded-xl bg-blush/40 border border-border/60 text-[11px] text-muted space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-cocoa">
                <Truck className="w-3.5 h-3.5 text-berry" />
                <span>Standard Delivery: 2–4 Business Days</span>
              </div>
              <div>Carefully hand-packaged with safety cushion wrap from our studio.</div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
