import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

/* ── Intersection Observer hook ─────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated counter ────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); } else setVal(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const PAINS = [
  { icon: "PhoneOff",       text: "Клиенты звонят в неподходящий момент" },
  { icon: "MessageCircleX", text: "Записи теряются в мессенджерах" },
  { icon: "CalendarX2",     text: "Клиент не пришёл — день потерян" },
  { icon: "Clock",          text: "Часами ведёте таблицы вручную" },
];

const FEATURES = [
  { icon: "Smartphone", tag: "Запись",      title: "Клиент пишет в бот —\nвы уже в кабинете",          desc: "Telegram или MAX. Клиент выбирает время сам, вы ничего не делаете.", accent: "#2563EB", bg: "#EFF6FF" },
  { icon: "BellRing",   tag: "Напоминания", title: "−40% пропущенных\nвизитов с первого дня",           desc: "За 24 часа и за 3 часа до визита бот автоматически пишет клиенту.",    accent: "#7C3AED", bg: "#F5F3FF" },
  { icon: "BarChart3",  tag: "Аналитика",   title: "Видите деньги,\nа не просто записи",                desc: "Выручка, средний чек, топ услуг — всё в одном экране, без Excel.",       accent: "#059669", bg: "#ECFDF5" },
  { icon: "Users",      tag: "Клиенты",     title: "Вся история клиента\nв два клика",                  desc: "Заметки, аллергии, история визитов и любимые услуги — всё рядом.",       accent: "#D97706", bg: "#FFFBEB" },
];

const PLANS = [
  { name: "Бесплатно", price: "0 ₽",   sub: "навсегда",  features: ["1 мастер", "Онлайн-запись", "Клиентская база", "Telegram-бот"],                      cta: "Начать",              highlight: false },
  { name: "Стандарт",  price: "300 ₽", sub: "в месяц",   features: ["До 5 мастеров", "Все функции", "Аналитика", "Рассылки", "Напоминания"],               cta: "Попробовать 14 дней", highlight: true  },
  { name: "Безлимит",  price: "900 ₽", sub: "в месяц",   features: ["Без ограничений", "Приоритетная поддержка", "Командный доступ", "API интеграции"],    cta: "Выбрать",             highlight: false },
];

const REVIEWS = [
  { name: "Марина, барбер",    text: "Раньше вела всё в заметках. Теперь клиенты пишут боту, а я просто работаю. Потрясающе просто." },
  { name: "Ольга, косметолог", text: "No-show упали в 2 раза за первый месяц. Напоминания уходят сами — я даже не думаю об этом." },
  { name: "Дима, массажист",   text: "Настроил за вечер. Отправил ссылку клиентам — на следующий день уже пошли записи через бота." },
];

/* ── Fade-in wrapper ────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* mouse parallax for hero blobs */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── global keyframes ─────────────────────────────── */}
      <style>{`
        @keyframes blob-spin { 0%,100%{transform:translate(-50%,-50%) rotate(0deg) scale(1)} 33%{transform:translate(-50%,-50%) rotate(120deg) scale(1.08)} 66%{transform:translate(-50%,-50%) rotate(240deg) scale(0.94)} }
        @keyframes float-y   { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-14px)} }
        @keyframes float-y2  { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(10px)}  }
        @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse-ring{ 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.55);opacity:0} }
        @keyframes dash-draw { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
        .blob-spin  { animation: blob-spin 18s linear infinite; }
        .float-y    { animation: float-y 5s ease-in-out infinite; }
        .float-y2   { animation: float-y2 6.5s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .ticker     { animation: ticker 22s linear infinite; }
      `}</style>

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
            <Link to="/dashboard" className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Войти</Link>
            <Link to="/dashboard"
              className="text-[13px] font-medium text-white px-4 py-[7px] rounded-full hover:opacity-85 transition-opacity"
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
            <Link to="/dashboard" className="block text-center text-[14px] font-medium text-white py-3 rounded-full"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              Попробовать бесплатно
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-[90px] pb-[80px] px-5 text-center overflow-hidden">

        {/* Animated mesh blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* blob 1 — blue */}
          <div className="blob-spin absolute rounded-full opacity-[0.18]"
            style={{
              width: 680, height: 680,
              left: "50%", top: "10%",
              background: "radial-gradient(circle,#3B82F6,#2563EB 40%,transparent 70%)",
              filter: "blur(60px)",
              transform: `translate(calc(-50% + ${mouse.x * 30}px), calc(-50% + ${mouse.y * 20}px))`,
              transition: "transform 0.8s ease-out",
            }} />
          {/* blob 2 — violet */}
          <div className="blob-spin absolute rounded-full opacity-[0.13]"
            style={{
              width: 500, height: 500,
              left: "65%", top: "30%",
              background: "radial-gradient(circle,#A78BFA,#7C3AED 40%,transparent 70%)",
              filter: "blur(50px)",
              animationDelay: "-6s",
              transform: `translate(calc(-50% + ${mouse.x * -20}px), calc(-50% + ${mouse.y * 15}px))`,
              transition: "transform 0.8s ease-out",
            }} />
          {/* blob 3 — pink accent */}
          <div className="blob-spin absolute rounded-full opacity-[0.10]"
            style={{
              width: 400, height: 400,
              left: "20%", top: "40%",
              background: "radial-gradient(circle,#F472B6,#EC4899 40%,transparent 70%)",
              filter: "blur(55px)",
              animationDelay: "-12s",
            }} />

          {/* grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#2563EB" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating UI chips */}
        <div className="hidden lg:block absolute left-[6%] top-[22%] float-y" style={{ animationDelay: "0s" }}>
          <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/[0.06]"
            style={{ minWidth: 190 }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 shrink-0">
              <Icon name="CalendarCheck" size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-[11px] text-[#6e6e73]">Новая запись</p>
              <p className="text-[13px] font-semibold">Анна — 14:00</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-[6%] top-[28%] float-y2" style={{ animationDelay: "1s" }}>
          <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/[0.06]"
            style={{ minWidth: 200 }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(37,99,235,0.1)" }}>
              <Icon name="TrendingUp" size={18} className="text-[#2563EB]" />
            </div>
            <div>
              <p className="text-[11px] text-[#6e6e73]">Выручка сегодня</p>
              <p className="text-[13px] font-semibold text-[#2563EB]">+11 500 ₽</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute left-[8%] bottom-[18%] float-y2" style={{ animationDelay: "2s" }}>
          <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-black/[0.06]">
            <div className="relative w-9 h-9 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                <Icon name="BellRing" size={18} className="text-violet-500" />
              </div>
              <span className="pulse-ring absolute inset-0 rounded-xl border-2 border-violet-400" />
            </div>
            <div>
              <p className="text-[11px] text-[#6e6e73]">Напоминание</p>
              <p className="text-[13px] font-semibold">отправлено</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-[7%] bottom-[22%] float-y" style={{ animationDelay: "0.5s" }}>
          <div className="bg-white rounded-2xl shadow-xl px-4 py-3 border border-black/[0.06]">
            <p className="text-[11px] text-[#6e6e73] mb-1.5">No-show за месяц</p>
            <div className="flex items-end gap-1.5">
              {[60, 45, 55, 30, 20, 15, 8].map((h, i) => (
                <div key={i} className="w-3 rounded-t-sm"
                  style={{ height: h / 2, background: i < 4 ? "#FCA5A5" : i < 6 ? "#FDBA74" : "#6EE7B7", transition: "height 0.5s ease" }} />
              ))}
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 mt-1.5">−40% с MasterClient45</p>
          </div>
        </div>

        {/* Main content */}
        <div className="relative max-w-[680px] mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-[6px] mb-8 text-[13px] font-medium"
            style={{ background: "rgba(37,99,235,0.08)", color: "#2563EB",
              animation: "fade-in-up 0.6s ease both" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] inline-block" />
            Онлайн-запись для мастеров и салонов
          </div>

          <h1 className="font-semibold tracking-[-0.04em] leading-[1.06] mb-6"
            style={{ fontSize: "clamp(36px,6vw,66px)", animation: "fade-in-up 0.65s 0.1s ease both", opacity: 0 }}>
            Клиенты записываются сами.<br />
            <span style={{ background: "linear-gradient(135deg,#2563EB 0%,#7C3AED 50%,#EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "gradient-pan 4s ease infinite" }}>
              Вы просто работаете.
            </span>
          </h1>

          <style>{`
            @keyframes fade-in-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
            @keyframes gradient-pan { 0%{background-position:0%} 50%{background-position:100%} 100%{background-position:0%} }
          `}</style>

          <p className="text-[#6e6e73] mb-10 mx-auto leading-relaxed"
            style={{ fontSize: "clamp(16px,2vw,20px)", maxWidth: "500px", animation: "fade-in-up 0.65s 0.2s ease both", opacity: 0 }}>
            Больше никаких записей в Excel и потерянных звонков. Ваш бот в Telegram принимает запись за 30 секунд — даже пока вы спите.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            style={{ animation: "fade-in-up 0.65s 0.3s ease both", opacity: 0 }}>
            <Link to="/dashboard"
              className="text-[15px] font-semibold text-white px-8 py-4 rounded-full transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)", boxShadow: "0 8px 32px rgba(37,99,235,0.38)" }}>
              Начать бесплатно →
            </Link>
            <a href="#how" className="text-[15px] font-medium text-[#1d1d1f] px-8 py-4 rounded-full hover:bg-black/[0.04] transition-colors">
              Как это работает ↓
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]"
            style={{ animation: "fade-in-up 0.65s 0.4s ease both", opacity: 0 }}>
            {[
              { val: 30,  suffix: " сек", label: "время записи" },
              { val: 40,  suffix: "%",    label: "меньше no-show" },
              { val: 5,   suffix: " мин", label: "настройка" },
              { val: 247, suffix: "+",    label: "мастеров в сервисе" },
            ].map(s => (
              <div key={s.label} className="bg-white py-6 text-center">
                <p className="font-semibold tracking-tight text-[#1d1d1f]" style={{ fontSize: "26px" }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </p>
                <p className="text-[12px] text-[#6e6e73] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="py-4 border-y border-black/[0.06] overflow-hidden" style={{ background: "#F5F5F7" }}>
        <div className="ticker flex gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
          {Array.from({ length: 2 }).map((_, pass) => (
            <div key={pass} className="flex gap-12">
              {["Онлайн-запись 24/7","Telegram-бот","Автонапоминания","Клиентская база","Аналитика выручки","Чат с клиентами","Без Excel","Без звонков","Работает пока вы спите"].map(t => (
                <span key={t} className="flex items-center gap-2 text-[13px] font-medium text-[#6e6e73]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] opacity-60 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PAIN ─────────────────────────────────────────── */}
      <section className="py-[90px] px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-4">Узнаёте себя?</p>
            <h2 className="font-semibold tracking-[-0.03em] mb-10" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Каждый день вы теряете деньги<br />из-за ручного учёта
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAINS.map((p, i) => (
              <Reveal key={p.text} delay={i * 80}>
                <div className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 text-left shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(239,68,68,0.08)" }}>
                    <Icon name={p.icon as "Clock"} size={20} className="text-red-500" />
                  </div>
                  <p className="text-[14px] font-medium leading-snug">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320}>
            <p className="mt-8 text-[16px] font-semibold text-[#1d1d1f]">
              MasterClient45 решает все эти проблемы — за 5 минут настройки.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section id="features" className="py-[100px] px-5 bg-white">
        <div className="max-w-[980px] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Возможности</p>
              <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,46px)" }}>
                Всё под контролем.<br />Без лишних усилий.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="rounded-3xl p-8 flex flex-col gap-5 group hover:scale-[1.01] transition-transform cursor-default"
                  style={{ background: f.bg }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                    style={{ background: f.accent }}>
                    <Icon name={f.icon as "Smartphone"} size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-2" style={{ color: f.accent }}>{f.tag}</p>
                    <h3 className="font-semibold tracking-[-0.025em] leading-[1.2] mb-2 whitespace-pre-line" style={{ fontSize: "22px" }}>{f.title}</h3>
                    <p className="text-[14px] text-[#6e6e73] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW ──────────────────────────────────────────── */}
      <section id="how" className="py-[100px] px-5 relative overflow-hidden" style={{ background: "#F5F5F7" }}>
        {/* decorative line */}
        <svg className="absolute left-1/2 top-[120px] -translate-x-1/2 hidden md:block" width="2" height="380" style={{ opacity: 0.12 }}>
          <line x1="1" y1="0" x2="1" y2="380" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 6" />
        </svg>

        <div className="max-w-[640px] mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Как работает</p>
              <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,46px)" }}>Запуск за 5 минут</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              { n: "01", title: "Регистрируетесь",     desc: "Заполняете профиль, добавляете услуги и рабочие часы.",                                           color: "#2563EB" },
              { n: "02", title: "Получаете ссылку",    desc: "Ваша личная страница и бот готовы. Ставите ссылку в Instagram, ВКонтакте, на визитку.",            color: "#7C3AED" },
              { n: "03", title: "Клиент записывается", desc: "Открывает ссылку или пишет боту → выбирает услугу и время → готово за 30 секунд.",                color: "#059669" },
              { n: "04", title: "Работаете спокойно",  desc: "Напоминания уходят сами, записи в календаре, выручка считается автоматически.",                   color: "#D97706" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="bg-white rounded-2xl px-7 py-6 flex items-start gap-5 shadow-sm border border-black/[0.04] hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px] text-white"
                    style={{ background: s.color, boxShadow: `0 4px 14px ${s.color}55` }}>
                    {s.n}
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] mb-1">{s.title}</p>
                    <p className="text-[14px] text-[#6e6e73] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP DEMO ─────────────────────────────────────── */}
      <section className="py-[100px] px-5 bg-white overflow-hidden">
        <div className="max-w-[980px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Интерфейс</p>
              <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,46px)" }}>Всё в одном экране</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl overflow-hidden border border-black/[0.07]"
              style={{ boxShadow: "0 32px 80px rgba(37,99,235,0.12), 0 8px 24px rgba(0,0,0,0.08)" }}>
              {/* Chrome */}
              <div className="px-5 py-3 flex items-center gap-3 border-b border-black/[0.06]" style={{ background: "#F0F0F3" }}>
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
              <div className="flex bg-white" style={{ minHeight: 340 }}>
                <div className="w-48 shrink-0 border-r border-black/[0.06] p-3 space-y-0.5" style={{ background: "#111827" }}>
                  <div className="flex items-center gap-2 px-3 py-2 mb-3">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
                      <Icon name="Scissors" size={12} className="text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-white">MasterClient45</span>
                  </div>
                  {[["Главная",true],["Расписание",false],["Записи",false],["Клиенты",false],["Аналитика",false]].map(([l, a]) => (
                    <div key={String(l)} className={`px-3 py-2 rounded-lg text-[11px] ${a ? "text-white font-medium" : "text-[#6B7280]"}`}
                      style={a ? { background: "rgba(37,99,235,0.25)" } : {}}>
                      {l}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-5">
                  <p className="text-[13px] font-semibold mb-4">Сегодня, 11 июня</p>
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {[["Выручка","11 500 ₽","#2563EB"],["Записей","5","#7C3AED"],["Новых","2","#059669"],["Ср. чек","2 300 ₽","#D97706"]].map(([l,v,c]) => (
                      <div key={String(l)} className="rounded-xl p-3 border border-black/[0.06]">
                        <p className="text-[10px] text-[#6e6e73] mb-1">{l}</p>
                        <p className="font-semibold text-[13px]" style={{ color: c as string }}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-black/[0.06] overflow-hidden">
                    <div className="px-4 py-2.5 font-semibold border-b border-black/[0.06] text-[12px]">Записи на сегодня</div>
                    {[["10:00","Анна К.","Маникюр + гель","2 500 ₽","#059669"],["12:00","Мария С.","Педикюр","1 800 ₽","#059669"],["14:00","Ольга Т.","Укрепление","2 200 ₽","#D97706"],["16:00","Наталья П.","Ресницы","3 500 ₽","#2563EB"]].map(r => (
                      <div key={r[1]} className="px-4 py-2.5 flex items-center gap-3 border-b border-black/[0.04] last:border-0 hover:bg-[#F5F5F7] transition-colors text-[11px]">
                        <span className="text-[#6e6e73] w-10 shrink-0">{r[0]}</span>
                        <span className="font-medium">{r[1]}</span>
                        <span className="text-[#6e6e73] flex-1">{r[2]}</span>
                        <span className="font-semibold">{r[3]}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium text-white" style={{ background: r[4] as string }}>✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section id="reviews" className="py-[100px] px-5 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0F172A 0%,#1E1B4B 50%,#0F172A 100%)" }}>
        {/* decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse,rgba(124,58,237,0.25) 0%,transparent 70%)", filter: "blur(40px)" }} />

        <div className="max-w-[980px] mx-auto relative">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-blue-400 mb-3">Отзывы</p>
              <h2 className="font-semibold tracking-[-0.03em] text-white" style={{ fontSize: "clamp(28px,4vw,46px)" }}>
                Мастера уже зарабатывают больше
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <div className="rounded-3xl p-7 flex flex-col gap-4 border"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 16 16" fill="#FBBF24">
                        <path d="M8 1.5l1.854 3.757 4.146.602-3 2.927.708 4.129L8 10.771l-3.708 1.944.708-4.129-3-2.927 4.146-.602L8 1.5z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-[14px] leading-relaxed text-white/80 flex-1">«{r.text}»</p>
                  <p className="text-[13px] font-semibold text-white/50">{r.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-[100px] px-5 bg-white">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6e6e73] mb-3">Тарифы</p>
              <h2 className="font-semibold tracking-[-0.03em]" style={{ fontSize: "clamp(28px,4vw,46px)" }}>Начните бесплатно</h2>
              <p className="text-[16px] text-[#6e6e73] mt-3">Платите только когда начнёте зарабатывать больше</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="rounded-3xl p-7 flex flex-col gap-6 h-full"
                  style={p.highlight
                    ? { background: "linear-gradient(145deg,#2563EB,#7C3AED)", boxShadow: "0 20px 60px rgba(37,99,235,0.35)" }
                    : { background: "#F5F5F7" }}>
                  <div>
                    <p className={`text-[13px] font-semibold mb-3 ${p.highlight ? "text-blue-200" : "text-[#6e6e73]"}`}>{p.name}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`font-semibold tracking-tight ${p.highlight ? "text-white" : "text-[#1d1d1f]"}`} style={{ fontSize: "32px" }}>{p.price}</span>
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
                    className={`block text-center py-3 rounded-xl text-[14px] font-semibold transition-all hover:scale-[1.02] ${p.highlight ? "bg-white text-[#2563EB]" : "text-white"}`}
                    style={!p.highlight ? { background: "linear-gradient(135deg,#2563EB,#7C3AED)" } : {}}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section className="py-[100px] px-5 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1E3A8A 0%,#4C1D95 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-spin absolute rounded-full opacity-20" style={{ width: 500, height: 500, left: "20%", top: "50%", background: "radial-gradient(circle,#60A5FA,transparent 65%)", filter: "blur(60px)", animationDuration: "20s" }} />
          <div className="blob-spin absolute rounded-full opacity-15" style={{ width: 400, height: 400, left: "70%", top: "30%", background: "radial-gradient(circle,#A78BFA,transparent 65%)", filter: "blur(50px)", animationDelay: "-8s" }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <Reveal>
          <div className="relative max-w-[580px] mx-auto">
            <h2 className="font-semibold text-white tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(28px,5vw,50px)" }}>
              Перестаньте терять клиентов<br />из-за ручного учёта
            </h2>
            <p className="text-blue-200 text-[16px] mb-10 leading-relaxed">
              Первый мастер — навсегда бесплатно. Регистрация занимает 5 минут.
            </p>
            <Link to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-[#1E3A8A] font-semibold text-[16px] px-10 py-4 rounded-full hover:scale-[1.02] transition-transform"
              style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
              Создать кабинет бесплатно →
            </Link>
            <p className="text-blue-300/70 text-[13px] mt-5">Без кредитной карты · Без обязательств</p>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="border-t border-black/[0.06] py-8 px-5" style={{ background: "#F5F5F7" }}>
        <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}>
              <Icon name="Scissors" size={12} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold">MasterClient45</span>
          </div>
          <p className="text-[12px] text-[#6e6e73]">© 2024 MasterClient45</p>
          <div className="flex gap-5">
            <a href="#" className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Конфиденциальность</a>
            <a href="#" className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
