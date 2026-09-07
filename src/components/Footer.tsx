import { Zap, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-retro-darker border-t border-retro-cyan/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-retro-cyan text-glow-cyan" fill="currentColor" />
              <span className="font-display text-sm text-retro-cyan text-glow-cyan tracking-wider">
                NEON<span className="text-retro-magenta text-glow-magenta">GEEK</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Streetwear geek com vibe retrô dos anos 80/90. Estampas exclusivas e atitude.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Loja</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Camisetas</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Acessórios</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Bonés</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Lançamentos</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Ajuda</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Trocas e Devoluções</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Prazos de Entrega</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Tabela de Medidas</button></li>
              <li><button className="text-gray-400 hover:text-retro-cyan transition-colors">Contato</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Siga-nos</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-lg bg-retro-dark border border-gray-700 flex items-center justify-center text-gray-400 hover:text-retro-cyan hover:border-retro-cyan/50 transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-retro-dark border border-gray-700 flex items-center justify-center text-gray-400 hover:text-retro-cyan hover:border-retro-cyan/50 transition-all" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-retro-dark border border-gray-700 flex items-center justify-center text-gray-400 hover:text-retro-cyan hover:border-retro-cyan/50 transition-all" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            NEON GEEK © 2026 — Feito com atitude retrô
          </p>
        </div>
      </div>
    </footer>
  );
}
