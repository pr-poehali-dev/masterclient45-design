import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const FEATURES = [
  { icon: "CalendarCheck", title: "Онлайн-запись 24/7",     desc: "Клиент записывается сам за 30 секунд — без звонков и переписки." },
  { icon: "BellRing",      title: "Автонапоминания",         desc: "За 24 и 3 часа до визита. Снижает no-show на 30–40%." },
  { icon: "Bot",           title: "Telegram и MAX",          desc: "Свои боты в российских мессенджерах, без стороннего сайта." },
  { icon: "Users",         title: "Клиентская база",         desc: "История визитов, заметки об аллергиях — всё в одном месте." },
  { icon: "BarChart2",     title: "Аналитика",               desc: "Выручка, топ услуг, лучшие дни — в понятных графиках." },
  { icon: "MessageSquare", title: "Чат с клиентами",         desc: "Переписка прямо из кабинета. Бот → вы отвечаете здесь." },
];

const PLANS = [
  {
    name: "Бесплатный", price: "0", period: "",
    features: ["1 мастер", "Онлайн-запись", "Клиентская база", "Telegram-бот"],
    cta: "Начать бесплатно", highlight: false,
  },
  {
    name: "Стандарт", price: "300", period: "/ мес",
    features: ["До 5 мастеров", "Все функции", "Аналитика", "Рассылки", "Напоминания"],
    cta: "Попробовать", highlight: true,
  },
  {
    name: "Безлимит", price: "900", period: "/ мес",
    features: ["Без ограничений", "Приоритетная поддержка", "Командный доступ", "API интеграции"],
    cta: "Выбрать", highlight: false,
  },
];

const STEPS = [
  { n: "1", title: "Регистрируетесь",     desc: "5 минут — и кабинет готов к работе" },
  { n: "2", title: "Получаете ссылку",    desc: "Ставите в соцсети и на визитку" },
  { n: "3", title: "Клиент записывается", desc: "Открывает ссылку → выбирает → подтверждает" },
  { n: "4", title: "Всё автоматически",   desc: "Напоминания уходят, запись в календаре" },
];

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <Icon name="Scissors" size={14} className="text-white" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight">MasterClient45</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Возможности</a>
            <a href="#how"      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Как работает</a>
            <a href="#pricing"  className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Тарифы</a>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/dashboard" className="btn-ghost text-[13px] py-1.5">Войти</Link>
            <Link to="/dashboard" className="btn-primary text-[13px] py-1.5">Попробовать бесплатно</Link>
          </div>

          <button className="md:hidden text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border px-5 py-4 space-y-3 bg-background">
            <a href="#features" className="block text-[13px] text-muted-foreground" onClick={() => setMobileOpen(false)}>Возможности</a>
            <a href="#how"      className="block text-[13px] text-muted-foreground" onClick={() => setMobileOpen(false)}>Как работает</a>
            <a href="#pricing"  className="block text-[13px] text-muted-foreground" onClick={() => setMobileOpen(false)}>Тарифы</a>
            <Link to="/dashboard" className="btn-primary w-full justify-center text-[13px]">Попробовать бесплатно</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-20 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Онлайн-запись через Telegram и MAX
          </div>

          <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[1.08] mb-5">
            Запись клиентов<br />
            <span className="text-primary">без звонков</span> и переписки
          </h1>

          <p className="text-[15px] md:text-[17px] text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Создайте личный кабинет за 5 минут. Клиенты записываются сами через Telegram или MAX — напоминания отправляются автоматически.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard" className="btn-primary justify-center text-[14px] py-2.5 px-7">
              Начать бесплатно →
            </Link>
            <a href="#how" className="btn-ghost justify-center text-[14px] py-2.5 px-7">
              Как это работает
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-border">
            {[
              { val: "30 сек", desc: "время записи" },
              { val: "−40%",   desc: "меньше no-show" },
              { val: "5 мин",  desc: "настройка" },
              { val: "24/7",   desc: "работает без вас" },
            ].map(s => (
              <div key={s.val} className="text-center">
                <p className="text-[18px] font-semibold">{s.val}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="px-5 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="border-b border-border bg-muted/50 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
              <div className="bg-background border border-border rounded h-5 flex items-center px-2.5 text-[10px] text-muted-foreground mx-auto max-w-xs w-full">
                masterclient45.ru/dashboard
              </div>
            </div>
            <div className="flex h-64 bg-background">
              <div className="w-40 bg-[hsl(220_13%_9%)] border-r border-[hsl(220_13%_14%)] shrink-0 p-2 space-y-0.5">
                {[
                  { label: "Главная",    active: true },
                  { label: "Расписание", active: false },
                  { label: "Записи",     active: false },
                  { label: "Клиенты",   active: false },
                ].map(item => (
                  <div key={item.label} className={`px-2.5 py-1.5 rounded text-[10px] ${item.active ? "bg-[hsl(220_13%_14%)] text-white" : "text-[hsl(220_9%_45%)]"}`}>
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[["Выручка","11 500 ₽"],["Записей","5"],["Новых","2"],["Ср. чек","2 300 ₽"]].map(([l,v]) => (
                    <div key={l} className="border border-border rounded p-2">
                      <p className="text-[9px] text-muted-foreground">{l}</p>
                      <p className="text-[12px] font-semibold mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="border border-border rounded text-[10px]">
                  <div className="border-b border-border px-3 py-2 font-medium text-[11px]">Записи на сегодня</div>
                  {[["10:00","Анна К.","Маникюр + гель","2 500 ₽"],["12:00","Мария С.","Педикюр","1 800 ₽"],["14:00","Ольга Т.","Укрепление","2 200 ₽"]].map(r => (
                    <div key={r[1]} className="px-3 py-2 flex items-center gap-2 border-b border-border/60 last:border-0 text-[10px]">
                      <span className="text-muted-foreground w-8 shrink-0">{r[0]}</span>
                      <span className="font-medium">{r[1]}</span>
                      <span className="text-muted-foreground flex-1">{r[2]}</span>
                      <span className="font-medium">{r[3]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-5 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-tight mb-3">Всё, что нужно мастеру</h2>
            <p className="text-[14px] text-muted-foreground max-w-lg mx-auto">Инструменты, которые экономят время и снижают количество пропущенных визитов</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-card p-6 hover:bg-muted/40 transition-colors">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={f.icon as "Home"} size={16} className="text-primary" />
                </div>
                <h3 className="text-[14px] font-semibold mb-1.5">{f.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-20 px-5 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-tight mb-3">Как это работает</h2>
            <p className="text-[14px] text-muted-foreground">Запуск за 5 минут</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-4 left-full w-8 h-px bg-border -translate-x-4 z-0" />
                )}
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-[13px] font-semibold flex items-center justify-center mb-3 relative z-10">
                  {s.n}
                </div>
                <h3 className="text-[14px] font-semibold mb-1">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-5 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-tight mb-3">Простые тарифы</h2>
            <p className="text-[14px] text-muted-foreground">Начните бесплатно, платите когда вырастете</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map(p => (
              <div key={p.name} className={`rounded-xl p-6 border ${p.highlight ? "border-primary" : "border-border bg-card"}`}>
                {p.highlight && <span className="badge badge-blue mb-3 block w-fit">Популярный</span>}
                <p className="text-[12px] text-muted-foreground mb-1">{p.name}</p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-[28px] font-semibold tracking-tight">
                    {p.price === "0" ? "Бесплатно" : `${p.price} ₽`}
                  </span>
                  {p.period && <span className="text-[13px] text-muted-foreground">{p.period}</span>}
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[13px]">
                      <Icon name="Check" size={13} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/dashboard"
                  className={`block text-center py-2 rounded-md text-[13px] font-medium transition-colors ${
                    p.highlight ? "bg-primary text-white hover:bg-primary/90" : "border border-border hover:bg-muted"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-[28px] font-semibold tracking-tight mb-3">Готовы начать?</h2>
          <p className="text-[14px] text-muted-foreground mb-7">Первый мастер — навсегда бесплатно. Регистрация за 5 минут.</p>
          <Link to="/dashboard" className="btn-primary text-[14px] py-2.5 px-8 inline-flex">
            Создать кабинет →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-7 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Icon name="Scissors" size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold">MasterClient45</span>
          </div>
          <p className="text-[12px] text-muted-foreground">© 2024 MasterClient45</p>
          <div className="flex gap-5">
            <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Конфиденциальность</a>
            <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
