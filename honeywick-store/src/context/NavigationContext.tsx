import React, { createContext, useContext, useEffect, useState } from 'react';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'custom-gifting'
  | 'candle-care'
  | 'about'
  | 'contact'
  | 'policies'
  | 'admin';

interface NavigationContextType {
  currentPage: PageRoute;
  currentParam: string | null;
  navigate: (page: PageRoute, param?: string | null) => void;
  openProduct: (slug: string) => void;
  openCategory: (catId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentParam, setCurrentParam] = useState<string | null>(null);

  // Sync with browser hash for bookmarks and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash) {
        setCurrentPage('home');
        setCurrentParam(null);
        return;
      }

      const parts = hash.split('/');
      const page = parts[0] as PageRoute;
      const param = parts[1] || null;

      const validPages: PageRoute[] = [
        'home',
        'shop',
        'product',
        'cart',
        'checkout',
        'order-confirmation',
        'custom-gifting',
        'candle-care',
        'about',
        'contact',
        'policies',
        'admin',
      ];

      if (validPages.includes(page)) {
        setCurrentPage(page);
        setCurrentParam(param);
      } else {
        setCurrentPage('home');
        setCurrentParam(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageRoute, param: string | null = null) => {
    setCurrentPage(page);
    setCurrentParam(param);
    const hash = param ? `#/${page}/${param}` : `#/${page}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProduct = (slug: string) => {
    navigate('product', slug);
  };

  const openCategory = (catId: string) => {
    navigate('shop', catId);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        currentParam,
        navigate,
        openProduct,
        openCategory,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
