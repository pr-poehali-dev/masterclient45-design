import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "CalendarCheck",
    title: "Онлайн-запись 24/7",
    desc: "Клиент записывается сам за 30 секунд. Без звонков, без переписки.",
    color: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: "BellRing",
    title: "Автонапоминания",
    desc: "За 24 и 3 часа до визита бот отправляет напоминание. No-show снижается на 40%.",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: "Bot",
    title: "Telegram и MAX",
    desc: "Свои боты в российских мессенджерах. Клиент записывается там, где удобно.",
    color: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: "Users",
    title: "Клиентская база",
    desc: "Все клиенты, история визитов, заметки и аллергии — в одном месте.",
    color: "from-violet-500/20 to-pink-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: "BarChart3",
    title: "Аналитика",
    desc: "Выручка, топ услуг, лучшие дни — видите картину бизнеса одним взглядом.",
    color: "from-pink-500/20 to-orange-500/10",
    border: "border-pink-500/20",
  },
  {
    icon: "MessageCircle",
    title: "Чат с клиентами",
    desc: "Переписка прямо из кабинета. Клиент пишет в бот, мастер отвечает здесь.",
    color: "from-orange-500/20 to-violet-500/10",
    border: "border-orange-500/20",
  },
];

const plans = [
  {
    name: "Бесплатный",
    price: "0",
    period: "навсегда",
    desc: "Для старта",
    features: ["1 мастер", "Онлайн-запись", "Клиентская база", "Telegram бот"],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "Стандарт",
    price: "300",
    period: "мес",
    desc: "Для растущих",
    features: ["До 5 мастеров", "Все функции", "Аналитика", "Рассылки", "Напоминания", "Портфолио"],
    cta: "Попробовать",
    highlight: true,
  },
  {
    name: "Безлимит",
    price: "900",
    period: "мес",
    desc: "Для студий",
    features: ["Без ограничений", "Приоритетная поддержка", "Командный доступ", "API интеграции", "Белый лейбл"],
    cta: "Выбрать",
    highlight: false,
  },
];

const steps = [
  { num: "01", title: "Регистрируетесь", desc: "5 минут — и кабинет готов к работе" },
  { num: "02", title: "Получаете ссылку", desc: "Ставите в профиль соцсетей и на визитку" },
  { num: "03", title: "Клиент записывается", desc: "Открывает ссылку → выбирает → готово" },
  { num: "04", title: "Всё автоматически", desc: "Напоминания уходят, запись в календаре" },
];

const stats = [
  { value: "30 сек", label: "время записи клиента" },
  { value: "−40%", label: "снижение no-show" },
  { value: "5 мин", label: "настройка с нуля" },
  { value: "24/7", label: "работает без мастера" },
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Orbs background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-violet w-[600px] h-[600px] -top-32 -left-32" />
        <div className="orb orb-pink w-[400px] h-[400px] top-1/3 right-0" />
        <div className="orb orb-orange w-[500px] h-[500px] bottom-0 left-1/3" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-md bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Icon name="Scissors" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-lg">MasterClient<span className="gradient-text">45</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors">Возможности</a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-white transition-colors">Как работает</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">Тарифы</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-white transition-colors px-4 py-2">
              Войти
            </Link>
            <Link
              to="/dashboard"
              className="gradient-bg text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Попробовать бесплатно
            </Link>
          </div>

          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
            <a href="#features" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Возможности</a>
            <a href="#how" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Как работает</a>
            <a href="#pricing" className="text-sm text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Тарифы</a>
            <Link to="/dashboard" className="gradient-bg text-white text-sm font-medium px-4 py-2.5 rounded-xl text-center">
              Попробовать бесплатно
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full gradient-bg inline-block" />
            Онлайн-запись для мастеров через Telegram и MAX
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Запись клиентов{" "}
            <span className="gradient-text">без звонков</span>{" "}
            и суеты
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Создайте личный кабинет за 5 минут. Клиенты записываются сами через Telegram или MAX. Напоминания приходят автоматически.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="gradient-animated text-white font-semibold px-8 py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
            >
              Начать бесплатно →
            </Link>
            <a
              href="#how"
              className="bg-white/5 border border-white/10 text-white font-medium px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-colors"
            >
              Как это работает
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((s) => (
              <div key={s.value} className="card-glass rounded-2xl p-4">
                <div className="font-display font-black text-2xl gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero mockup */}
        <div className="max-w-5xl mx-auto mt-16 relative">
          <div className="gradient-border rounded-3xl overflow-hidden card-glass card-glow">
            <div className="bg-background/50 p-3 border-b border-white/5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 bg-white/5 rounded-lg h-6 mx-4 flex items-center px-3">
                <span className="text-xs text-muted-foreground">masterclient45.ru/dashboard</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-[300px]">
              <div className="md:col-span-1 space-y-2">
                {["Главная", "Расписание", "Записи", "Клиенты", "Услуги"].map((item, i) => (
                  <div
                    key={item}
                    className={`px-3 py-2.5 rounded-xl text-sm flex items-center gap-2 ${i === 0 ? "nav-active font-medium" : "text-muted-foreground"}`}
                  >
                    <Icon
                      name={["Home", "Calendar", "ClipboardList", "Users", "Sparkles"][i] as "Home"}
                      size={16}
                    />
                    {item}
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Сегодня", val: "12 400 ₽", clr: "from-violet-500/20 to-purple-500/0" },
                    { label: "Записей", val: "6", clr: "from-pink-500/20 to-rose-500/0" },
                    { label: "Новых", val: "2", clr: "from-orange-500/20 to-amber-500/0" },
                  ].map((c) => (
                    <div key={c.label} className={`rounded-xl p-3 bg-gradient-to-br ${c.clr} border border-white/5`}>
                      <div className="text-xs text-muted-foreground">{c.label}</div>
                      <div className="font-display font-bold text-lg text-white mt-1">{c.val}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {["Анна К. — Маникюр — 14:00", "Мария С. — Массаж — 16:00", "Ольга Т. — Окрашивание — 18:00"].map((row) => (
                    <div key={row} className="booking-row py-2.5 px-3 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-foreground/80">{row}</span>
                      <span className="text-xs gradient-text font-medium">Подтверждено</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Всё, что нужно мастеру
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Инструменты, которые экономят время и увеличивают доход
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`card-hover rounded-2xl p-6 bg-gradient-to-br ${f.color} border ${f.border} stat-card`}
              >
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
                  <Icon name={f.icon as "Bot"} size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Как это <span className="gradient-text">работает</span>
            </h2>
            <p className="text-muted-foreground text-lg">Запуск от 5 минут</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="card-glass rounded-2xl p-8 card-hover gradient-border relative">
                <div className="font-display font-black text-5xl gradient-text opacity-30 mb-4">{s.num}</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-violet-500 to-pink-500 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Простые тарифы
            </h2>
            <p className="text-muted-foreground text-lg">Начните бесплатно, растите вместе с нами</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 relative overflow-hidden ${
                  p.highlight
                    ? "gradient-border card-glow bg-gradient-to-b from-violet-500/10 to-pink-500/5"
                    : "card-glass"
                }`}
              >
                {p.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="gradient-bg text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}
                <div className="text-sm text-muted-foreground mb-2">{p.desc}</div>
                <div className="font-display font-black text-4xl text-white mb-1">
                  {p.price === "0" ? "Бесплатно" : `${p.price} ₽`}
                </div>
                {p.price !== "0" && (
                  <div className="text-sm text-muted-foreground mb-6">в {p.period}</div>
                )}
                <div className={p.price === "0" ? "mb-6 mt-4" : "mb-6"} />

                <ul className="space-y-3 mb-8">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Icon name="Check" size={16} className="text-violet-400 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/dashboard"
                  className={`block text-center py-3 px-6 rounded-xl font-medium text-sm transition-all ${
                    p.highlight
                      ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-violet-500/25"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
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
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glass gradient-border rounded-3xl p-12 card-glow relative overflow-hidden">
            <div className="orb orb-violet w-64 h-64 -top-16 -left-16 opacity-20" />
            <div className="orb orb-orange w-48 h-48 -bottom-8 -right-8 opacity-15" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                Попробуйте{" "}
                <span className="gradient-text">бесплатно</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Регистрация за 5 минут. Первый мастер — навсегда бесплатно.
              </p>
              <Link
                to="/dashboard"
                className="inline-block gradient-animated text-white font-semibold px-10 py-4 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/30"
              >
                Создать кабинет →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center">
              <Icon name="Scissors" size={12} className="text-white" />
            </div>
            <span className="font-display font-bold text-sm text-white">MasterClient45</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2024 MasterClient45. Все права защищены.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
