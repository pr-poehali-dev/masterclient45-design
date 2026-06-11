import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "schedule", label: "Расписание", icon: "Calendar" },
  { id: "bookings", label: "Записи", icon: "ClipboardList" },
  { id: "clients", label: "Клиенты", icon: "Users" },
  { id: "services", label: "Услуги", icon: "Sparkles" },
  { id: "portfolio", label: "Портфолио", icon: "Image" },
  { id: "analytics", label: "Аналитика", icon: "BarChart3" },
  { id: "chat", label: "Чат", icon: "MessageCircle" },
  { id: "reviews", label: "Отзывы", icon: "Star" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

const todayBookings = [
  { id: 1, client: "Анна Ковалёва", service: "Маникюр + гель", time: "10:00", duration: "90 мин", price: "2 500 ₽", status: "confirmed" },
  { id: 2, client: "Мария Смирнова", service: "Педикюр", time: "12:00", duration: "60 мин", price: "1 800 ₽", status: "confirmed" },
  { id: 3, client: "Ольга Тихонова", service: "Укрепление ногтей", time: "14:00", duration: "75 мин", price: "2 200 ₽", status: "pending" },
  { id: 4, client: "Наталья Попова", service: "Наращивание ресниц", time: "16:00", duration: "120 мин", price: "3 500 ₽", status: "confirmed" },
  { id: 5, client: "Светлана Иванова", service: "Маникюр", time: "18:30", duration: "60 мин", price: "1 500 ₽", status: "new" },
];

const weekData = [
  { day: "Пн", bookings: 4, revenue: 8400 },
  { day: "Вт", bookings: 6, revenue: 12600 },
  { day: "Ср", bookings: 3, revenue: 6300 },
  { day: "Чт", bookings: 7, revenue: 14700 },
  { day: "Пт", bookings: 8, revenue: 16800 },
  { day: "Сб", bookings: 9, revenue: 18900 },
  { day: "Вс", bookings: 2, revenue: 4200 },
];

const maxRevenue = Math.max(...weekData.map((d) => d.revenue));

const recentClients = [
  { name: "Анна К.", visits: 12, lastVisit: "Вчера", avatar: "АК" },
  { name: "Мария С.", visits: 8, lastVisit: "3 дня назад", avatar: "МС" },
  { name: "Ольга Т.", visits: 5, lastVisit: "Неделю назад", avatar: "ОТ" },
  { name: "Наталья П.", visits: 20, lastVisit: "Сегодня", avatar: "НП" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: "Подтверждено", color: "text-emerald-400 bg-emerald-400/10" },
  pending: { label: "Ожидает", color: "text-yellow-400 bg-yellow-400/10" },
  new: { label: "Новая", color: "text-violet-400 bg-violet-400/10" },
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalToday = todayBookings.reduce((sum, b) => sum + parseInt(b.price.replace(/\D/g, "")), 0);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[hsl(var(--sidebar-background))] border-r border-sidebar-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shrink-0">
              <Icon name="Scissors" size={15} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-base">
              Master<span className="gradient-text">Client</span>
            </span>
          </Link>
        </div>

        {/* Master profile */}
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-sm shrink-0">
              АМ
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">Алина Мастерова</div>
              <div className="text-xs text-muted-foreground">Мастер маникюра</div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 pulse-dot shrink-0" />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? "nav-active text-white font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
              }`}
            >
              <Icon name={item.icon as "Home"} size={17} />
              {item.label}
              {item.id === "chat" && (
                <span className="ml-auto w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold">3</span>
              )}
            </button>
          ))}
        </nav>

        {/* Link block */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="bg-gradient-to-br from-violet-500/15 to-pink-500/10 border border-violet-500/20 rounded-2xl p-3">
            <div className="text-xs text-muted-foreground mb-2">Ваша ссылка для клиентов</div>
            <div className="text-xs text-violet-300 font-mono truncate mb-2">masterclient45.ru/m/alina</div>
            <button className="w-full text-xs gradient-bg text-white py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Скопировать
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center px-6 gap-4 sticky top-0 z-20 bg-background/80 backdrop-blur-md">
          <button
            className="lg:hidden text-muted-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={20} />
          </button>

          <div>
            <h1 className="font-display font-bold text-white text-lg leading-tight">
              {navItems.find((n) => n.id === activeSection)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">Четверг, 11 июня 2026</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
              <Icon name="Bell" size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full gradient-bg" />
            </button>
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs">
              АМ
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSection === "home" && <HomeSection totalToday={totalToday} />}
          {activeSection === "schedule" && <ScheduleSection />}
          {activeSection === "bookings" && <BookingsSection />}
          {activeSection === "clients" && <ClientsSection />}
          {activeSection === "services" && <ServicesSection />}
          {activeSection === "portfolio" && <PortfolioSection />}
          {activeSection === "analytics" && <AnalyticsSection weekData={weekData} maxRevenue={maxRevenue} />}
          {activeSection === "chat" && <ChatSection />}
          {activeSection === "reviews" && <ReviewsSection />}
          {activeSection === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

function HomeSection({ totalToday }: { totalToday: number }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Выручка сегодня", value: `${totalToday.toLocaleString("ru")} ₽`, icon: "TrendingUp", color: "from-violet-500/20 to-purple-500/0", iconColor: "text-violet-400" },
          { label: "Записей сегодня", value: "5", icon: "CalendarCheck", color: "from-pink-500/20 to-rose-500/0", iconColor: "text-pink-400" },
          { label: "Новых клиентов", value: "2", icon: "UserPlus", color: "from-orange-500/20 to-amber-500/0", iconColor: "text-orange-400" },
          { label: "Средний чек", value: "2 300 ₽", icon: "Wallet", color: "from-emerald-500/20 to-teal-500/0", iconColor: "text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className={`stat-card rounded-2xl p-4 bg-gradient-to-br ${s.color}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <Icon name={s.icon as "Home"} size={16} className={s.iconColor} />
            </div>
            <div className="font-display font-black text-2xl text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Today bookings */}
      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-bold text-white">Записи на сегодня</h2>
          <span className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
            {todayBookings.length} записей
          </span>
        </div>
        <div className="divide-y divide-border">
          {todayBookings.map((b) => (
            <div key={b.id} className="booking-row px-6 py-4 flex items-center gap-4">
              <div className="w-16 text-center">
                <div className="font-display font-bold text-white text-sm">{b.time}</div>
                <div className="text-xs text-muted-foreground">{b.duration}</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-violet-500 to-pink-500 opacity-40" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-white truncate">{b.client}</div>
                <div className="text-xs text-muted-foreground truncate">{b.service}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium gradient-text">{b.price}</div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusConfig[b.status].color}`}>
                  {statusConfig[b.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent clients */}
      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-display font-bold text-white">Постоянные клиенты</h2>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recentClients.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.lastVisit}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs gradient-text font-medium">{c.visits} визитов</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleSection() {
  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  const days = ["Пн 9", "Вт 10", "Ср 11", "Чт 12", "Пт 13", "Сб 14"];
  const slots: Record<string, { service: string; client: string; color: string } | null> = {
    "Пн 9-10:00": { service: "Маникюр", client: "Анна К.", color: "from-violet-500/40 to-purple-500/20 border-violet-500/40" },
    "Вт 10-14:00": { service: "Педикюр", client: "Мария С.", color: "from-pink-500/40 to-rose-500/20 border-pink-500/40" },
    "Ср 11-11:00": { service: "Массаж", client: "Ольга Т.", color: "from-orange-500/40 to-amber-500/20 border-orange-500/40" },
    "Чт 12-16:00": { service: "Маникюр", client: "Наталья П.", color: "from-violet-500/40 to-pink-500/20 border-violet-500/40" },
    "Пт 13-10:00": { service: "Укрепление", client: "Светлана И.", color: "from-pink-500/40 to-orange-500/20 border-pink-500/40" },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white">
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="font-display font-bold text-white px-2">9–14 июня 2026</span>
          <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white">
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <button className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Добавить запись
        </button>
      </div>

      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="w-16 py-3 px-4 text-left">
                  <span className="text-xs text-muted-foreground">Время</span>
                </th>
                {days.map((d) => (
                  <th key={d} className="py-3 px-2 text-center">
                    <span className={`text-xs font-medium ${d === "Ср 11" ? "gradient-text" : "text-muted-foreground"}`}>{d}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h} className="border-b border-border/50">
                  <td className="py-3 px-4">
                    <span className="text-xs text-muted-foreground">{h}</span>
                  </td>
                  {days.map((d) => {
                    const key = `${d}-${h}`;
                    const slot = slots[key];
                    return (
                      <td key={d} className="py-1 px-1">
                        {slot ? (
                          <div className={`rounded-lg p-2 bg-gradient-to-br ${slot.color} border text-center`}>
                            <div className="text-[11px] font-medium text-white truncate">{slot.service}</div>
                            <div className="text-[10px] text-white/60 truncate">{slot.client}</div>
                          </div>
                        ) : (
                          <div className="h-10 rounded-lg hover:bg-white/3 transition-colors cursor-pointer" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingsSection() {
  const all = [
    ...todayBookings,
    { id: 6, client: "Людмила Зайцева", service: "Окрашивание", time: "11:00", duration: "180 мин", price: "5 000 ₽", status: "confirmed" },
    { id: 7, client: "Елена Соколова", service: "Маникюр", time: "13:00", duration: "60 мин", price: "1 500 ₽", status: "cancelled" },
  ];
  const statusCfg: Record<string, { label: string; color: string }> = {
    ...statusConfig,
    cancelled: { label: "Отменена", color: "text-red-400 bg-red-400/10" },
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["Все", "Сегодня", "Завтра", "Неделя"].map((f) => (
            <button key={f} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${f === "Все" ? "gradient-bg text-white" : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
        <button className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Новая запись
        </button>
      </div>

      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="divide-y divide-border">
          {all.map((b) => (
            <div key={b.id} className="booking-row px-6 py-4 flex items-center gap-4">
              <div className="w-14 shrink-0 text-center">
                <div className="font-display font-bold text-white text-sm">{b.time}</div>
                <div className="text-xs text-muted-foreground">{b.duration}</div>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-violet-500 to-pink-500 opacity-30 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-white">{b.client}</div>
                <div className="text-xs text-muted-foreground">{b.service}</div>
              </div>
              <div className="hidden sm:block text-sm font-medium gradient-text shrink-0">{b.price}</div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${statusCfg[b.status].color}`}>
                {statusCfg[b.status].label}
              </span>
              <button className="text-muted-foreground hover:text-white transition-colors shrink-0">
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientsSection() {
  const clients = [
    { name: "Анна Ковалёва", phone: "+7 900 123-45-67", visits: 12, total: "28 400 ₽", lastVisit: "Сегодня", avatar: "АК", tag: "VIP" },
    { name: "Наталья Попова", phone: "+7 911 234-56-78", visits: 20, total: "46 000 ₽", lastVisit: "Сегодня", avatar: "НП", tag: "VIP" },
    { name: "Мария Смирнова", phone: "+7 922 345-67-89", visits: 8, total: "18 400 ₽", lastVisit: "3 дня", avatar: "МС", tag: "" },
    { name: "Ольга Тихонова", phone: "+7 933 456-78-90", visits: 5, total: "11 000 ₽", lastVisit: "Неделю", avatar: "ОТ", tag: "" },
    { name: "Светлана Иванова", phone: "+7 944 567-89-01", visits: 2, total: "3 000 ₽", lastVisit: "2 недели", avatar: "СИ", tag: "Новый" },
    { name: "Людмила Зайцева", phone: "+7 955 678-90-12", visits: 15, total: "35 000 ₽", lastVisit: "Месяц", avatar: "ЛЗ", tag: "VIP" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-violet-500/50"
            placeholder="Поиск клиента..."
          />
        </div>
        <button className="gradient-bg text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 flex items-center gap-2 shrink-0">
          <Icon name="UserPlus" size={16} />
          Добавить
        </button>
      </div>

      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="divide-y divide-border">
          {clients.map((c) => (
            <div key={c.name} className="booking-row px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-white">{c.name}</span>
                  {c.tag && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.tag === "VIP" ? "gradient-bg text-white" : "bg-violet-500/20 text-violet-300"}`}>
                      {c.tag}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{c.phone}</div>
              </div>
              <div className="hidden sm:block text-center shrink-0">
                <div className="text-sm font-medium text-white">{c.visits}</div>
                <div className="text-xs text-muted-foreground">визитов</div>
              </div>
              <div className="hidden md:block text-right shrink-0">
                <div className="text-sm gradient-text font-medium">{c.total}</div>
                <div className="text-xs text-muted-foreground">{c.lastVisit}</div>
              </div>
              <button className="text-muted-foreground hover:text-white transition-colors shrink-0">
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection() {
  const services = [
    { name: "Маникюр", duration: "60 мин", price: "1 500 ₽", category: "Ногти", bookings: 42 },
    { name: "Педикюр", duration: "90 мин", price: "2 000 ₽", category: "Ногти", bookings: 28 },
    { name: "Маникюр + гель", duration: "90 мин", price: "2 500 ₽", category: "Ногти", bookings: 56 },
    { name: "Наращивание ресниц", duration: "120 мин", price: "3 500 ₽", category: "Ресницы", bookings: 34 },
    { name: "Укрепление ногтей", duration: "75 мин", price: "2 200 ₽", category: "Ногти", bookings: 19 },
    { name: "Педикюр + гель", duration: "120 мин", price: "2 800 ₽", category: "Ногти", bookings: 22 },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-white">Прайс-лист</h2>
        <button className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Добавить услугу
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.name} className="stat-card rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] text-violet-400 bg-violet-500/15 px-2 py-0.5 rounded-full">{s.category}</span>
              <button className="text-muted-foreground hover:text-white transition-colors">
                <Icon name="MoreHorizontal" size={15} />
              </button>
            </div>
            <h3 className="font-display font-bold text-white mb-1">{s.name}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{s.duration}</span>
              <span className="flex items-center gap-1"><Icon name="BarChart2" size={12} />{s.bookings} записей</span>
            </div>
            <div className="font-display font-black text-xl gradient-text">{s.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection() {
  const items = Array.from({ length: 9 }, (_, i) => i + 1);
  const gradients = [
    "from-violet-500/30 to-purple-900/60",
    "from-pink-500/30 to-rose-900/60",
    "from-orange-500/30 to-amber-900/60",
    "from-violet-500/30 to-pink-500/20",
    "from-pink-500/30 to-orange-500/20",
    "from-orange-500/30 to-violet-500/20",
    "from-purple-500/30 to-pink-500/20",
    "from-rose-500/30 to-orange-500/20",
    "from-violet-500/30 to-rose-500/20",
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-white">Портфолио</h2>
        <button className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 flex items-center gap-2">
          <Icon name="Upload" size={16} />
          Загрузить
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((i) => (
          <div
            key={i}
            className={`aspect-square rounded-2xl bg-gradient-to-br ${gradients[i - 1]} border border-white/5 card-hover flex items-end p-3 cursor-pointer relative overflow-hidden`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Icon name="Sparkles" size={40} className="text-white" />
            </div>
            <span className="text-xs text-white/60 relative z-10">Маникюр #{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type WeekDay = { day: string; bookings: number; revenue: number };

function AnalyticsSection({ weekData, maxRevenue }: { weekData: WeekDay[]; maxRevenue: number }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Выручка за месяц", value: "87 400 ₽", change: "+12%", up: true },
          { label: "Всего записей", value: "156", change: "+8%", up: true },
          { label: "Новых клиентов", value: "24", change: "+5%", up: true },
          { label: "Средний чек", value: "2 300 ₽", change: "-2%", up: false },
        ].map((s) => (
          <div key={s.label} className="stat-card rounded-2xl p-4">
            <div className="text-xs text-muted-foreground mb-3">{s.label}</div>
            <div className="font-display font-black text-2xl text-white mb-1">{s.value}</div>
            <div className={`text-xs font-medium flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={12} />
              {s.change} к прошлому месяцу
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card-glass rounded-2xl p-6">
        <h3 className="font-display font-bold text-white mb-6">Выручка по дням недели</h3>
        <div className="flex items-end gap-3 h-40">
          {weekData.map((d: WeekDay) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-xs text-muted-foreground font-medium">
                {(d.revenue / 1000).toFixed(0)}k
              </div>
              <div
                className="w-full rounded-t-lg gradient-bg opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              />
              <div className="text-xs text-muted-foreground">{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top services */}
      <div className="card-glass rounded-2xl p-6">
        <h3 className="font-display font-bold text-white mb-4">Топ услуг</h3>
        <div className="space-y-3">
          {[
            { name: "Маникюр + гель", pct: 85, revenue: "32 400 ₽" },
            { name: "Маникюр", pct: 70, revenue: "21 000 ₽" },
            { name: "Наращивание ресниц", pct: 55, revenue: "17 500 ₽" },
            { name: "Педикюр", pct: 40, revenue: "12 600 ₽" },
          ].map((s) => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{s.name}</span>
                <span className="gradient-text font-medium">{s.revenue}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-bg"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  const chats = [
    { name: "Анна Ковалёва", last: "Хорошо, жду вас!", time: "10:23", unread: 0, avatar: "АК" },
    { name: "Мария Смирнова", last: "Можно перенести на пятницу?", time: "09:41", unread: 2, avatar: "МС" },
    { name: "Ольга Тихонова", last: "Спасибо большое!", time: "Вчера", unread: 0, avatar: "ОТ" },
    { name: "Наталья Попова", last: "Записалась на следующую неделю", time: "Вчера", unread: 1, avatar: "НП" },
    { name: "Светлана Иванова", last: "До встречи!", time: "2 дня", unread: 0, avatar: "СИ" },
  ];

  const messages = [
    { from: "client", text: "Привет! Хочу записаться на маникюр", time: "09:30" },
    { from: "master", text: "Добрый день! Есть время в пятницу в 14:00 или субботу в 11:00. Что удобнее?", time: "09:35" },
    { from: "client", text: "Пятница в 14:00 отлично!", time: "09:38" },
    { from: "master", text: "Записала вас! Напомню за день до визита 😊", time: "09:40" },
    { from: "client", text: "Можно перенести на пятницу?", time: "09:41" },
  ];

  return (
    <div className="animate-fade-in h-[calc(100vh-10rem)] flex gap-4">
      <div className="w-72 shrink-0 card-glass rounded-2xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-muted-foreground focus:outline-none" placeholder="Поиск..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {chats.map((c, i) => (
            <div key={c.name} className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${i === 1 ? "bg-white/5" : "hover:bg-white/3"}`}>
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{c.name}</div>
                <div className="text-xs text-muted-foreground truncate">{c.last}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[10px] text-muted-foreground mb-1">{c.time}</div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full gradient-bg text-white text-[10px] flex items-center justify-center font-bold ml-auto">{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 card-glass rounded-2xl flex flex-col overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold">МС</div>
          <div>
            <div className="text-sm font-medium text-white">Мария Смирнова</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />онлайн</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "master" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "master" ? "gradient-bg text-white rounded-br-sm" : "bg-white/8 text-white/90 rounded-bl-sm border border-white/10"}`}>
                <p>{m.text}</p>
                <div className={`text-[10px] mt-1 ${m.from === "master" ? "text-white/60 text-right" : "text-muted-foreground"}`}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-border flex items-center gap-3">
          <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-muted-foreground focus:outline-none focus:border-violet-500/50" placeholder="Написать сообщение..." />
          <button className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white hover:opacity-90 transition-opacity shrink-0">
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  const reviews = [
    { name: "Анна К.", rating: 5, text: "Прекрасный мастер! Работа сделана на высшем уровне, держится уже 3 недели.", date: "10 июня 2026", status: "published" },
    { name: "Мария С.", rating: 5, text: "Очень довольна результатом. Запись прошла быстро и удобно через бота.", date: "8 июня 2026", status: "published" },
    { name: "Ольга Т.", rating: 4, text: "Всё хорошо, но немного задержались по времени. В целом довольна.", date: "5 июня 2026", status: "pending" },
    { name: "Наталья П.", rating: 5, text: "Лучший мастер! Хожу уже 2 года, всегда идеально!", date: "1 июня 2026", status: "published" },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card rounded-2xl p-4 text-center">
          <div className="font-display font-black text-3xl gradient-text">4.9</div>
          <div className="text-xs text-muted-foreground mt-1">Средняя оценка</div>
        </div>
        <div className="stat-card rounded-2xl p-4 text-center">
          <div className="font-display font-black text-3xl text-white">48</div>
          <div className="text-xs text-muted-foreground mt-1">Всего отзывов</div>
        </div>
        <div className="stat-card rounded-2xl p-4 text-center">
          <div className="font-display font-black text-3xl text-yellow-400">1</div>
          <div className="text-xs text-muted-foreground mt-1">На модерации</div>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.name} className="card-glass rounded-2xl p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold">
                  {r.name.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={13} className={i < r.rating ? "text-yellow-400" : "text-white/10"} />
                  ))}
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${r.status === "published" ? "text-emerald-400 bg-emerald-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                  {r.status === "published" ? "Опубликован" : "На модерации"}
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed">{r.text}</p>
            {r.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button className="text-xs gradient-bg text-white px-3 py-1.5 rounded-lg hover:opacity-90">Опубликовать</button>
                <button className="text-xs bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">Отклонить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-white">Профиль мастера</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white font-display font-bold text-xl">АМ</div>
          <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">Изменить фото</button>
        </div>
        {[
          { label: "Имя и фамилия", value: "Алина Мастерова" },
          { label: "Специализация", value: "Мастер маникюра и педикюра" },
          { label: "Телефон", value: "+7 900 123-45-67" },
          { label: "Город", value: "Москва" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs text-muted-foreground block mb-1.5">{f.label}</label>
            <input
              defaultValue={f.value}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
        ))}
        <button className="gradient-bg text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          Сохранить изменения
        </button>
      </div>

      <div className="card-glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold text-white">Уведомления</h3>
        {[
          { label: "Новая запись", desc: "Уведомление при новой записи клиента" },
          { label: "Отмена записи", desc: "Уведомление при отмене клиентом" },
          { label: "Напоминания клиентам", desc: "Автоматически отправлять напоминания" },
        ].map((n) => (
          <div key={n.label} className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white">{n.label}</div>
              <div className="text-xs text-muted-foreground">{n.desc}</div>
            </div>
            <button className="w-11 h-6 rounded-full gradient-bg relative transition-all">
              <div className="w-4 h-4 rounded-full bg-white absolute top-1 right-1 transition-all" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}