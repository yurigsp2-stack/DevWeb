import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Início', section: 'hero' },
    { label: 'Produtos', section: 'produtos' },
    { label: 'Compre 1 Leve 2', section: 'buy1get2' },
    { label: 'Lançamentos', section: 'lancamentos' },
  ];

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-retro-darker/95 backdrop-blur-md border-b border-retro-cyan/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-retro-cyan text-glow-cyan group-hover:scale-110 transition-transform" fill="currentColor" />
            </div>
            <span className="font-display text-sm sm:text-lg text-retro-cyan text-glow-cyan tracking-wider">
              NEON<span className="text-retro-magenta text-glow-magenta">GEEK</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNav(item.section)}
                className="text-sm font-medium text-gray-300 hover:text-retro-cyan transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-retro-cyan group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-300 hover:text-retro-cyan transition-colors group"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-retro-magenta text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center box-glow-magenta">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-retro-cyan transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2 animate-slide-in">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNav(item.section)}
                className="text-left px-4 py-2 text-gray-300 hover:text-retro-cyan hover:bg-retro-cyan/5 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
