import ProductCard from '@/components/ProductCard';
import { Gift, Zap } from 'lucide-react';
import type { Product } from '@/types';

interface Buy1Get2Props {
  products: Product[];
}

export default function Buy1Get2({ products }: Buy1Get2Props) {
  const promoProducts = products.filter((p) => p.is_buy1get2);

  return (
    <section id="buy1get2" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-retro-magenta/10 via-retro-yellow/5 to-retro-cyan/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-retro-yellow/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-retro-yellow/15 border border-retro-yellow/40 text-retro-yellow text-sm font-bold tracking-wider">
            <Gift className="w-4 h-4" fill="currentColor" />
            PROMOÇÃO ATIVA
          </div>
          <h2 className="font-display text-2xl sm:text-4xl text-retro-yellow text-glow-yellow mb-4">
            COMPRE 1 LEVE 2
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto text-sm sm:text-base">
            Escolha qualquer camiseta marcada com <span className="text-retro-yellow font-bold">1+1</span> e leve
            duas unidades pelo preço de uma. Promoção por tempo limitado!
          </p>
          <div className="inline-flex items-center gap-2 mt-4 text-retro-magenta animate-glow-pulse">
            <Zap className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-medium">Oferta válida enquanto durar o estoque</span>
          </div>
        </div>

        {promoProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Nenhum produto em promoção no momento.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
