import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  const [filter, setFilter] = useState<string>('todos');

  const categories = ['todos', 'camisetas', 'acessorios', 'bones'];

  const filtered = useMemo(() => {
    if (filter === 'todos') return products;
    return products.filter((p) => p.category === filter);
  }, [products, filter]);

  const categoryLabels: Record<string, string> = {
    todos: 'Todos',
    camisetas: 'Camisetas',
    acessorios: 'Acessórios',
    bones: 'Bonés',
  };

  return (
    <section id="produtos" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl sm:text-3xl text-retro-cyan text-glow-cyan mb-3">
          PRODUTOS
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-retro-cyan to-retro-magenta mx-auto rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all uppercase tracking-wide ${
              filter === cat
                ? 'bg-retro-cyan text-retro-darker box-glow-cyan'
                : 'bg-retro-dark text-gray-400 border border-gray-700 hover:border-retro-cyan/50 hover:text-retro-cyan'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-retro-dark rounded-xl animate-pulse border border-gray-800"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
