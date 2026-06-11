import { useState } from "react";
import Icon from "@/components/ui/icon";

const services = [
  { name: "Маникюр", duration: "60 мин", price: "1 500 ₽", category: "Ногти" },
  { name: "Педикюр", duration: "90 мин", price: "2 000 ₽", category: "Ногти" },
  { name: "Маникюр + гель", duration: "90 мин", price: "2 500 ₽", category: "Ногти" },
  { name: "Наращивание ресниц", duration: "120 мин", price: "3 500 ₽", category: "Ресницы" },
  { name: "Педикюр + гель", duration: "120 мин", price: "2 800 ₽", category: "Ногти" },
  { name: "Укрепление ногтей", duration: "75 мин", price: "2 200 ₽", category: "Ногти" },
];

const reviews = [
  { name: "Анна К.", rating: 5, text: "Прекрасный мастер! Работа сделана на высшем уровне.", date: "10 июня 2026" },
  { name: "Мария С.", rating: 5, text: "Очень довольна! Запись прошла быстро и удобно через Telegram.", date: "8 июня 2026" },
  { name: "Наталья П.", rating: 5, text: "Лучший мастер! Хожу уже 2 года, всегда идеально!", date: "1 июня 2026" },
];

const gradients = [
  "from-violet-500/30 to-purple-900/60",
  "from-pink-500/30 to-rose-900/60",
  "from-orange-500/30 to-amber-900/60",
  "from-violet-500/30 to-pink-500/20",
  "from-pink-500/30 to-orange-500/20",
  "from-orange-500/30 to-violet-500/20",
];

const times = ["10:00", "10:30", "11:30", "13:00", "14:00", "15:30", "16:00", "17:00", "18:30"];

const calDays = [
  { d: 9, avail: false },
  { d: 10, avail: true },
  { d: 11, avail: true },
  { d: 12, avail: false },
  { d: 13, avail: true },
  { d: 14, avail: true },
  { d: 15, avail: false },
  { d: 16, avail: true },
  { d: 17, avail: true },
  { d: 18, avail: true },
  { d: 19, avail: false },
  { d: 20, avail: true },
  { d: 21, avail: true },
];

export default function MasterPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(11);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"main" | "book" | "confirm">("main");
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "reviews">("services");

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="orb orb-violet w-[400px] h-[400px] -top-20 -left-20 fixed opacity-25" />
        <div className="orb orb-pink w-[300px] h-[300px] bottom-0 right-0 fixed opacity-20" />
        <div className="relative z-10 text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl gradient-bg mx-auto mb-6 flex items-center justify-center shadow-xl shadow-violet-500/30 float">
            <Icon name="Check" size={36} className="text-white" />
          </div>
          <h1 className="font-display font-black text-3xl text-white mb-3">Вы записаны!</h1>
          <p className="text-muted-foreground mb-2">
            {services[selectedService ?? 0]?.name}
          </p>
          <p className="text-white font-medium text-lg mb-6">
            {selectedDay} июня в {selectedTime}
          </p>
          <div className="card-glass rounded-2xl p-4 mb-6 gradient-border">
            <div className="flex items-center gap-3">
              <Icon name="BellRing" size={18} className="text-violet-400 shrink-0" />
              <p className="text-sm text-muted-foreground text-left">
                Мы пришлём напоминание за 24 часа и за 3 часа до визита в Telegram
              </p>
            </div>
          </div>
          <button
            onClick={() => setStep("main")}
            className="w-full gradient-bg text-white font-medium py-3 rounded-2xl hover:opacity-90 transition-opacity"
          >
            Отлично!
          </button>
        </div>
      </div>
    );
  }

  if (step === "book") {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="orb orb-violet w-[400px] h-[400px] -top-20 -left-20 fixed opacity-20" />
        <div className="orb orb-pink w-[300px] h-[300px] top-1/2 right-0 fixed opacity-15" />

        <div className="max-w-md mx-auto relative z-10 space-y-6">
          <button onClick={() => setStep("main")} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm">
            <Icon name="ArrowLeft" size={16} />
            Назад
          </button>

          <h2 className="font-display font-bold text-2xl text-white">Выбор времени</h2>

          {/* Selected service */}
          {selectedService !== null && (
            <div className="card-glass rounded-2xl p-4 gradient-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Услуга</div>
                  <div className="font-medium text-white">{services[selectedService].name}</div>
                </div>
                <div className="text-right">
                  <div className="gradient-text font-bold">{services[selectedService].price}</div>
                  <div className="text-xs text-muted-foreground">{services[selectedService].duration}</div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar */}
          <div className="card-glass rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-bold text-white">Июнь 2026</span>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white">
                  <Icon name="ChevronLeft" size={14} />
                </button>
                <button className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white">
                  <Icon name="ChevronRight" size={14} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                <div key={d} className="text-center text-[11px] text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calDays.map(({ d, avail }) => (
                <button
                  key={d}
                  disabled={!avail}
                  onClick={() => setSelectedDay(d)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                    selectedDay === d
                      ? "gradient-bg text-white shadow-lg shadow-violet-500/30"
                      : avail
                      ? "text-white hover:bg-white/10"
                      : "text-muted-foreground/30 cursor-not-allowed"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time slots */}
          <div className="card-glass rounded-2xl p-4">
            <div className="font-medium text-white mb-3 text-sm">Доступное время</div>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedTime === t
                      ? "gradient-bg text-white shadow-md shadow-violet-500/20"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => selectedTime && setStep("confirm")}
            disabled={!selectedTime}
            className="w-full gradient-animated text-white font-semibold py-4 rounded-2xl text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
          >
            Подтвердить запись →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="orb orb-violet w-[500px] h-[500px] -top-32 -left-32 fixed opacity-20" />
      <div className="orb orb-pink w-[350px] h-[350px] top-1/2 right-0 fixed opacity-15" />
      <div className="orb orb-orange w-[400px] h-[400px] bottom-0 left-1/3 fixed opacity-10" />

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center text-white font-display font-black text-3xl shadow-xl shadow-violet-500/30">
                АМ
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-bg border-2 border-background flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              </div>
            </div>

            <h1 className="font-display font-black text-2xl text-white mb-1">Алина Мастерова</h1>
            <p className="text-muted-foreground text-sm mb-3">Мастер маникюра и педикюра · Москва</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-white font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">· 48 отзывов</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {["Гель-лак", "Нейл-арт", "Наращивание", "Педикюр"].map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 w-full max-w-xs">
              <button
                onClick={() => setStep("book")}
                className="flex-1 gradient-animated text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
              >
                Записаться
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                <Icon name="MessageCircle" size={18} />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
                <Icon name="Share2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex gap-1 py-2">
            {(["services", "portfolio", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "gradient-bg text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {{ services: "Услуги", portfolio: "Портфолио", reviews: "Отзывы" }[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 py-6">
        {activeTab === "services" && (
          <div className="space-y-3 animate-fade-in">
            {services.map((s, i) => (
              <button
                key={s.name}
                onClick={() => { setSelectedService(i); setStep("book"); }}
                className={`w-full text-left card-glass rounded-2xl p-4 card-hover border transition-all ${
                  selectedService === i ? "border-violet-500/50 card-glow" : "border-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-white mb-1">{s.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      {s.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold gradient-text">{s.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">Записаться →</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {gradients.map((g, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${g} border border-white/5 card-hover flex items-end p-3 cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <Icon name="Sparkles" size={40} className="text-white" />
                </div>
                <span className="text-xs text-white/50 relative z-10">Работа #{i + 1}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4 animate-fade-in">
            {/* Summary */}
            <div className="card-glass rounded-2xl p-5 text-center gradient-border mb-6">
              <div className="font-display font-black text-5xl gradient-text mb-1">4.9</div>
              <div className="flex justify-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">48 отзывов</div>
            </div>

            {reviews.map((r) => (
              <div key={r.name} className="card-glass rounded-2xl p-5">
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
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div className="sticky bottom-0 z-20 bg-background/80 backdrop-blur-md border-t border-white/5 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => setStep("book")}
            className="w-full gradient-animated text-white font-semibold py-3.5 rounded-2xl text-base hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            Записаться онлайн →
          </button>
        </div>
      </div>
    </div>
  );
}
