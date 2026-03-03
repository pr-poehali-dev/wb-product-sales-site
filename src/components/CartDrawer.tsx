import Icon from "@/components/ui/icon";

export type CartItem = { id: number; name: string; price: number; qty: number };

interface CartDrawerProps {
  cart: CartItem[];
  cartOpen: boolean;
  orderOpen: boolean;
  orderDone: boolean;
  totalItems: number;
  totalPrice: number;
  form: { name: string; phone: string; address: string };
  onCartClose: () => void;
  onOrderOpen: () => void;
  onOrderClose: () => void;
  onOrderSubmit: () => void;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onFormChange: (form: { name: string; phone: string; address: string }) => void;
}

export default function CartDrawer({
  cart, cartOpen, orderOpen, orderDone,
  totalItems, totalPrice, form,
  onCartClose, onOrderOpen, onOrderClose, onOrderSubmit,
  onRemove, onUpdateQty, onFormChange,
}: CartDrawerProps) {
  return (
    <>
      {/* КОРЗИНА */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCartClose} />
          <div className="relative ml-auto w-full max-w-md bg-[#0F0F1A] border-l border-white/10 flex flex-col h-full" style={{ animation: "slide-in 0.3s ease-out" }}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display font-bold text-xl text-white">КОРЗИНА</h2>
              <button onClick={onCartClose} className="text-white/50 hover:text-white transition-colors">
                <Icon name="X" size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="text-6xl">🛒</div>
                <p className="text-white/50">Корзина пуста</p>
                <button onClick={onCartClose} className="bg-[#FF2D78] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF2D78]/80 transition-all">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-[#16162A] rounded-xl p-4 flex gap-4 items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm leading-snug truncate">{item.name}</p>
                        <p className="text-[#FF2D78] font-bold mt-1">{item.price.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-white font-bold w-6 text-center">{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                          <Icon name="Plus" size={14} />
                        </button>
                        <button onClick={() => onRemove(item.id)} className="w-8 h-8 rounded-lg text-white/30 hover:text-[#FF2D78] ml-1 flex items-center justify-center">
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Итого:</span>
                    <span className="font-display font-black text-2xl text-gradient-warm">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <button
                    onClick={onOrderOpen}
                    className="w-full bg-[#FF2D78] text-white py-4 rounded-xl font-display font-bold tracking-wide hover:bg-[#FF2D78]/80 transition-all glow-pink"
                  >
                    ОФОРМИТЬ ЗАКАЗ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ФОРМА ЗАКАЗА */}
      {orderOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onOrderClose} />
          <div className="relative bg-[#0F0F1A] border border-white/10 rounded-3xl w-full max-w-md p-8 animate-fade-in">
            {orderDone ? (
              <div className="text-center space-y-4 py-8">
                <div className="text-6xl animate-float">🎉</div>
                <h3 className="font-display font-bold text-2xl text-white">Заказ принят!</h3>
                <p className="text-white/50">Мы свяжемся с вами в ближайшее время для подтверждения</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display font-bold text-xl text-white">ОФОРМЛЕНИЕ ЗАКАЗА</h2>
                  <button onClick={onOrderClose} className="text-white/50 hover:text-white">
                    <Icon name="X" size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => onFormChange({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D78] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => onFormChange({ ...form, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D78] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Адрес доставки</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => onFormChange({ ...form, address: e.target.value })}
                      placeholder="Город, улица, дом"
                      className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D78] transition-colors"
                    />
                  </div>
                  <div className="bg-[#16162A] rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between text-white/60 text-sm mb-2">
                      <span>Товаров в корзине:</span>
                      <span>{totalItems} шт.</span>
                    </div>
                    <div className="flex justify-between text-white font-bold">
                      <span>Сумма заказа:</span>
                      <span className="text-gradient-warm">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                  </div>
                  <button
                    onClick={onOrderSubmit}
                    disabled={!form.name || !form.phone}
                    className="w-full bg-[#FF2D78] text-white py-4 rounded-xl font-display font-bold tracking-wide hover:bg-[#FF2D78]/80 transition-all glow-pink disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ПОДТВЕРДИТЬ ЗАКАЗ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
