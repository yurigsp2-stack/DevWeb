import ProductCard from '@/components/ProductCard';
import { Rocket } from 'lucide-react';
import type { Product } from '@/types';

interface NewReleasesProps {
  products: Product[];
}

export default function NewReleases({ products }: NewReleasesProps) {
  const newProducts = products.filter((p) => p.is_new_release);

  return (
    <section id="lancamentos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-retro-magenta/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-retro-magenta/15 border border-retro-magenta/40 text-retro-magenta text-sm font-bold tracking-wider">
            <Rocket className="w-4 h-4" />
            RECENTEMENTE CHEGADOS
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-retro-magenta text-glow-magenta mb-3">
            LANÇAMENTOS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-retro-magenta to-retro-cyan mx-auto rounded-full" />
        </div>

        {newProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Nenhum lançamento no momento.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
