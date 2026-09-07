import { ShoppingBag, Sparkles } from 'lucide-react';
import type { Product } from '@/types';
import { formatBRL } from '@/lib/format';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product);
  };

  return (
    <div className="group relative bg-retro-dark rounded-xl overflow-hidden border border-gray-800 hover:border-retro-cyan/50 transition-all duration-300 hover:box-glow-cyan hover:-translate-y-1">
      {product.is_new_release && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-retro-magenta text-white text-xs font-bold rounded-full flex items-center gap-1 box-glow-magenta">
          <Sparkles className="w-3 h-3" fill="currentColor" />
          NOVO
        </div>
      )}
      {product.is_buy1get2 && (
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-retro-yellow text-retro-darker text-xs font-bold rounded-full">
          1+1
        </div>
      )}

      <div className="relative aspect-[3/4] overflow-hidden bg-retro-darker">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-retro-darker via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-retro-cyan/0 group-hover:bg-retro-cyan/5 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <span className="text-xs text-retro-cyan uppercase tracking-wider font-medium">
          {product.category}
        </span>
        <h3 className="text-white font-semibold mt-1 mb-1 line-clamp-1 group-hover:text-retro-cyan transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-retro-yellow font-bold text-lg text-glow-yellow">
            {formatBRL(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className="p-2.5 bg-retro-cyan/10 text-retro-cyan rounded-lg hover:bg-retro-cyan hover:text-retro-darker transition-all hover:scale-110 active:scale-95"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
