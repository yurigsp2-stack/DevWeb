import { Zap, ArrowDown } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden retro-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-retro-darker via-retro-dark/80 to-retro-darker" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-retro-cyan/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-retro-magenta/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-retro-cyan/40 bg-retro-cyan/10 text-retro-cyan text-xs font-medium tracking-wider animate-glow-pulse">
          <Zap className="w-3.5 h-3.5" fill="currentColor" />
          STREETWEAR GEEK RETRÔ
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-tight mb-6">
          <span className="text-retro-cyan text-glow-cyan block mb-2">NEON</span>
          <span className="text-retro-magenta text-glow-magenta block mb-2">GEEK</span>
          <span className="text-retro-yellow text-glow-yellow text-lg sm:text-2xl block">SHOP</span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Camisetas e acessórios com a vibe retrô dos anos 80/90. Estampas exclusivas,
          cores vibrantes e atitude streetwear para verdadeiros geeks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onShopNow}
            className="px-8 py-3.5 bg-retro-cyan text-retro-darker font-bold rounded-lg hover:scale-105 transition-transform box-glow-cyan uppercase tracking-wide text-sm"
          >
            Ver Produtos
          </button>
          <button
            onClick={() => document.getElementById('buy1get2')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 border-2 border-retro-magenta text-retro-magenta font-bold rounded-lg hover:bg-retro-magenta hover:text-retro-darker transition-all uppercase tracking-wide text-sm"
          >
            Compre 1 Leve 2
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-retro-cyan/60" />
        </div>
      </div>
    </section>
  );
}
