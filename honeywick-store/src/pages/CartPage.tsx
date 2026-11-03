import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Tag, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    discount,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const { navigate } = useNavigation();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setCouponFeedback(res);
    if (res.success) setCouponInput('');
  };

  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="py-20 bg-cream min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center text-berry mx-auto mb-6 shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-sm text-muted mb-8">
            Explore our curated collections of artisanal scented candles and hand-poured decor to fill your home with warmth.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 rounded-full bg-berry text-white font-bold text-sm hover:bg-berry-dark transition-colors shadow-warm inline-flex items-center gap-2"
          >
            <span>Explore The Candle Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('shop')}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-berry font-medium mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cocoa mb-8">
          Shopping Bag ({items.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free shipping banner */}
            <div className="p-4 rounded-2xl bg-surface border border-border">
              {amountNeededForFreeShipping > 0 ? (
                <div>
                  <div className="flex justify-between text-xs text-cocoa font-medium mb-1.5">
                    <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for Free Shipping!</span>
                    <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                  </div>
                  <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-berry rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-success">
                  <Sparkles className="w-4 h-4 text-honey" />
                  <span>Congratulations! You qualify for Free Delivery across India.</span>
                </div>
              )}
            </div>

            {/* Items Card */}
            <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm space-y-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/60 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-2xl bg-cream border border-border flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-serif text-xl font-bold text-cocoa">
                        {item.productName}
                      </h3>
                      <div className="text-xs text-muted space-y-0.5 mt-1">
                        <div>Pack: <strong className="text-cocoa">{item.pack}</strong></div>
                        <div className="flex items-center gap-1.5">
                          <span>Colour:</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-border"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="text-cocoa font-medium">{item.color.name}</span>
                        </div>
                        {item.fragranceMode !== 'without_fragrance' && item.fragranceName && (
                          <div className="text-rose font-medium">Scent: {item.fragranceName}</div>
                        )}
                        {item.fragranceMode === 'without_fragrance' && (
                          <div className="text-muted">Unscented pure soy</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Unit Total */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0">
                    <div className="flex items-center border border-border rounded-xl bg-cream">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-blush text-cocoa transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 text-xs font-bold text-cocoa">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-blush text-cocoa transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-serif text-xl font-bold text-cocoa">
                        ₹{item.unitPrice * item.quantity}
                      </div>
                      <div className="text-[11px] text-muted">₹{item.unitPrice} each</div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-error transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-muted pt-2">
              <button
                onClick={clearCart}
                className="hover:text-error underline"
              >
                Clear entire shopping bag
              </button>
              <span>Prices are inclusive of all taxes</span>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
              Order Summary
            </h2>

            {/* Promo code form */}
            {!appliedPromo ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. GLOW10)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-cream/40 focus:outline-none focus:border-berry text-cocoa uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cocoa text-cream hover:bg-berry transition-colors"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blush/60 text-xs text-berry font-medium border border-rose/30">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Applied: <strong>{appliedPromo}</strong></span>
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-berry-dark hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            {couponFeedback && (
              <p className={`text-xs ${couponFeedback.success ? 'text-success' : 'text-error'}`}>
                {couponFeedback.message}
              </p>
            )}

            {/* Price lines */}
            <div className="space-y-3 text-sm text-muted pt-2 border-t border-border/50">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-cocoa font-semibold">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success font-medium">
                  <span>Special Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-cocoa font-semibold">
                  {shipping === 0 ? <strong className="text-success">FREE</strong> : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border/60 text-lg font-bold text-cocoa">
                <span className="font-serif">Total Amount</span>
                <span className="text-berry font-serif text-2xl">₹{total}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-4 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-muted flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>UPI, Cards, NetBanking & COD supported</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
