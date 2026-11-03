import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigation } from '../context/NavigationContext';
import { useStoreData } from '../context/StoreDataContext';
import { CheckCircle, Package, ArrowRight, ShieldCheck, Truck, Sparkles, MapPin, Calendar } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { currentParam, navigate } = useNavigation();
  const { getOrderById, orders } = useStoreData();

  // Find the order by token/id or take the latest
  const order = (currentParam ? getOrderById(currentParam) : null) || orders[0];

  // Fire celebratory confetti on mount!
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8E2949', '#D87591', '#F5D6DC', '#E7AA51'],
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="py-20 text-center bg-cream min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl font-bold text-cocoa mb-3">Order Not Found</h2>
        <p className="text-sm text-muted mb-6">We could not locate this order ID.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-2.5 rounded-full bg-berry text-white text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card Header */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-warm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto shadow-sm ring-8 ring-success/5">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blush text-berry">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Successfully Placed</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa">
            Thank You, {order.customer.fullName.split(' ')[0]}!
          </h1>

          <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
            Your order has been received by the Honeywick studio. We have begun hand-pouring your candle selections with love.
          </p>

          <div className="p-3.5 rounded-2xl bg-cream border border-border inline-block text-xs font-semibold text-cocoa">
            Order Reference: <strong className="text-berry font-mono text-sm">{order.orderNumber}</strong>
          </div>
        </div>

        {/* Order Fulfillment Timeline Progress */}
        <div className="mt-8 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
            Fulfillment Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="flex sm:flex-col items-center text-left sm:text-center gap-3">
              <span className="w-8 h-8 rounded-full bg-berry text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <span className="text-xs font-bold text-cocoa block">Order Confirmed</span>
                <span className="text-[10px] text-muted">Details verified</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center text-left sm:text-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blush text-berry text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <span className="text-xs font-bold text-cocoa block">Hand-Pouring</span>
                <span className="text-[10px] text-muted">Soy wax curing</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center text-left sm:text-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cream border border-border text-muted text-xs font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <span className="text-xs font-bold text-muted block">Gift Packaging</span>
                <span className="text-[10px] text-muted">Safety cushion wrap</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center text-left sm:text-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cream border border-border text-muted text-xs font-bold flex items-center justify-center">
                4
              </span>
              <div>
                <span className="text-xs font-bold text-muted block">Doorstep Delivery</span>
                <span className="text-[10px] text-muted">Estimated 2–4 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items & Shipping Receipt */}
        <div className="mt-8 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-warm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
            Order Receipt & Delivery Info
          </h2>

          {/* Delivery Address Details */}
          <div className="p-4 rounded-2xl bg-cream border border-border/80 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-berry flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted space-y-0.5">
              <div className="font-bold text-cocoa text-sm">{order.customer.fullName}</div>
              <div>{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</div>
              <div>Phone: {order.customer.phone} • Email: {order.customer.email}</div>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3 divide-y divide-border/60">
            {order.items.map(item => (
              <div key={item.id} className="pt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-xl object-cover bg-cream border border-border" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-cocoa">{item.productName} ({item.pack})</h4>
                    <p className="text-[11px] text-muted">
                      {item.color.name}
                      {item.fragranceMode !== 'without_fragrance' && ` • Scent: ${item.fragranceName}`}
                    </p>
                    <span className="text-[10px] text-cocoa font-medium">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="font-serif font-bold text-sm text-cocoa">
                  ₹{item.unitPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-border/80 space-y-1.5 text-xs text-muted">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-cocoa font-semibold">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-cocoa font-semibold">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border/60 text-base font-bold text-cocoa">
              <span className="font-serif">Amount Paid</span>
              <span className="text-berry font-serif text-xl">₹{order.total}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('shop')}
              className="flex-1 py-3.5 rounded-full bg-berry text-white font-bold text-xs sm:text-sm hover:bg-berry-dark shadow-warm transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('admin')}
              className="px-6 py-3.5 rounded-full bg-surface text-cocoa hover:text-berry font-semibold text-xs border border-border hover:border-rose transition-colors"
            >
              View in Owner Portal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
