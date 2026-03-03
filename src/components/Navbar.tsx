import Icon from "@/components/ui/icon";

const navItems = [
  { id: "catalog", label: "Каталог" },
  { id: "delivery", label: "Доставка" },
  { id: "reviews", label: "Отзывы" },
  { id: "about", label: "О магазине" },
  { id: "contacts", label: "Контакты" },
];

interface NavbarProps {
  activeSection: string;
  totalItems: number;
  onScrollTo: (id: string) => void;
  onCartOpen: () => void;
}

export default function Navbar({ activeSection, totalItems, onScrollTo, onCartOpen }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-display font-black text-xl tracking-tight text-gradient">
          NOVA SHOP
        </div>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
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
          onClick={onCartOpen}
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
  );
}
