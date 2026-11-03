import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';
import { StoreDataProvider } from './context/StoreDataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { CustomGiftingPage } from './pages/CustomGiftingPage';
import { CandleCarePage } from './pages/CandleCarePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'custom-gifting':
        return <CustomGiftingPage />;
      case 'candle-care':
        return <CandleCarePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'policies':
        return <PoliciesPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream text-cocoa antialiased selection:bg-blush selection:text-berry">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Page Viewport */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Slide-Over Shopping Bag */}
      <CartDrawer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <StoreDataProvider>
      <CartProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </CartProvider>
    </StoreDataProvider>
  );
}

export default App;
