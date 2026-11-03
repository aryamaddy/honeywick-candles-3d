import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '../../context/NavigationContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    itemCount,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyPromoCode(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream shadow-2xl flex flex-col justify-between border-l border-border animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-border/80 bg-surface/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-berry" />
              <h2 className="font-serif text-2xl font-bold text-cocoa">Your Bag</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blush text-berry">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-muted hover:text-cocoa hover:bg-blush/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-blush/40 border-b border-border/60">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-cocoa font-medium">
                  <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for Free Shipping!</span>
                  <span>₹{subtotal} / ₹{freeShippingThreshold}</span>
                </div>
                <div className="w-full h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-berry rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <Sparkles className="w-4 h-4 text-honey" />
                <span>🎉 Unlocked! You've got FREE shipping across India!</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blush/60 flex items-center justify-center text-berry mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-cocoa mb-1">Your bag is empty</h3>
                <p className="text-sm text-muted mb-6 max-w-xs">
                  Looks like you haven't added any handcrafted glow to your space yet.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-berry text-white text-sm font-semibold hover:bg-berry-dark transition-colors shadow-warm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-surface border border-border/70 shadow-sm flex gap-4 transition-all hover:border-rose/40"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-xl bg-cream border border-border/50 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-lg font-bold text-cocoa leading-snug">
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted/60 hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <div className="text-xs text-muted space-y-0.5 mt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-cocoa">{item.pack}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-border inline-block"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            {item.color.name}
                          </span>
                        </div>
                        {item.fragranceMode !== 'without_fragrance' && item.fragranceName && (
                          <div className="text-rose font-medium">
                            Scent: {item.fragranceName}
                          </div>
                        )}
                        {item.fragranceMode === 'without_fragrance' && (
                          <div className="text-muted/80">Unscented</div>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls and price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-border rounded-lg bg-cream/50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-blush text-cocoa transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-cocoa">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-blush text-cocoa transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-sm text-cocoa">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-muted">
                            ₹{item.unitPrice} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border/80 bg-surface/90 backdrop-blur-md space-y-4">
              {/* Promo Code Box */}
              {!appliedPromo ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GLOW10)"
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

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-muted pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-cocoa font-medium">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-cocoa font-medium">
                    {shipping === 0 ? <strong className="text-success">FREE</strong> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/80 text-base font-bold text-cocoa">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-berry">₹{total}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('checkout');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-berry text-white font-semibold text-sm hover:bg-berry-dark shadow-warm transition-all transform active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>100% Secure Checkout • India-wide Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
