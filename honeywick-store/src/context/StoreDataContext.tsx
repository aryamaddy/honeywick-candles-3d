import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order, CustomEnquiry } from '../types';

interface StoreDataContextType {
  orders: Order[];
  customEnquiries: CustomEnquiry[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  addCustomEnquiry: (enquiry: Omit<CustomEnquiry, 'id' | 'createdAt' | 'status'>) => string;
  updateEnquiryStatus: (enquiryId: string, status: CustomEnquiry['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'honeywick_orders_v1';
const ENQUIRIES_STORAGE_KEY = 'honeywick_enquiries_v1';

// Initial demo orders for realism in Admin dashboard
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'HW-7821',
    orderNumber: 'HW-7821',
    customer: {
      fullName: 'Aarohi Sharma',
      email: 'aarohi.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Flat 402, Lotus Greens, Sector 78',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
    },
    items: [
      {
        id: 'delulu-Single-with_fragrance-vanilla-cream',
        productId: 'delulu',
        productName: 'DELULU',
        slug: 'delulu',
        image: '/images/products/delulu-hero-lit.jpeg',
        pack: 'Single',
        fragranceMode: 'with_fragrance',
        fragranceName: 'Warm Vanilla',
        color: { id: 'cream', name: 'Natural Soy Cream', hex: '#FFF8F0' },
        unitPrice: 249,
        quantity: 1,
      },
      {
        id: 'bloom-baby-Single-with_fragrance-english-rose-lilac',
        productId: 'bloom-baby',
        productName: 'BLOOM BABY',
        slug: 'bloom-baby',
        image: '/images/products/bloom-baby-duo.jpeg',
        pack: 'Single',
        fragranceMode: 'with_fragrance',
        fragranceName: 'English Rose',
        color: { id: 'lilac-violet', name: 'Wild Lilac', hex: '#B892FF' },
        unitPrice: 119,
        quantity: 2,
      },
    ],
    subtotal: 487,
    shipping: 60,
    discount: 48,
    total: 499,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    createdAt: '2026-11-01T14:20:00Z',
  },
  {
    id: 'HW-7822',
    orderNumber: 'HW-7822',
    customer: {
      fullName: 'Vikram Malhotra',
      email: 'v.malhotra@gmail.com',
      phone: '+91 98111 22334',
      address: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
    },
    items: [
      {
        id: 'golu-glow-Set of 2-ladoo-ladoo-orange',
        productId: 'golu-glow',
        productName: 'GOLU GLOW',
        slug: 'golu-glow',
        image: '/images/products/golu-glow-thali.jpeg',
        pack: 'Set of 2',
        fragranceMode: 'ladoo',
        fragranceName: 'Motichoor Ladoo',
        color: { id: 'tangy-orange', name: 'Kesari Ladoo Orange', hex: '#FF7F11' },
        unitPrice: 119,
        quantity: 3,
      },
    ],
    subtotal: 357,
    shipping: 60,
    discount: 0,
    total: 417,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    createdAt: '2026-11-02T09:45:00Z',
  },
];

const INITIAL_DEMO_ENQUIRIES: CustomEnquiry[] = [
  {
    id: 'ENQ-901',
    name: 'Bushra Khan & Sushrita',
    email: 'bushra.events@gmail.com',
    phone: '+91 99887 76655',
    occasion: 'Wedding Party Favors',
    quantity: 120,
    requiredDate: '2026-12-15',
    message: 'We loved the custom B&S jar candles! We need 120 jar candles with our initials monogram and warm vanilla scent for table return gifts.',
    status: 'quoted',
    createdAt: '2026-10-31T11:00:00Z',
  },
  {
    id: 'ENQ-902',
    name: 'Pooja Hegde',
    email: 'pooja.h@yahoo.com',
    phone: '+91 97654 32109',
    occasion: 'Baby Shower Keepsake',
    quantity: 45,
    requiredDate: '2026-11-28',
    message: 'Looking for pastel pink and blue bubble cube candles with custom baby shower stickers. Can we get individual kraft gift box packaging with ribbons?',
    status: 'new',
    createdAt: '2026-11-02T16:15:00Z',
  },
];

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch {
      return INITIAL_DEMO_ORDERS;
    }
  });

  const [customEnquiries, setCustomEnquiries] = useState<CustomEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ENQUIRIES;
    } catch {
      return INITIAL_DEMO_ENQUIRIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(customEnquiries));
    } catch {
      // ignore
    }
  }, [customEnquiries]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
  };

  const addCustomEnquiry = (enquiryData: Omit<CustomEnquiry, 'id' | 'createdAt' | 'status'>): string => {
    const id = `ENQ-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: CustomEnquiry = {
      ...enquiryData,
      id,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setCustomEnquiries(prev => [newEnquiry, ...prev]);
    return id;
  };

  const updateEnquiryStatus = (enquiryId: string, status: CustomEnquiry['status']) => {
    setCustomEnquiries(prev =>
      prev.map(enq => (enq.id === enquiryId ? { ...enq, status } : enq))
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(ord => ord.id === orderId || ord.orderNumber === orderId);
  };

  return (
    <StoreDataContext.Provider
      value={{
        orders,
        customEnquiries,
        addOrder,
        updateOrderStatus,
        addCustomEnquiry,
        updateEnquiryStatus,
        getOrderById,
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
