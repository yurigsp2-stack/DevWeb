import { useState, useEffect, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Buy1Get2 from '@/components/Buy1Get2';
import NewReleases from '@/components/NewReleases';
import DiscountPopup from '@/components/DiscountPopup';
import CartDrawer from '@/components/CartDrawer';
import Checkout from '@/components/Checkout';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

type View = 'home' | 'checkout';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        setLoading(false);
        return;
      }

      setProducts(data ?? []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleNavigate = useCallback((section: string) => {
    setView('home');
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleShopNow = useCallback(() => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCheckout = useCallback(() => {
    setView('checkout');
    window.scrollTo({ top: 0 });
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-retro-darker">
        {view === 'home' ? (
          <>
            <Header onNavigate={handleNavigate} />
            <Hero onShopNow={handleShopNow} />
            <ProductGrid products={products} loading={loading} />
            <Buy1Get2 products={products} />
            <NewReleases products={products} />
            <Footer />
            <DiscountPopup />
          </>
        ) : (
          <>
            <Header onNavigate={handleBackToHome} />
            <Checkout onBack={handleBackToHome} />
          </>
        )}
        <CartDrawer onCheckout={handleCheckout} />
      </div>
    </CartProvider>
  );
}
