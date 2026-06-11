import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const PAINS = [
  { icon: "PhoneOff",     text: "Клиенты звонят в неподходящий момент" },
  { icon: "MessageCircleX", text: "Записи теряются в мессенджерах" },
  { icon: "CalendarX2",  text: "Клиент не пришёл — день потерян" },
  { icon: "Clock",       text: "Часами ведёте таблицы вручную" },
];

const FEATURES = [
  {
    icon: "Smartphone",
    tag: "Запись",
    title: "Клиент пишет в бот —\nвы уже в кабинете",
    desc: "Telegram или MAX. Клиент выбирает время сам, вы ничего не делаете.",
    accent: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    icon: "BellRing",
    tag: "Напоминания",
    title: "−40% пропущенных\nвизитов с первого дня",
    desc: "За 24 часа и за 3 часа до визита бот автоматически пишет клиенту.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    icon: "BarChart3",
    tag: "Аналитика",
    title: "Видите деньги,\nа не просто записи",
    desc: "Выручка, средний чек, топ услуг — всё в одном экране, без Excel.",
    accent: "#059669",
    bg: "#ECFDF5",
  },
  {
    icon: "Users",
    tag: "Клиенты",
    title: "Вся история клиента\nв два клика",
    desc: "Заметки, аллергии, история визитов и любимые услуги — всё рядом.",
    accent: "#D97706",
    bg: "#FFFBEB",
  },
];

const PLANS = [
  {
    name: "Бесплатно",
    price: "0 ₽",
    sub: "навсегда",
    features: ["1 мастер", "Онлайн-запись", "Клиентская база", "Telegram-бот"],
    cta: "Начать",
    highlight: false,
  },
  {
    name: "Стандарт",
    price: "300 ₽",
    sub: "в месяц",
    features: ["До 5 мастеров", "Все функции", "Аналитика", "Рассылки", "Напоминания"],
    cta: "Попробовать 14 дней",
    highlight: true,
  },
  {
    name: "Безлимит",
    price: "900 ₽",
    sub: "в месяц",
    features: ["Без ограничений", "Приоритетная поддержка", "Командный доступ", "API"],
    cta: "Выбрать",
    highlight: false,
  },
];

const REVIEWS = [
  { name: "Марина, барбер",    text: "Раньше вела всё в заметках. Теперь клиенты пишут боту, а я просто работаю. Потрясающе просто.", stars: 5 },
  { name: "Ольга, косметолог", text: "No-show упали в 2 раза за первый месяц. Теперь напоминания уходят сами — я даже не думаю об этом.", stars: 5 },
  { name: "Дима, массажист",   text: "Настроил за вечер. Отправил ссылку клиентам — на следующий день уже пошли записи через бота.", stars: 5 },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav style={{ backdropFilter: "saturate(180%) blur(20px)", background: "rgba(255,255,255,0.85)" }}
        className="sticky top-0 z-50 border-b border-black/[0.06]">
        <div className="max-w-[980px] mx-auto px-5 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              <Icon name="Scissors" size={14} className="text-white" />
            </div>
            <span className="font-semibold text-[15px] tracking-[-0.02em]">MasterClient45</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {[["Возможности","#features"],["Как работает","#how"],["Тарифы","#pricing"],["Отзывы","#reviews"]].map(([l,h]) => (
              <a key={l} href={h} className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
              Войти
            </Link>
            <Link to="/dashboard"
              className="text-[13px] font-medium text-white px-4 py-[7px] rounded-full transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              Попробовать бесплатно
            </Link>
          </div>

          <button className="md:hidden text-[#6e6e73]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-5 pt-3 space-y-4 border-t border-black/[0.06] bg-white">
            {[["Возможности","#features"],["Как работает","#how"],["Тарифы","#pricing"]].map(([l,h]) => (
              <a key={l} href={h} className="block text-[15px] text-[#6e6e73]" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
            <Link to="/dashboard"
              className="block text-center text-[14px] font-medium text-white py-3 rounded-full"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              Попробовать бесплатно
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-[90px] pb-[80px] px-5 text-center overflow-hidden">
        {/* bg decoration */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />

        <div className="relative max-w-[700px] mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] mb-8 text-[13px] font-medium"
            style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] inline-block" />
            Онлайн-запись для мастеров и салонов
          </div>

          <h1 className="font-semibold tracking-[-0.04em] leading-[1.06] mb-6"
            style={{ fontSize: "clamp(38px,6vw,64px)" }}>
            Клиенты записываются сами.<br />
            <span style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Вы просто работаете.
            </span>
          </h1>

          <p className="text-[#6e6e73] mb-10 mx-auto leading-relaxed"
            style={{ fontSize: "clamp(16px,2vw,20px)", maxWidth: "520px" }}>
            Больше никаких записей в Excel и потерянных звонков.
            Ваш бот в Telegram принимает запись за 30 секунд — даже пока вы спите.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link to="/dashboard"
              className="text-[15px] font-semibold text-white px-8 py-4 rounded-full shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 32px rgba(37,99,235,0.35)" }}>
              Начать бесплатно →
            </Link>
            <a href="#how"
              className="text-[15px] font-medium text-[#1d1d1f] px-8 py-4 rounded-full transition-colors hover:bg-black/[0.04]">
              Как это работает ↓
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
            {[
              { val: "30 сек",  label: "время записи клиента" },
              { val: "−40%",    label: "меньше no-show" },
              { val: "5 мин",   label: "настройка с нуля" },
              { val: "24/7",    label: "работает без вас" },
            ].map(s => (
              <div key={s.val} className="bg-white py-6 text-center">
                <p className="font-semibold tracking-tight text-[#1d1d1f]" style={{ fontSize: "28px" }}>{s.val}</p>
                <p className="text-[12px] text-[#6e6e73] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────── */}
      <section className="py-[80px] px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-4">Узнаёте себя?</p>
          <h2 className="font-semibold tracking-[-0.03em] mb-10" style={{ fontSize: "clamp(28px,4vw,42px)" }}>
            Каждый день вы теряете деньги<br />из-за ручного учёта
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAINS.map(p => (
              <div key={p.text} className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 text-left shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(239,68,68,0.08)" }}>
                  <Icon name={p.icon as "Clock"} size={20} className="text-red-500" />
                </div>
                <p className="text-[14px] font-medium leading-snug">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[16px] font-medium text-[#1d1d1f]">
            MasterClient45 решает все эти проблемы — за 5 минут настройки.
          </p>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section id="features" className="py-[100px] px-5 bg-white">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Возможности</p>
            <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Всё под контролем.<br />Без лишних усилий.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map(f => (
              <div key={f.title}
                className="rounded-3xl p-8 flex flex-col gap-5"
                style={{ background: f.bg }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: f.accent }}>
                  <Icon name={f.icon as "Smartphone"} size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-2"
                    style={{ color: f.accent }}>{f.tag}</p>
                  <h3 className="font-semibold tracking-[-0.025em] leading-[1.2] mb-2 whitespace-pre-line"
                    style={{ fontSize: "22px" }}>{f.title}</h3>
                  <p className="text-[14px] text-[#6e6e73] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ──────────────────────────────────────────── */}
      <section id="how" className="py-[100px] px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Как работает</p>
            <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Запуск за 5 минут
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { n: "01", title: "Регистрируетесь",     desc: "Заполняете профиль, добавляете услуги и рабочие часы.", color: "#2563EB" },
              { n: "02", title: "Получаете ссылку",    desc: "Ваша личная страница и бот готовы. Ставите ссылку в Instagram, ВКонтакте, на визитку.", color: "#7C3AED" },
              { n: "03", title: "Клиент записывается", desc: "Открывает ссылку или пишет боту → выбирает услугу и время → готово за 30 секунд.", color: "#059669" },
              { n: "04", title: "Работаете спокойно",  desc: "Напоминания уходят сами, записи в календаре, выручка считается автоматически.", color: "#D97706" },
            ].map((s, i) => (
              <div key={s.n} className="bg-white rounded-2xl px-7 py-6 flex items-start gap-5 shadow-sm">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px] text-white"
                  style={{ background: s.color }}>
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold text-[16px] mb-1">{s.title}</p>
                  <p className="text-[14px] text-[#6e6e73] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ─────────────────────────────────────────── */}
      <section className="py-[100px] px-5 bg-white overflow-hidden">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Интерфейс</p>
            <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Всё в одном экране
            </h2>
          </div>

          {/* App mockup */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08]"
            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.15)" }}>
            {/* Chrome */}
            <div className="px-5 py-3 flex items-center gap-3 border-b border-black/[0.06]"
              style={{ background: "#F5F5F7" }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 max-w-xs mx-auto bg-white rounded-md h-6 flex items-center justify-center border border-black/[0.08]">
                <span className="text-[11px] text-[#6e6e73]">masterclient45.ru/dashboard</span>
              </div>
            </div>

            {/* UI */}
            <div className="flex bg-white" style={{ minHeight: "340px" }}>
              {/* Sidebar */}
              <div className="w-48 shrink-0 border-r border-black/[0.06] p-3 space-y-0.5"
                style={{ background: "#111827" }}>
                <div className="flex items-center gap-2 px-3 py-2 mb-3">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
                    <Icon name="Scissors" size={12} className="text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-white">MasterClient45</span>
                </div>
                {[
                  { label: "Главная",    active: true },
                  { label: "Расписание", active: false },
                  { label: "Записи",     active: false },
                  { label: "Клиенты",   active: false },
                  { label: "Аналитика", active: false },
                ].map(item => (
                  <div key={item.label}
                    className={`px-3 py-2 rounded-lg text-[11px] ${item.active ? "text-white font-medium" : "text-[#6B7280]"}`}
                    style={item.active ? { background: "rgba(37,99,235,0.25)" } : {}}>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <p className="text-[13px] font-semibold mb-4">Сегодня, 11 июня</p>
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    { l: "Выручка",  v: "11 500 ₽", c: "#2563EB" },
                    { l: "Записей",  v: "5",         c: "#7C3AED" },
                    { l: "Новых",    v: "2",         c: "#059669" },
                    { l: "Ср. чек", v: "2 300 ₽",   c: "#D97706" },
                  ].map(c => (
                    <div key={c.l} className="rounded-xl p-3 border border-black/[0.06]">
                      <p className="text-[10px] text-[#6e6e73] mb-1">{c.l}</p>
                      <p className="font-semibold text-[13px]" style={{ color: c.c }}>{c.v}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-black/[0.06] overflow-hidden text-[11px]">
                  <div className="px-4 py-2.5 font-semibold border-b border-black/[0.06] text-[12px]">Записи на сегодня</div>
                  {[
                    ["10:00","Анна К.","Маникюр + гель","2 500 ₽","#059669"],
                    ["12:00","Мария С.","Педикюр","1 800 ₽","#059669"],
                    ["14:00","Ольга Т.","Укрепление ногтей","2 200 ₽","#D97706"],
                    ["16:00","Наталья П.","Ресницы","3 500 ₽","#2563EB"],
                  ].map(r => (
                    <div key={r[1]} className="px-4 py-2.5 flex items-center gap-3 border-b border-black/[0.04] last:border-0 hover:bg-[#F5F5F7] transition-colors">
                      <span className="text-[#6e6e73] w-10 shrink-0">{r[0]}</span>
                      <span className="font-medium flex-shrink-0">{r[1]}</span>
                      <span className="text-[#6e6e73] flex-1">{r[2]}</span>
                      <span className="font-semibold">{r[3]}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium text-white"
                        style={{ background: r[4] as string }}>
                        ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section id="reviews" className="py-[100px] px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Отзывы</p>
            <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Мастера уже зарабатывают больше
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-white rounded-3xl p-7 shadow-sm flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#F59E0B">
                      <path d="M8 1.5l1.854 3.757 4.146.602-3 2.927.708 4.129L8 10.771l-3.708 1.944.708-4.129-3-2.927 4.146-.602L8 1.5z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] leading-relaxed text-[#1d1d1f] flex-1">«{r.text}»</p>
                <p className="text-[13px] font-semibold text-[#6e6e73]">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-[100px] px-5 bg-white">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Тарифы</p>
            <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Начните бесплатно
            </h2>
            <p className="text-[16px] text-[#6e6e73] mt-3">Платите только когда начнёте зарабатывать больше</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map(p => (
              <div key={p.name}
                className="rounded-3xl p-7 flex flex-col gap-6"
                style={p.highlight
                  ? { background: "linear-gradient(145deg,#2563EB,#7C3AED)", color: "#fff" }
                  : { background: "#F5F5F7" }
                }>
                <div>
                  <p className={`text-[13px] font-semibold mb-3 ${p.highlight ? "text-blue-200" : "text-[#6e6e73]"}`}>
                    {p.name}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-semibold tracking-tight ${p.highlight ? "text-white" : "text-[#1d1d1f]"}`}
                      style={{ fontSize: "32px" }}>
                      {p.price}
                    </span>
                    <span className={`text-[13px] ${p.highlight ? "text-blue-200" : "text-[#6e6e73]"}`}>{p.sub}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px]">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${p.highlight ? "bg-white/20" : "bg-[#2563EB]/10"}`}>
                        <Icon name="Check" size={10} className={p.highlight ? "text-white" : "text-[#2563EB]"} />
                      </div>
                      <span className={p.highlight ? "text-blue-100" : "text-[#1d1d1f]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard"
                  className={`block text-center py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.01] ${
                    p.highlight
                      ? "bg-white text-[#2563EB]"
                      : "text-white"
                  }`}
                  style={!p.highlight ? { background: "linear-gradient(135deg,#2563EB,#7C3AED)" } : {}}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section className="py-[100px] px-5 text-center overflow-hidden relative"
        style={{ background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
        <div className="relative max-w-[600px] mx-auto">
          <h2 className="font-semibold text-white tracking-[-0.03em] mb-4"
            style={{ fontSize: "clamp(28px,5vw,48px)" }}>
            Перестаньте терять клиентов<br />из-за ручного учёта
          </h2>
          <p className="text-blue-200 text-[16px] mb-10 leading-relaxed">
            Первый мастер — навсегда бесплатно. Регистрация занимает 5 минут.
          </p>
          <Link to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] font-semibold text-[16px] px-10 py-4 rounded-full hover:scale-[1.02] transition-transform shadow-xl"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}>
            Создать кабинет бесплатно →
          </Link>
          <p className="text-blue-300 text-[13px] mt-5">Без кредитной карты · Без обязательств</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-black/[0.06] py-8 px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              <Icon name="Scissors" size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold">MasterClient45</span>
          </div>
          <p className="text-[12px] text-[#6e6e73]">© 2024 MasterClient45 · masterclient45.ru</p>
          <div className="flex gap-5">
            <a href="#" className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Конфиденциальность</a>
            <a href="#" className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
