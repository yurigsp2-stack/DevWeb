import { useState } from 'react';
import { ArrowLeft, CreditCard, Check, Loader2, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatBRL } from '@/lib/format';
import { supabase } from '@/lib/supabase';
import type { OrderPayload } from '@/types';

interface CheckoutProps {
  onBack: () => void;
}

export default function Checkout({ onBack }: CheckoutProps) {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [form, setForm] = useState({
    customer_name: '',
    email: '',
    cep: '',
    address: '',
    city: '',
    state: '',
  });

  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 200 ? 0 : 19.9;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'NEON10') {
      setCouponApplied(true);
      setError(null);
    } else {
      setCouponApplied(false);
      setError('Cupom inválido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setError(null);

    const payload: OrderPayload = {
      ...form,
      items: items.map((item) => ({
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total,
    };

    const { error: insertError } = await supabase.from('orders').insert(payload);

    if (insertError) {
      setError('Não foi possível finalizar seu pedido. Tente novamente.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-retro-darker">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-retro-cyan/15 text-retro-cyan animate-glow-pulse">
            <Check className="w-10 h-10" strokeWidth={3} />
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-retro-cyan text-glow-cyan mb-4">
            PEDIDO CONFIRMADO!
          </h2>
          <p className="text-gray-300 mb-6">
            Obrigado pela compra! Você receberá um e-mail de confirmação em instantes
            com os detalhes do seu pedido.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-retro-cyan text-retro-darker font-bold rounded-lg hover:scale-105 transition-transform uppercase tracking-wide text-sm"
          >
            Voltar à Loja
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-retro-darker">
        <div className="text-center max-w-md">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-white text-xl font-semibold mb-2">Carrinho vazio</h2>
          <p className="text-gray-400 mb-6">Adicione produtos antes de finalizar a compra.</p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-retro-cyan text-retro-darker font-bold rounded-lg hover:scale-105 transition-transform uppercase tracking-wide text-sm"
          >
            Ver Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-retro-darker pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-retro-cyan transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Continuar Comprando
        </button>

        <h1 className="font-display text-xl sm:text-2xl text-retro-cyan text-glow-cyan mb-8">
          CHECKOUT
        </h1>

        <div className="grid lg:grid-cols-5 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="bg-retro-dark rounded-xl p-5 border border-gray-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-retro-cyan" />
                Dados de Entrega
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1.5">Nome completo</label>
                  <input
                    required
                    type="text"
                    value={form.customer_name}
                    onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1.5">E-mail</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">CEP</label>
                  <input
                    required
                    type="text"
                    value={form.cep}
                    onChange={(e) => setForm({ ...form, cep: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="00000-000"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">Cidade</label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="Sua cidade"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1.5">Endereço</label>
                  <input
                    required
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1.5">Estado</label>
                  <input
                    required
                    type="text"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                    placeholder="UF"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>

            <div className="bg-retro-dark rounded-xl p-5 border border-gray-800">
              <h3 className="text-white font-semibold mb-4">Cupom de Desconto</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 bg-retro-darker border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-retro-cyan focus:outline-none transition-colors"
                  placeholder="Digite seu cupom"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2.5 bg-retro-yellow/10 text-retro-yellow border border-retro-yellow/40 rounded-lg hover:bg-retro-yellow hover:text-retro-darker transition-all font-medium text-sm"
                >
                  Aplicar
                </button>
              </div>
              {couponApplied && (
                <p className="text-retro-cyan text-sm mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Cupom aplicado: 10% de desconto!
                </p>
              )}
              {error && !couponApplied && (
                <p className="text-retro-magenta text-sm mt-2">{error}</p>
              )}
            </div>

            {error && (
              <p className="text-retro-magenta text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-retro-cyan text-retro-darker font-bold rounded-lg hover:scale-[1.02] transition-transform box-glow-cyan uppercase tracking-wide text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Finalizar Pedido - {formatBRL(total)}
                </>
              )}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="bg-retro-dark rounded-xl p-5 border border-gray-800 sticky top-24">
              <h3 className="text-white font-semibold mb-4">Resumo do Pedido</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto scrollbar-thin">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-400 text-xs">Qtd: {item.quantity}</p>
                    </div>
                    <span className="text-retro-yellow text-sm font-medium">
                      {formatBRL(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatBRL(subtotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Desconto (10%)</span>
                    <span className="text-retro-cyan">-{formatBRL(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Frete</span>
                  <span className="text-white">
                    {shipping === 0 ? 'Grátis' : formatBRL(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-retro-yellow font-bold text-lg text-glow-yellow">
                    {formatBRL(total)}
                  </span>
                </div>
              </div>

              {subtotal < 200 && (
                <p className="text-gray-500 text-xs mt-3 text-center">
                  Frete grátis acima de {formatBRL(200)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
