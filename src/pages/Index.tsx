import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/97d1235e-20e3-403f-b7d3-c40dcd2b4077.jpg";
const DELIVERY_IMG = "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/4b8c74b3-1bd5-476a-bb65-35264edc9380.jpg";

const products = [
  { id: 1, name: "Умный браслет FitPro X7", price: 2490, oldPrice: 3990, category: "Гаджеты", rating: 4.8, reviews: 312, badge: "ХИТ", img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
  { id: 2, name: "Беспроводные наушники AirPod Pro", price: 1890, oldPrice: 2990, category: "Гаджеты", rating: 4.7, reviews: 204, badge: "СКИДКА", img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
  { id: 3, name: "Портативная колонка SoundBoom", price: 3490, oldPrice: null, category: "Гаджеты", rating: 4.9, reviews: 89, badge: "НОВИНКА", img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
  { id: 4, name: "Магнитный держатель для телефона", price: 590, oldPrice: 990, category: "Аксессуары", rating: 4.6, reviews: 541, badge: "СКИДКА", img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
  { id: 5, name: "Силиконовый чехол Premium", price: 490, oldPrice: null, category: "Аксессуары", rating: 4.5, reviews: 178, badge: null, img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
  { id: 6, name: "LED Лента с пультом 5м", price: 890, oldPrice: 1490, category: "Освещение", rating: 4.8, reviews: 633, badge: "ХИТ", img: "https://cdn.poehali.dev/projects/2a16e15c-8fa7-4756-9a73-6b11d5acf5cd/files/70989c21-7dc4-4df8-9c89-5326eb992ee4.jpg" },
];

const reviews = [
  { name: "Анна К.", text: "Заказала наушники — пришли быстро, упаковка супер! Качество отличное, рекомендую всем.", rating: 5, date: "15 фев" },
  { name: "Михаил Р.", text: "Браслет работает отлично, всё как описано. Доставка за 3 дня, буду заказывать ещё.", rating: 5, date: "10 фев" },
  { name: "Светлана Т.", text: "LED лента просто огонь! Красиво подсвечивает комнату, управление удобное.", rating: 4, date: "7 фев" },
  { name: "Дмитрий В.", text: "Держатель для телефона — мегаудобная вещь. Держит крепко, не падает.", rating: 5, date: "3 фев" },
];

type CartItem = { id: number; name: string; price: number; qty: number };

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [activeSection, setActiveSection] = useState("catalog");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const handleOrder = () => {
    setOrderDone(true);
    setCart([]);
    setTimeout(() => { setOrderDone(false); setOrderOpen(false); setCartOpen(false); }, 3000);
  };

  const navItems = [
    { id: "catalog", label: "Каталог" },
    { id: "delivery", label: "Доставка" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О магазине" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#080810] font-body relative overflow-x-hidden">

      {/* Декоративные фоновые блобы */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#FF2D78]/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#00D4FF]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-[#A855F7]/10 blur-[100px]" />
      </div>

      {/* НАВИГАЦИЯ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display font-black text-xl tracking-tight text-gradient">
            NOVA SHOP
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[#FF2D78]/20 text-[#FF2D78]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#FF2D78] text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:bg-[#FF2D78]/80 glow-pink"
          >
            <Icon name="ShoppingCart" size={18} />
            <span className="hidden sm:inline">Корзина</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#00D4FF] text-[#080810] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080810] via-[#080810]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FF2D78]/10 border border-[#FF2D78]/30 text-[#FF2D78] px-4 py-2 rounded-full text-sm font-semibold animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-pulse" />
              Доставка по всей России
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black leading-none tracking-tight">
              <span className="text-white block">СТИЛЬ</span>
              <span className="text-gradient block">КАЖДЫЙ</span>
              <span className="text-white block">ДЕНЬ</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md leading-relaxed">
              Топовые гаджеты и аксессуары по лучшим ценам. Только оригинальные товары с гарантией.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-[#FF2D78] text-white px-8 py-4 rounded-2xl font-display font-bold text-sm tracking-wide hover:bg-[#FF2D78]/80 transition-all glow-pink animate-pulse-glow"
              >
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <button
                onClick={() => scrollTo("delivery")}
                className="bg-glass text-white px-8 py-4 rounded-2xl font-display font-bold text-sm tracking-wide hover:bg-white/10 transition-all border border-white/10"
              >
                УСЛОВИЯ ДОСТАВКИ
              </button>
            </div>
            <div className="flex gap-8 pt-4">
              {[["1000+", "Довольных клиентов"], ["3 дня", "Средняя доставка"], ["100%", "Оригинальные товары"]].map(([val, label]) => (
                <div key={val}>
                  <div className="font-display font-black text-2xl text-gradient-warm">{val}</div>
                  <div className="text-white/40 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex justify-center animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D78]/30 to-[#00D4FF]/30 rounded-3xl blur-2xl scale-110" />
              <img src={HERO_IMG} alt="Products" className="relative rounded-3xl w-full max-w-md object-cover aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="border-y border-white/10 bg-[#FF2D78]/5 overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-4 text-white/40 text-sm font-semibold tracking-widest uppercase">
              <span className="text-[#FF2D78]">★</span> Быстрая доставка
              <span className="text-[#00D4FF]">★</span> Гарантия качества
              <span className="text-[#A855F7]">★</span> Лучшие цены
              <span className="text-[#00FF88]">★</span> Оригинальные товары
            </span>
          ))}
        </div>
      </div>

      {/* КАТАЛОГ */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="font-display text-xs tracking-[0.3em] text-[#FF2D78] uppercase mb-4">— Наши товары —</div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">КАТАЛОГ</h2>
          <p className="text-white/50 max-w-md mx-auto">Отборные товары с быстрой доставкой и гарантией</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="group bg-[#16162A] rounded-2xl overflow-hidden border border-white/5 card-hover"
              style={{ animation: `fade-in 0.6s ease-out ${idx * 0.08}s both` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16162A]/80 to-transparent" />
                {product.badge && (
                  <span className={`absolute top-3 left-3 text-xs font-black px-3 py-1 rounded-full ${
                    product.badge === "ХИТ" ? "bg-[#FF2D78] text-white" :
                    product.badge === "НОВИНКА" ? "bg-[#00D4FF] text-[#080810]" :
                    "bg-[#00FF88] text-[#080810]"
                  }`}>
                    {product.badge}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="absolute top-3 right-3 bg-[#0F0F1A]/80 text-white/50 text-xs px-2 py-1 rounded-lg line-through">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-white/40 text-xs mb-1 uppercase tracking-wider">{product.category}</div>
                  <h3 className="text-white font-semibold text-base leading-snug">{product.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-white/20"}>★</span>
                    ))}
                  </div>
                  <span className="text-white/40 text-xs">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-2xl text-gradient-warm">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#FF2D78] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#FF2D78]/80 transition-all flex items-center gap-2"
                  >
                    <Icon name="Plus" size={16} />
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ДОСТАВКА */}
      <section id="delivery" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="font-display text-xs tracking-[0.3em] text-[#00D4FF] uppercase mb-4">— Как это работает —</div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">ДОСТАВКА</h2>
            <p className="text-white/50 max-w-md mx-auto">Быстро, надёжно, до вашей двери</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              {[
                { icon: "Truck", color: "#FF2D78", bg: "rgba(255,45,120,0.1)", title: "Доставка по России", desc: "Работаем с СДЭК, Почтой России и курьерскими службами. Доставка 3–7 дней." },
                { icon: "Zap", color: "#00D4FF", bg: "rgba(0,212,255,0.1)", title: "Экспресс-доставка", desc: "Срочная доставка за 1–2 дня в крупных городах. Следите за заказом онлайн." },
                { icon: "Package", color: "#A855F7", bg: "rgba(168,85,247,0.1)", title: "Надёжная упаковка", desc: "Каждый товар упакован с защитой от повреждений. Хрупкие товары в двойной упаковке." },
                { icon: "RotateCcw", color: "#00FF88", bg: "rgba(0,255,136,0.1)", title: "Возврат 14 дней", desc: "Не понравился товар? Вернём деньги без лишних вопросов в течение 14 дней." },
              ].map(item => (
                <div key={item.title} className="bg-glass rounded-2xl p-5 flex gap-5 items-start hover:border-white/20 transition-all border border-white/5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg, color: item.color }}>
                    <Icon name={item.icon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#A855F7]/20 rounded-3xl blur-3xl" />
              <img src={DELIVERY_IMG} alt="Доставка" className="relative rounded-3xl w-full object-cover aspect-square animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="font-display text-xs tracking-[0.3em] text-[#A855F7] uppercase mb-4">— Что говорят клиенты —</div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">ОТЗЫВЫ</h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-2xl">★</span>)}
            </div>
            <span className="text-white/60 text-lg">4.8 из 5 — 1200+ отзывов</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#16162A] border border-white/5 rounded-2xl p-6 space-y-4 card-hover">
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">"{r.text}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF2D78] to-[#A855F7] flex items-center justify-center text-white text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <span className="text-white font-semibold text-sm">{r.name}</span>
                </div>
                <span className="text-white/30 text-xs">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* О МАГАЗИНЕ */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF2D78]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="font-display text-xs tracking-[0.3em] text-[#FF2D78] uppercase mb-4">— Наша история —</div>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">О МАГАЗИНЕ</h2>
                <p className="text-white/60 leading-relaxed text-lg mb-4">
                  Мы — команда энтузиастов, которые любят крутые гаджеты и хотят сделать их доступными каждому.
                </p>
                <p className="text-white/50 leading-relaxed">
                  С 2021 года работаем на Wildberries и радуем тысячи покупателей по всей России. Сейчас открыли собственный магазин, чтобы предложить ещё лучшие цены напрямую.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["3+", "лет на рынке"],
                  ["5000+", "заказов выполнено"],
                  ["98%", "довольных клиентов"],
                  ["50+", "товаров в каталоге"],
                ].map(([val, label]) => (
                  <div key={val} className="bg-glass border border-white/5 rounded-2xl p-5 text-center">
                    <div className="font-display font-black text-3xl text-gradient mb-1">{val}</div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "Shield", title: "Только оригиналы", desc: "Все товары проходят проверку качества перед отправкой" },
                { icon: "HeartHandshake", title: "Забота о клиентах", desc: "Поддержка 7 дней в неделю, отвечаем в течение часа" },
                { icon: "Award", title: "Лучший продавец WB", desc: "Рейтинг 4.8★ на Wildberries — сотни подтверждённых отзывов" },
              ].map(item => (
                <div key={item.title} className="bg-glass border border-white/5 rounded-2xl p-6 flex gap-5 items-start hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#FF2D78]/15 text-[#FF2D78] flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="font-display text-xs tracking-[0.3em] text-[#00FF88] uppercase mb-4">— Мы всегда на связи —</div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">КОНТАКТЫ</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: "Phone", label: "Телефон", value: "+7 (900) 123-45-67", color: "#FF2D78", bg: "rgba(255,45,120,0.1)" },
            { icon: "Mail", label: "Email", value: "info@novashop.ru", color: "#00D4FF", bg: "rgba(0,212,255,0.1)" },
            { icon: "MessageCircle", label: "Telegram", value: "@novashop_support", color: "#A855F7", bg: "rgba(168,85,247,0.1)" },
          ].map(c => (
            <div key={c.label} className="bg-glass border border-white/5 rounded-2xl p-8 text-center space-y-4 card-hover">
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center" style={{ background: c.bg, color: c.color }}>
                <Icon name={c.icon} size={26} />
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-2">{c.label}</div>
                <div className="text-white font-semibold">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-white/30 text-sm">
          Работаем ежедневно с 9:00 до 21:00 по московскому времени
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-black text-xl text-gradient">NOVA SHOP</div>
          <div className="text-white/30 text-sm">© 2024 Nova Shop. Все права защищены.</div>
          <div className="flex gap-4 flex-wrap justify-center">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/30 hover:text-white/60 text-sm transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* КОРЗИНА */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-[#0F0F1A] border-l border-white/10 flex flex-col h-full" style={{ animation: "slide-in 0.3s ease-out" }}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display font-bold text-xl text-white">КОРЗИНА</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <Icon name="X" size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-8">
                <div className="text-6xl">🛒</div>
                <p className="text-white/50">Корзина пуста</p>
                <button onClick={() => setCartOpen(false)} className="bg-[#FF2D78] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF2D78]/80 transition-all">
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
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-white font-bold w-6 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 flex items-center justify-center">
                          <Icon name="Plus" size={14} />
                        </button>
                        <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg text-white/30 hover:text-[#FF2D78] ml-1 flex items-center justify-center">
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
                    onClick={() => setOrderOpen(true)}
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOrderOpen(false)} />
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
                  <button onClick={() => setOrderOpen(false)} className="text-white/50 hover:text-white">
                    <Icon name="X" size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D78] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full bg-[#16162A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF2D78] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Адрес доставки</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => setForm({ ...form, address: e.target.value })}
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
                    onClick={handleOrder}
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
    </div>
  );
}
