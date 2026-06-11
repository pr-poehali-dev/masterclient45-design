import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ─── Nav ────────────────────────────────────────────────── */
const NAV = [
  { id: "home",      label: "Главная",    icon: "LayoutDashboard" },
  { id: "schedule",  label: "Расписание", icon: "CalendarDays" },
  { id: "bookings",  label: "Записи",     icon: "ClipboardList" },
  { id: "clients",   label: "Клиенты",    icon: "Users" },
  { id: "services",  label: "Услуги",     icon: "Tag" },
  { id: "portfolio", label: "Портфолио",  icon: "Image" },
  { id: "analytics", label: "Аналитика",  icon: "BarChart2" },
  { id: "chat",      label: "Чат",        icon: "MessageSquare", badge: 3 },
  { id: "reviews",   label: "Отзывы",     icon: "Star" },
  { id: "settings",  label: "Настройки",  icon: "Settings" },
];

/* ─── Data ───────────────────────────────────────────────── */
const BOOKINGS = [
  { id: 1, client: "Анна Ковалёва",   service: "Маникюр + гель",       time: "10:00", dur: "90 мин", price: 2500, status: "confirmed" },
  { id: 2, client: "Мария Смирнова",  service: "Педикюр",               time: "12:00", dur: "60 мин", price: 1800, status: "confirmed" },
  { id: 3, client: "Ольга Тихонова",  service: "Укрепление ногтей",     time: "14:00", dur: "75 мин", price: 2200, status: "pending" },
  { id: 4, client: "Наталья Попова",  service: "Наращивание ресниц",    time: "16:00", dur: "120 мин", price: 3500, status: "confirmed" },
  { id: 5, client: "Светлана Иванова","service": "Маникюр",              time: "18:30", dur: "60 мин", price: 1500, status: "new" },
];

const WEEK = [
  { day: "Пн", rev: 8400 },
  { day: "Вт", rev: 12600 },
  { day: "Ср", rev: 6300 },
  { day: "Чт", rev: 14700, today: true },
  { day: "Пт", rev: 16800 },
  { day: "Сб", rev: 18900 },
  { day: "Вс", rev: 4200 },
];

const MAX_REV = Math.max(...WEEK.map(d => d.rev));

const STATUS: Record<string, { label: string; cls: string }> = {
  confirmed: { label: "Подтверждено", cls: "badge-green" },
  pending:   { label: "Ожидает",      cls: "badge-yellow" },
  new:       { label: "Новая",        cls: "badge-blue" },
  cancelled: { label: "Отменена",     cls: "badge-red" },
};

/* ─── Sidebar ────────────────────────────────────────────── */
function Sidebar({ active, setActive, open, setOpen }: {
  active: string;
  setActive: (id: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 flex flex-col border-r transition-transform duration-200
          bg-[hsl(var(--sidebar-background))] border-[hsl(var(--sidebar-border))]
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[hsl(var(--sidebar-border))]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <Icon name="Scissors" size={14} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white tracking-tight">MasterClient45</span>
          </Link>
        </div>

        {/* Profile */}
        <div className="px-3 py-3 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
              АМ
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-white leading-tight truncate">Алина Мастерова</div>
              <div className="text-[11px] text-[hsl(var(--sidebar-foreground))] truncate">Мастер маникюра</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setOpen(false); }}
              className={`sidebar-item ${active === item.id ? "sidebar-item-active" : ""}`}
            >
              <Icon name={item.icon as "Home"} size={15} className="shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-medium">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Link card */}
        <div className="px-3 py-3 border-t border-[hsl(var(--sidebar-border))]">
          <div className="bg-[hsl(var(--sidebar-accent))] rounded-md p-3">
            <p className="text-[11px] text-[hsl(var(--sidebar-foreground))] mb-1">Ссылка для клиентов</p>
            <p className="text-[11px] text-blue-400 font-mono truncate mb-2">mc45.ru/m/alina</p>
            <button className="w-full btn-primary justify-center text-[11px] py-1.5">
              <Icon name="Copy" size={11} />
              Скопировать
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── Topbar ─────────────────────────────────────────────── */
function Topbar({ section, onMenuClick }: { section: string; onMenuClick: () => void }) {
  const label = NAV.find(n => n.id === section)?.label ?? "";
  return (
    <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-background sticky top-0 z-20">
      <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={onMenuClick}>
        <Icon name="Menu" size={18} />
      </button>
      <div className="flex-1">
        <h1 className="text-[15px] font-semibold text-foreground">{label}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
          <Icon name="Bell" size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <div className="divider w-px h-5" />
        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
          АМ
        </div>
      </div>
    </header>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function Dashboard() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalToday = BOOKINGS.reduce((s, b) => s + b.price, 0);

  const sections: Record<string, JSX.Element> = {
    home:      <HomeSection total={totalToday} />,
    schedule:  <ScheduleSection />,
    bookings:  <BookingsSection />,
    clients:   <ClientsSection />,
    services:  <ServicesSection />,
    portfolio: <PortfolioSection />,
    analytics: <AnalyticsSection />,
    chat:      <ChatSection />,
    reviews:   <ReviewsSection />,
    settings:  <SettingsSection />,
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen min-w-0">
        <Topbar section={active} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5 overflow-auto">
          {sections[active]}
        </main>
      </div>
    </div>
  );
}

/* ─── Home ───────────────────────────────────────────────── */
function HomeSection({ total }: { total: number }) {
  return (
    <div className="space-y-5 animate-in">
      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Выручка сегодня",  value: `${total.toLocaleString("ru")} ₽`, icon: "Wallet",     delta: "+8% вчера" },
          { label: "Записей сегодня",  value: "5",              icon: "Calendar",   delta: "из 8 слотов" },
          { label: "Новых клиентов",   value: "2",              icon: "UserPlus",   delta: "за неделю" },
          { label: "Средний чек",      value: "2 300 ₽",        icon: "TrendingUp", delta: "+5% к норме" },
        ].map(s => (
          <div key={s.label} className="stat-block">
            <div className="flex items-start justify-between mb-3">
              <p className="text-[12px] text-muted-foreground font-medium">{s.label}</p>
              <div className="w-7 h-7 rounded-md bg-primary/8 flex items-center justify-center">
                <Icon name={s.icon as "Home"} size={14} className="text-primary" />
              </div>
            </div>
            <p className="text-[22px] font-semibold text-foreground tracking-tight">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today bookings */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="text-[13px] font-semibold">Записи на сегодня</p>
            <span className="badge badge-gray">{BOOKINGS.length} записей</span>
          </div>
          <div>
            {BOOKINGS.map(b => (
              <div key={b.id} className="data-row gap-3">
                <div className="w-[52px] shrink-0">
                  <p className="text-[13px] font-medium text-foreground">{b.time}</p>
                  <p className="text-[11px] text-muted-foreground">{b.dur}</p>
                </div>
                <div className="w-px h-8 bg-border shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate">{b.client}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{b.service}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-medium text-foreground">{b.price.toLocaleString("ru")} ₽</p>
                  <span className={STATUS[b.status].cls}>{STATUS[b.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-[13px] font-semibold mb-4">Неделя</p>
          <div className="flex items-end gap-2 h-28">
            {WEEK.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-t-sm transition-all ${d.today ? "bg-primary" : "bg-muted"}`}
                  style={{ height: `${(d.rev / MAX_REV) * 100}%` }}
                />
                <span className={`text-[10px] ${d.today ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
          <div className="divider my-3" />
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">Неделя</p>
            <p className="text-[13px] font-semibold">{WEEK.reduce((s, d) => s + d.rev, 0).toLocaleString("ru")} ₽</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Schedule ───────────────────────────────────────────── */
function ScheduleSection() {
  const HOURS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  const DAYS  = ["Пн 9","Вт 10","Ср 11","Чт 12","Пт 13","Сб 14"];
  const EVENTS: Record<string, { text: string; color: string }> = {
    "Пн 9|10:00":  { text: "Маникюр — Анна К.",    color: "bg-blue-50 text-blue-700 border-blue-200" },
    "Вт 10|14:00": { text: "Педикюр — Мария С.",   color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    "Ср 11|11:00": { text: "Ресницы — Ольга Т.",   color: "bg-violet-50 text-violet-700 border-violet-200" },
    "Чт 12|16:00": { text: "Маникюр — Наталья П.", color: "bg-orange-50 text-orange-700 border-orange-200" },
    "Пт 13|10:00": { text: "Педикюр — Света И.",   color: "bg-pink-50 text-pink-700 border-pink-200" },
    "Сб 14|12:00": { text: "Гель — Людмила З.",    color: "bg-teal-50 text-teal-700 border-teal-200" },
  };

  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="btn-ghost py-1.5 px-2"><Icon name="ChevronLeft" size={14} /></button>
          <span className="text-[13px] font-medium">9–14 июня 2026</span>
          <button className="btn-ghost py-1.5 px-2"><Icon name="ChevronRight" size={14} /></button>
        </div>
        <button className="btn-primary">
          <Icon name="Plus" size={14} />
          Добавить запись
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="w-16 text-left px-3 py-2.5 text-muted-foreground font-medium">Время</th>
                {DAYS.map(d => (
                  <th key={d} className={`text-center py-2.5 px-1 font-medium ${d === "Чт 12" ? "text-primary" : "text-muted-foreground"}`}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map(h => (
                <tr key={h} className="border-b border-border/60 last:border-0">
                  <td className="px-3 py-1.5 text-muted-foreground">{h}</td>
                  {DAYS.map(d => {
                    const ev = EVENTS[`${d}|${h}`];
                    return (
                      <td key={d} className="px-1 py-1">
                        {ev ? (
                          <div className={`rounded border px-2 py-1 text-[11px] font-medium ${ev.color}`}>
                            {ev.text}
                          </div>
                        ) : (
                          <div className="h-7 rounded hover:bg-muted/60 cursor-pointer transition-colors" />
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

/* ─── Bookings ───────────────────────────────────────────── */
function BookingsSection() {
  const all = [
    ...BOOKINGS,
    { id: 6, client: "Людмила Зайцева", service: "Окрашивание", time: "11:00", dur: "180 мин", price: 5000, status: "confirmed" },
    { id: 7, client: "Елена Соколова",  service: "Маникюр",     time: "13:00", dur: "60 мин",  price: 1500, status: "cancelled" },
  ];
  const stCfg = { ...STATUS, cancelled: { label: "Отменена", cls: "badge-red" } };

  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          {["Все", "Сегодня", "Завтра", "Неделя"].map((f, i) => (
            <button key={f} className={i === 0 ? "btn-primary py-1.5" : "btn-ghost py-1.5"}>{f}</button>
          ))}
        </div>
        <button className="btn-primary">
          <Icon name="Plus" size={14} />
          Новая запись
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div>
          {all.map(b => (
            <div key={b.id} className="data-row gap-3">
              <div className="w-[52px] shrink-0">
                <p className="text-[13px] font-medium">{b.time}</p>
                <p className="text-[11px] text-muted-foreground">{b.dur}</p>
              </div>
              <div className="w-px h-8 bg-border shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{b.client}</p>
                <p className="text-[11px] text-muted-foreground truncate">{b.service}</p>
              </div>
              <p className="text-[13px] font-medium hidden sm:block shrink-0">{b.price.toLocaleString("ru")} ₽</p>
              <span className={stCfg[b.status].cls}>{stCfg[b.status].label}</span>
              <button className="text-muted-foreground hover:text-foreground shrink-0">
                <Icon name="MoreHorizontal" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Clients ────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Анна Ковалёва",   phone: "+7 900 123-45-67", visits: 12, total: 28400, last: "Сегодня",  tag: "VIP" },
  { name: "Наталья Попова",  phone: "+7 911 234-56-78", visits: 20, total: 46000, last: "Сегодня",  tag: "VIP" },
  { name: "Мария Смирнова",  phone: "+7 922 345-67-89", visits: 8,  total: 18400, last: "3 дня",    tag: "" },
  { name: "Ольга Тихонова",  phone: "+7 933 456-78-90", visits: 5,  total: 11000, last: "Неделю",   tag: "" },
  { name: "Светлана Иванова",phone: "+7 944 567-89-01", visits: 2,  total: 3000,  last: "2 недели", tag: "Новый" },
  { name: "Людмила Зайцева", phone: "+7 955 678-90-12", visits: 15, total: 35000, last: "Месяц",    tag: "VIP" },
];

function ClientsSection() {
  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input className="input-field pl-8" placeholder="Поиск клиента..." />
        </div>
        <button className="btn-primary ml-auto">
          <Icon name="UserPlus" size={14} />
          Добавить
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border text-left text-[11px] text-muted-foreground uppercase tracking-wide">
              <th className="px-4 py-2.5 font-medium">Клиент</th>
              <th className="px-4 py-2.5 font-medium hidden md:table-cell">Телефон</th>
              <th className="px-4 py-2.5 font-medium text-center">Визитов</th>
              <th className="px-4 py-2.5 font-medium text-right hidden sm:table-cell">Сумма</th>
              <th className="px-4 py-2.5 font-medium hidden lg:table-cell">Последний визит</th>
              <th className="px-2 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map(c => (
              <tr key={c.name} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold flex items-center justify-center shrink-0">
                      {c.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium leading-tight">{c.name}</p>
                      {c.tag && (
                        <span className={c.tag === "VIP" ? "badge badge-blue" : "badge badge-gray"}>{c.tag}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.phone}</td>
                <td className="px-4 py-3 text-center font-medium">{c.visits}</td>
                <td className="px-4 py-3 text-right font-medium hidden sm:table-cell">{c.total.toLocaleString("ru")} ₽</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{c.last}</td>
                <td className="px-2 py-3">
                  <button className="text-muted-foreground hover:text-foreground">
                    <Icon name="ChevronRight" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Services ───────────────────────────────────────────── */
const SERVICES = [
  { name: "Маникюр",              cat: "Ногти",   dur: "60 мин",  price: 1500, bookings: 42 },
  { name: "Педикюр",              cat: "Ногти",   dur: "90 мин",  price: 2000, bookings: 28 },
  { name: "Маникюр + гель",       cat: "Ногти",   dur: "90 мин",  price: 2500, bookings: 56 },
  { name: "Наращивание ресниц",   cat: "Ресницы", dur: "120 мин", price: 3500, bookings: 34 },
  { name: "Укрепление ногтей",    cat: "Ногти",   dur: "75 мин",  price: 2200, bookings: 19 },
  { name: "Педикюр + гель",       cat: "Ногти",   dur: "120 мин", price: 2800, bookings: 22 },
];

function ServicesSection() {
  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">{SERVICES.length} услуг</p>
        <button className="btn-primary">
          <Icon name="Plus" size={14} />
          Добавить услугу
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border text-left text-[11px] text-muted-foreground uppercase tracking-wide">
              <th className="px-4 py-2.5 font-medium">Услуга</th>
              <th className="px-4 py-2.5 font-medium hidden sm:table-cell">Категория</th>
              <th className="px-4 py-2.5 font-medium">Длительность</th>
              <th className="px-4 py-2.5 font-medium text-right">Цена</th>
              <th className="px-4 py-2.5 font-medium text-right hidden md:table-cell">Записей</th>
              <th className="px-2 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {SERVICES.map(s => (
              <tr key={s.name} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  <span className="badge badge-gray">{s.cat}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.dur}</td>
                <td className="px-4 py-3 text-right font-medium">{s.price.toLocaleString("ru")} ₽</td>
                <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">{s.bookings}</td>
                <td className="px-2 py-3">
                  <button className="text-muted-foreground hover:text-foreground">
                    <Icon name="MoreHorizontal" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Portfolio ──────────────────────────────────────────── */
function PortfolioSection() {
  const COLORS = [
    "bg-slate-100","bg-zinc-100","bg-stone-100","bg-rose-50",
    "bg-pink-50","bg-purple-50","bg-indigo-50","bg-sky-50","bg-teal-50",
  ];
  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground">9 работ</p>
        <button className="btn-primary">
          <Icon name="Upload" size={14} />
          Загрузить
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {COLORS.map((c, i) => (
          <div key={i} className={`aspect-square rounded-lg ${c} border border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-80 transition-opacity`}>
            <Icon name="Image" size={20} className="text-muted-foreground/40" />
            <span className="text-[11px] text-muted-foreground">Работа #{i + 1}</span>
          </div>
        ))}
        <div className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/40 transition-colors">
          <Icon name="Plus" size={20} className="text-muted-foreground/40" />
          <span className="text-[11px] text-muted-foreground">Добавить</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Analytics ──────────────────────────────────────────── */
function AnalyticsSection() {
  type WeekDay = { day: string; rev: number; today?: boolean };
  const months = [
    { m: "Янв", rev: 64000 }, { m: "Фев", rev: 71000 }, { m: "Мар", rev: 83000 },
    { m: "Апр", rev: 78000 }, { m: "Май", rev: 91000 }, { m: "Июн", rev: 57000 },
  ];
  const maxM = Math.max(...months.map(m => m.rev));

  return (
    <div className="space-y-5 animate-in">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Выручка за месяц", value: "87 400 ₽", delta: "+12%" },
          { label: "Всего записей",    value: "156",        delta: "+8%" },
          { label: "Новых клиентов",   value: "24",         delta: "+5%" },
          { label: "Средний чек",      value: "2 300 ₽",    delta: "−2%" },
        ].map(s => (
          <div key={s.label} className="stat-block">
            <p className="text-[12px] text-muted-foreground mb-2">{s.label}</p>
            <p className="text-[22px] font-semibold tracking-tight">{s.value}</p>
            <p className={`text-[11px] mt-1 ${s.delta.startsWith("−") ? "text-red-500" : "text-emerald-600"}`}>
              {s.delta} к прошлому месяцу
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart monthly */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <p className="text-[13px] font-semibold mb-5">Выручка по месяцам</p>
          <div className="flex items-end gap-3 h-36">
            {months.map(d => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{(d.rev / 1000).toFixed(0)}k</span>
                <div
                  className={`w-full rounded-t-sm ${d.m === "Июн" ? "bg-primary" : "bg-muted"}`}
                  style={{ height: `${(d.rev / maxM) * 100}%` }}
                />
                <span className={`text-[10px] ${d.m === "Июн" ? "text-primary font-medium" : "text-muted-foreground"}`}>{d.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top services */}
        <div className="bg-card border border-border rounded-lg p-5">
          <p className="text-[13px] font-semibold mb-4">Топ услуг</p>
          <div className="space-y-3">
            {[
              { name: "Маникюр + гель", pct: 85, rev: "32 400 ₽" },
              { name: "Маникюр",        pct: 68, rev: "21 000 ₽" },
              { name: "Ресницы",        pct: 52, rev: "17 500 ₽" },
              { name: "Педикюр",        pct: 40, rev: "12 600 ₽" },
            ].map(s => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-foreground/80">{s.name}</span>
                  <span className="text-[12px] font-medium">{s.rev}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Chat ───────────────────────────────────────────────── */
const CHATS = [
  { name: "Анна Ковалёва",   last: "Хорошо, жду вас!",             time: "10:23", unread: 0, av: "АК" },
  { name: "Мария Смирнова",  last: "Можно перенести на пятницу?",  time: "09:41", unread: 2, av: "МС" },
  { name: "Ольга Тихонова",  last: "Спасибо большое!",             time: "Вчера", unread: 0, av: "ОТ" },
  { name: "Наталья Попова",  last: "Записалась на следующую нед.", time: "Вчера", unread: 1, av: "НП" },
];

const MSGS = [
  { from: "client", text: "Привет! Хочу записаться на маникюр", time: "09:30" },
  { from: "master", text: "Добрый день! Есть время в пятницу в 14:00 или субботу в 11:00. Что удобнее?", time: "09:35" },
  { from: "client", text: "Пятница в 14:00 отлично!", time: "09:38" },
  { from: "master", text: "Записала вас! Напомню за день до визита.", time: "09:40" },
  { from: "client", text: "Можно перенести на пятницу?", time: "09:41" },
];

function ChatSection() {
  return (
    <div className="animate-in" style={{ height: "calc(100vh - 7rem)" }}>
      <div className="flex h-full gap-4">
        {/* List */}
        <div className="w-64 shrink-0 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <input className="input-field text-[12px]" placeholder="Поиск..." />
          </div>
          <div className="flex-1 overflow-y-auto">
            {CHATS.map((c, i) => (
              <div key={c.name} className={`px-3 py-3 flex items-center gap-2.5 cursor-pointer border-b border-border/60 last:border-0 transition-colors ${i === 1 ? "bg-muted/60" : "hover:bg-muted/30"}`}>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-[11px] font-semibold flex items-center justify-center shrink-0">
                  {c.av}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-medium truncate">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground shrink-0 ml-1">{c.time}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{c.last}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center shrink-0 font-medium">
                    {c.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold flex items-center justify-center">МС</div>
            <div>
              <p className="text-[13px] font-medium">Мария Смирнова</p>
              <p className="text-[11px] text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                онлайн
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MSGS.map((m, i) => (
              <div key={i} className={`flex ${m.from === "master" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed ${
                  m.from === "master"
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "master" ? "text-white/60 text-right" : "text-muted-foreground"}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center gap-2.5">
            <input className="input-field flex-1" placeholder="Написать сообщение..." />
            <button className="btn-primary py-2 px-3 shrink-0">
              <Icon name="Send" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Reviews ────────────────────────────────────────────── */
const REVIEWS = [
  { name: "Анна К.",    rating: 5, text: "Прекрасный мастер! Работа сделана на высшем уровне, держится уже 3 недели.", date: "10 июня 2026", status: "published" },
  { name: "Мария С.",   rating: 5, text: "Очень довольна результатом. Запись прошла быстро и удобно через бота.",     date: "8 июня 2026",  status: "published" },
  { name: "Ольга Т.",   rating: 4, text: "Всё хорошо, но немного задержались по времени. В целом довольна.",          date: "5 июня 2026",  status: "pending" },
  { name: "Наталья П.", rating: 5, text: "Лучший мастер! Хожу уже 2 года, всегда идеально!",                          date: "1 июня 2026",  status: "published" },
];

function ReviewsSection() {
  return (
    <div className="space-y-5 animate-in">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Средняя оценка", value: "4.9", sub: "из 5.0" },
          { label: "Всего отзывов",  value: "48",  sub: "за всё время" },
          { label: "На модерации",   value: "1",   sub: "требует действия" },
        ].map(s => (
          <div key={s.label} className="stat-block text-center">
            <p className="text-[12px] text-muted-foreground mb-2">{s.label}</p>
            <p className="text-[28px] font-semibold tracking-tight">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {REVIEWS.map(r => (
          <div key={r.name} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold flex items-center justify-center shrink-0">
                  {r.name.slice(0, 2)}
                </div>
                <div>
                  <p className="text-[13px] font-medium">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={12} className={i < r.rating ? "text-amber-400" : "text-border"} />
                  ))}
                </div>
                <span className={r.status === "published" ? "badge badge-green" : "badge badge-yellow"}>
                  {r.status === "published" ? "Опубликован" : "На модерации"}
                </span>
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{r.text}</p>
            {r.status === "pending" && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="btn-primary py-1.5 text-[12px]">Опубликовать</button>
                <button className="btn-ghost py-1.5 text-[12px] text-red-500 border-red-200 hover:bg-red-50">Отклонить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Settings ───────────────────────────────────────────── */
function SettingsSection() {
  return (
    <div className="max-w-xl space-y-5 animate-in">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <p className="text-[13px] font-semibold">Профиль</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary text-base font-semibold flex items-center justify-center">АМ</div>
            <button className="btn-ghost text-[12px] py-1.5">Изменить фото</button>
          </div>
          {[
            { label: "Имя и фамилия",      value: "Алина Мастерова" },
            { label: "Специализация",        value: "Мастер маникюра и педикюра" },
            { label: "Телефон",              value: "+7 900 123-45-67" },
            { label: "Город",                value: "Москва" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-[11px] font-medium text-muted-foreground block mb-1.5">{f.label}</label>
              <input className="input-field" defaultValue={f.value} />
            </div>
          ))}
          <button className="btn-primary">Сохранить изменения</button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <p className="text-[13px] font-semibold">Уведомления</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: "Новая запись",             desc: "Уведомление при записи клиента" },
            { label: "Отмена записи",             desc: "Уведомление при отмене" },
            { label: "Напоминания клиентам",      desc: "Автоотправка за 24ч и 3ч" },
          ].map(n => (
            <div key={n.label} className="px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-medium">{n.label}</p>
                <p className="text-[11px] text-muted-foreground">{n.desc}</p>
              </div>
              <button className="w-9 h-5 rounded-full bg-primary relative shrink-0 transition-colors">
                <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 right-0.5 shadow-sm" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
