import { useState, useEffect } from 'react';
import { X, Gift, Copy, Check } from 'lucide-react';

const STORAGE_KEY = 'neongeek_popup_seen';

export default function DiscountPopup() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const couponCode = 'NEON10';

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-retro-darker/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-retro-dark border-2 border-retro-cyan rounded-2xl p-6 sm:p-8 max-w-md w-full box-glow-cyan animate-slide-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-retro-cyan transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-retro-cyan/15 text-retro-cyan animate-float">
            <Gift className="w-8 h-8" fill="currentColor" />
          </div>

          <h3 className="font-display text-lg sm:text-xl text-retro-cyan text-glow-cyan mb-3">
            BEM-VINDO!
          </h3>
          <p className="text-gray-300 text-sm sm:text-base mb-6">
            Novo por aqui? Ganhe <span className="text-retro-yellow font-bold">10% de desconto</span> na
            sua primeira compra. Use o cupom abaixo no checkout!
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-6 py-3 bg-retro-darker border-2 border-dashed border-retro-yellow rounded-lg">
              <span className="font-display text-lg text-retro-yellow text-glow-yellow tracking-wider">
                {couponCode}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="p-3 bg-retro-yellow/10 text-retro-yellow rounded-lg hover:bg-retro-yellow hover:text-retro-darker transition-all border border-retro-yellow/40"
              aria-label="Copiar cupom"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {copied && (
            <p className="text-retro-cyan text-sm mb-4 animate-glow-pulse">
              Cupom copiado! Cole no checkout.
            </p>
          )}

          <button
            onClick={handleClose}
            className="w-full py-3 bg-retro-cyan text-retro-darker font-bold rounded-lg hover:scale-105 transition-transform uppercase tracking-wide text-sm"
          >
            Começar a Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
