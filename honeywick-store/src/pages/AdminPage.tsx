import React, { useState, useEffect, useRef } from 'react';
import { useStoreData } from '../context/StoreDataContext';
import { PRODUCTS } from '../data/catalogue';
import { useNavigation } from '../context/NavigationContext';
import {
  ShieldCheck,
  Package,
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Search,
  Lock,
  Smartphone,
  KeyRound,
  ArrowRight,
  RotateCcw,
  LogOut,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Order, CustomEnquiry } from '../types';

export const AdminPage: React.FC = () => {
  const { orders, updateOrderStatus, customEnquiries, updateEnquiryStatus } = useStoreData();
  const { navigate, openProduct } = useNavigation();

  // AUTHENTICATION STATE
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('honeywick_owner_auth') === 'true';
  });
  const [authenticatedPhone, setAuthenticatedPhone] = useState<string>(() => {
    return sessionStorage.getItem('honeywick_owner_phone') || '';
  });

  // Login flow state
  const [authStep, setAuthStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [phoneError, setPhoneError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [incomingSmsBanner, setIncomingSmsBanner] = useState<string | null>(null);

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries' | 'inventory'>('orders');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Timer for OTP resend countdown
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (authStep === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [authStep, countdown]);

  // Step 1: Send OTP to mobile
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    if (cleanPhone.length !== 10) {
      setPhoneError('Kripya valid 10-digit mobile number dalein.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Generate a realistic 4-digit OTP
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpDigits(['', '', '', '']);
      setOtpError('');
      setAuthStep('otp');
      setCountdown(30);
      setIsLoading(false);
      setIncomingSmsBanner(code);

      // Focus first OTP input on next tick
      setTimeout(() => {
        otpInputRefs[0].current?.focus();
      }, 150);
    }, 600);
  };

  // Step 2: Handle individual OTP input digits
  const handleOtpChange = (index: number, val: string) => {
    if (val && !/^\d+$/.test(val)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = val ? val.slice(-1) : '';
    setOtpDigits(newDigits);
    setOtpError('');

    // Auto-focus next input
    if (val && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    if (!generatedOtp) return;
    setOtpDigits(generatedOtp.split(''));
    setOtpError('');
  };

  // Step 3: Verify OTP & Login
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length !== 4) {
      setOtpError('Kripya 4-digit OTP enter karein.');
      return;
    }

    if (enteredCode !== generatedOtp) {
      setOtpError('Galat OTP! Kripya sahi code enter karein ya resend karein.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      sessionStorage.setItem('honeywick_owner_auth', 'true');
      sessionStorage.setItem('honeywick_owner_phone', phoneNumber);
      setIsAuthenticated(true);
      setAuthenticatedPhone(phoneNumber);
      setIsLoading(false);
      setIncomingSmsBanner(null);
    }, 500);
  };

  // Log out owner
  const handleLogout = () => {
    sessionStorage.removeItem('honeywick_owner_auth');
    sessionStorage.removeItem('honeywick_owner_phone');
    setIsAuthenticated(false);
    setAuthenticatedPhone('');
    setAuthStep('phone');
    setOtpDigits(['', '', '', '']);
    setIncomingSmsBanner(null);
  };

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'delivered').length;
  const newEnquiriesCount = customEnquiries.filter(e => e.status === 'new').length;

  const filteredOrders = orders.filter(
    ord =>
      ord.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // ==========================================
  // VIEW 1: MOBILE & OTP LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="py-14 sm:py-20 bg-cream min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-warm relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-blush rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-honey/15 rounded-full blur-2xl pointer-events-none" />

          {/* Incoming Simulated SMS Notification Toast */}
          {incomingSmsBanner && (
            <div className="mb-6 p-3.5 rounded-2xl bg-blush-light border border-rose/40 shadow-xs animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                  <span className="text-[11px] font-bold text-berry uppercase tracking-wider">
                    New SMS Alert
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-[11px] font-bold text-berry underline hover:text-berry-dark"
                >
                  Quick Fill OTP
                </button>
              </div>
              <p className="text-xs text-cocoa font-medium mt-1">
                Your Honeywick Owner verification OTP is{' '}
                <strong className="text-berry font-mono text-sm tracking-wider px-1.5 py-0.5 rounded bg-white border border-border">
                  {incomingSmsBanner}
                </strong>
                . Valid for 10 minutes.
              </p>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 rounded-full bg-blush p-2 mx-auto mb-4 border border-rose/30 flex items-center justify-center shadow-xs">
              <Lock className="w-8 h-8 text-berry" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-berry text-white mb-2 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-honey" />
              <span>Owner Portal Security</span>
            </span>

            <h1 className="font-serif text-3xl font-bold text-cocoa">
              {authStep === 'phone' ? 'Owner Login' : 'Verify Mobile OTP'}
            </h1>

            <p className="text-xs text-muted mt-1.5 max-w-xs mx-auto">
              {authStep === 'phone'
                ? 'Owner dashboard access karne ke liye apna registered mobile number enter karein.'
                : `+91 ${phoneNumber} par 4-digit verification code bheja gaya hai.`}
            </p>
          </div>

          {/* STEP 1: MOBILE NUMBER FORM */}
          {authStep === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">
                  Mobile Number *
                </label>

                <div className="flex rounded-2xl border border-border bg-cream/50 overflow-hidden focus-within:border-berry focus-within:ring-2 focus-within:ring-berry/10 transition-all">
                  <span className="px-3.5 py-3 bg-blush/40 text-cocoa text-xs sm:text-sm font-bold border-r border-border flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-berry" />
                    <span>+91</span>
                  </span>

                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    value={phoneNumber}
                    onChange={e => {
                      setPhoneNumber(e.target.value.replace(/\D/g, ''));
                      setPhoneError('');
                    }}
                    className="w-full px-3.5 py-3 text-sm bg-transparent focus:outline-none text-cocoa font-medium tracking-wide"
                    required
                  />
                </div>

                {phoneError && (
                  <p className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{phoneError}</span>
                  </p>
                )}

                <p className="text-[11px] text-muted mt-2">
                  💡 <em>Demo Owner Mobile:</em> <strong>9876543210</strong> (ya koi bhi valid 10-digit number dalein).
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Sending OTP...</span>
                ) : (
                  <>
                    <span>Send Secure OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate('shop')}
                  className="text-xs text-muted hover:text-berry underline"
                >
                  ← Return to Storefront
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION FORM */}
          {authStep === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 relative z-10">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-cocoa">
                    Enter 4-Digit OTP *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthStep('phone');
                      setIncomingSmsBanner(null);
                    }}
                    className="text-[11px] text-berry font-bold hover:underline"
                  >
                    Change Number
                  </button>
                </div>

                {/* 4 Digit Boxes */}
                <div className="grid grid-cols-4 gap-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpInputRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(idx, e)}
                      className={`w-full h-14 text-center font-mono text-2xl font-bold rounded-2xl bg-cream/60 border ${
                        otpError ? 'border-error' : 'border-border'
                      } focus:outline-none focus:border-berry focus:ring-2 focus:ring-berry/20 text-cocoa transition-all shadow-xs`}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-xs text-error mt-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{otpError}</span>
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-berry text-white font-bold text-sm tracking-wide hover:bg-berry-dark shadow-warm transition-all flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-honey" />
                    <span>Verify & Enter Dashboard</span>
                  </>
                )}
              </button>

              {/* Resend OTP Bar */}
              <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/50">
                <span>Didn't receive code?</span>
                {countdown > 0 ? (
                  <span className="font-medium text-cocoa">
                    Resend in <strong>{countdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const code = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(code);
                      setCountdown(30);
                      setIncomingSmsBanner(code);
                      setOtpDigits(['', '', '', '']);
                    }}
                    className="font-bold text-berry hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED OWNER DASHBOARD
  // ==========================================
  return (
    <div className="py-10 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header with Owner Phone Badge & Logout Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-berry text-white shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-honey" />
                <span>Honeywick Owner Dashboard</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30">
                <Smartphone className="w-3 h-3" />
                <span>Logged In: +91 {authenticatedPhone}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
              Store Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('shop')}
              className="px-4 py-2 rounded-full bg-surface hover:bg-blush text-cocoa font-semibold text-xs border border-border transition-colors"
            >
              View Storefront →
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blush text-error hover:bg-error hover:text-white font-bold text-xs border border-error/30 transition-all shadow-xs"
              title="Securely Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Real-time Metric Cards Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          <div className="bg-surface rounded-3xl border border-border p-5 sm:p-6 shadow-warm">
            <span className="text-xs text-muted font-medium block">Total Store Sales</span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-berry mt-1">
              ₹{totalRevenue}
            </div>
            <span className="text-[11px] text-success font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{orders.length} orders recorded</span>
            </span>
          </div>

          <div className="bg-surface rounded-3xl border border-border p-5 sm:p-6 shadow-warm">
            <span className="text-xs text-muted font-medium block">Active Orders</span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              {pendingOrdersCount}
            </div>
            <span className="text-[11px] text-muted flex items-center gap-1 mt-2">
              <Clock className="w-3.5 h-3.5 text-honey" />
              <span>Needs hand-pouring / dispatch</span>
            </span>
          </div>

          <div className="bg-surface rounded-3xl border border-border p-5 sm:p-6 shadow-warm">
            <span className="text-xs text-muted font-medium block">Custom Gifting Leads</span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              {customEnquiries.length}
            </div>
            <span className="text-[11px] text-rose font-medium flex items-center gap-1 mt-2">
              <Gift className="w-3.5 h-3.5" />
              <span>{newEnquiriesCount} new enquiries awaiting quote</span>
            </span>
          </div>

          <div className="bg-surface rounded-3xl border border-border p-5 sm:p-6 shadow-warm">
            <span className="text-xs text-muted font-medium block">Live Product SKUs</span>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              {PRODUCTS.length}
            </div>
            <span className="text-[11px] text-success font-medium flex items-center gap-1 mt-2">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>14 Catalogue Price Rows Active</span>
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 border-b border-border/70 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            Orders & Fulfilment ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'enquiries'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            Custom Event Enquiries ({customEnquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'inventory'
                ? 'bg-berry text-white shadow-warm'
                : 'bg-surface text-cocoa hover:bg-blush/40 border border-border'
            }`}
          >
            Products & Pricing
          </button>
        </div>

        {/* TAB 1: ORDERS & FULFILMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Search orders */}
            <div className="flex items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, customer name, email..."
                  value={orderSearch}
                  onChange={e => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-cream/40 focus:outline-none focus:border-berry text-cocoa"
                />
              </div>
              <span className="text-xs text-muted">Showing {filteredOrders.length} orders</span>
            </div>

            {/* Orders Table */}
            <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-warm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-cream/80 border-b border-border text-muted font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Items</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Payment</th>
                      <th className="py-3.5 px-4">Fulfillment Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-cream/40 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-cocoa">
                          {ord.orderNumber}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-cocoa">{ord.customer.fullName}</div>
                          <div className="text-[11px] text-muted">{ord.customer.phone}</div>
                          <div className="text-[10px] text-muted">{ord.customer.city}, {ord.customer.state}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            {ord.items.map(it => (
                              <div key={it.id} className="text-[11px] text-cocoa">
                                <strong>{it.quantity}x</strong> {it.productName} ({it.pack})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-sm text-berry">
                          ₹{ord.total}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.paymentStatus === 'paid' ? 'bg-success/15 text-success' : 'bg-honey-light text-cocoa'
                          }`}>
                            {ord.paymentStatus} ({ord.paymentMethod})
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={e => updateOrderStatus(ord.id, e.target.value as Order['orderStatus'])}
                            className="py-1 px-2.5 rounded-xl border border-border text-xs font-semibold bg-surface text-cocoa focus:outline-none focus:border-berry"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing (Pouring)</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="p-1.5 rounded-xl hover:bg-blush text-berry transition-colors"
                            title="View Invoice Modal"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM EVENT ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
              Event & Bulk Favors Inquiries
            </h2>

            <div className="space-y-4">
              {customEnquiries.map(enq => (
                <div
                  key={enq.id}
                  className="p-5 rounded-2xl bg-cream border border-border/80 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-berry bg-blush px-2 py-0.5 rounded-md">
                        {enq.id}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-cocoa">
                        {enq.name}
                      </h3>
                      <span className="text-xs text-muted">• {enq.occasion}</span>
                    </div>

                    <div className="text-xs text-muted flex flex-wrap gap-4 pt-1">
                      <span>Quantity: <strong className="text-cocoa">{enq.quantity} candles</strong></span>
                      <span>Target Date: <strong className="text-cocoa">{enq.requiredDate}</strong></span>
                      <span>Phone: <strong className="text-cocoa">{enq.phone}</strong></span>
                      <span>Email: <strong className="text-cocoa">{enq.email}</strong></span>
                    </div>

                    {enq.message && (
                      <p className="text-xs text-cocoa/80 italic bg-surface p-2.5 rounded-xl border border-border/60 mt-2">
                        “{enq.message}”
                      </p>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-3">
                    <select
                      value={enq.status}
                      onChange={e => updateEnquiryStatus(enq.id, e.target.value as CustomEnquiry['status'])}
                      className="py-1.5 px-3 rounded-xl border border-border text-xs font-semibold bg-surface text-cocoa focus:outline-none focus:border-berry"
                    >
                      <option value="new">New Enquiry</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="quoted">Quote Shared</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="bg-surface rounded-3xl border border-border p-6 shadow-warm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cocoa border-b border-border/60 pb-3">
              Approved Catalogue Pricing Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map(prod => (
                <div key={prod.id} className="p-4 rounded-2xl bg-cream border border-border space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover bg-surface border border-border" />
                    <div>
                      <h4 className="font-serif text-xl font-bold text-cocoa">{prod.name}</h4>
                      <span className="text-xs text-muted">{prod.categoryLabel}</span>
                      <div className="font-bold text-berry text-sm mt-0.5">
                        Base: ₹{prod.basePrice}
                      </div>
                    </div>
                  </div>

                  {/* Variant prices */}
                  <div className="text-[11px] space-y-1 bg-surface p-2.5 rounded-xl border border-border/60">
                    <span className="font-bold text-cocoa block mb-1">Approved Price Rows:</span>
                    {prod.variants.map((v, i) => (
                      <div key={i} className="flex justify-between text-muted">
                        <span>{v.pack} • {v.fragranceMode.replace('_', ' ')}</span>
                        <span className="font-bold text-cocoa">₹{v.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openProduct(prod.slug)}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-surface hover:bg-blush text-cocoa border border-border transition-colors"
                  >
                    View Product Page →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invoice Modal Preview when Eye icon clicked */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa/50 backdrop-blur-sm">
            <div className="bg-surface rounded-3xl border border-border max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-start border-b border-border/60 pb-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cocoa">Order {selectedOrder.orderNumber}</h3>
                  <p className="text-xs text-muted">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-full text-muted hover:text-cocoa font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-muted space-y-1">
                <div>Customer: <strong className="text-cocoa">{selectedOrder.customer.fullName}</strong></div>
                <div>Phone: <strong className="text-cocoa">{selectedOrder.customer.phone}</strong></div>
                <div>Address: {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.pincode}</div>
              </div>

              <div className="border-t border-border/60 pt-3 space-y-2">
                <span className="font-bold text-xs text-cocoa block">Ordered Candles:</span>
                {selectedOrder.items.map(it => (
                  <div key={it.id} className="flex justify-between text-xs">
                    <span>{it.quantity}x {it.productName} ({it.pack}) - {it.color.name}</span>
                    <span className="font-bold text-cocoa">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-3 flex justify-between font-bold text-sm text-cocoa">
                <span>Total Paid:</span>
                <span className="text-berry font-serif text-xl">₹{selectedOrder.total}</span>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 rounded-xl bg-cocoa text-cream text-xs font-bold hover:bg-berry"
              >
                Close Receipt
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
