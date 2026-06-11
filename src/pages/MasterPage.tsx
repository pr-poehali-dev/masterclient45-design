import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICES = [
  { name: "Маникюр",            dur: "60 мин",  price: 1500 },
  { name: "Педикюр",            dur: "90 мин",  price: 2000 },
  { name: "Маникюр + гель",     dur: "90 мин",  price: 2500 },
  { name: "Наращивание ресниц", dur: "120 мин", price: 3500 },
  { name: "Укрепление ногтей",  dur: "75 мин",  price: 2200 },
  { name: "Педикюр + гель",     dur: "120 мин", price: 2800 },
];

const REVIEWS = [
  { name: "Анна К.",    rating: 5, text: "Прекрасный мастер! Держится уже 3 недели.", date: "10 июня 2026" },
  { name: "Мария С.",   rating: 5, text: "Очень довольна. Запись через бота — удобно.", date: "8 июня 2026" },
  { name: "Наталья П.", rating: 5, text: "Лучший мастер! Хожу уже 2 года, всегда идеально!", date: "1 июня 2026" },
];

const TIMES = ["10:00","10:30","11:30","13:00","14:00","15:30","16:00","17:00","18:30"];
const DAYS  = [9,10,11,12,13,14,15,16,17,18,19,20,21];
const OFF   = new Set([9,12,15,19]);

export default function MasterPage() {
  const [tab,     setTab]     = useState<"services"|"reviews">("services");
  const [selSvc,  setSelSvc]  = useState<number|null>(null);
  const [selDay,  setSelDay]  = useState<number|null>(11);
  const [selTime, setSelTime] = useState<string|null>(null);
  const [step,    setStep]    = useState<"main"|"book"|"done">("main");

  /* Confirmation screen */
  if (step === "done") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
            <Icon name="Check" size={24} className="text-emerald-600" />
          </div>
          <h2 className="text-[22px] font-semibold tracking-tight mb-1">Вы записаны!</h2>
          <p className="text-[14px] text-muted-foreground mb-1">{SERVICES[selSvc ?? 0]?.name}</p>
          <p className="text-[15px] font-medium mb-6">{selDay} июня в {selTime}</p>
          <div className="border border-border rounded-lg p-4 mb-6 flex items-start gap-3 text-left">
            <Icon name="BellRing" size={16} className="text-primary mt-0.5 shrink-0" />
            <p className="text-[13px] text-muted-foreground">Напомним за 24 часа и за 3 часа до визита в Telegram</p>
          </div>
          <button onClick={() => setStep("main")} className="btn-primary w-full justify-center py-2.5">
            Готово
          </button>
        </div>
      </div>
    );
  }

  /* Booking screen */
  if (step === "book") {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <div className="max-w-md mx-auto space-y-5">
          <button onClick={() => setStep("main")} className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={14} />
            Назад
          </button>

          <h2 className="text-[20px] font-semibold tracking-tight">Выбор даты и времени</h2>

          {selSvc !== null && (
            <div className="border border-border rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-muted-foreground mb-0.5">Услуга</p>
                <p className="text-[14px] font-medium">{SERVICES[selSvc].name}</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-semibold">{SERVICES[selSvc].price.toLocaleString("ru")} ₽</p>
                <p className="text-[11px] text-muted-foreground">{SERVICES[selSvc].dur}</p>
              </div>
            </div>
          )}

          {/* Calendar */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-medium">Июнь 2026</p>
              <div className="flex gap-1">
                <button className="btn-ghost p-1.5"><Icon name="ChevronLeft" size={13} /></button>
                <button className="btn-ghost p-1.5"><Icon name="ChevronRight" size={13} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d => (
                <div key={d} className="text-center text-[10px] text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map(d => {
                const avail = !OFF.has(d);
                const active = selDay === d;
                return (
                  <button
                    key={d}
                    disabled={!avail}
                    onClick={() => setSelDay(d)}
                    className={`aspect-square rounded text-[13px] font-medium transition-colors ${
                      active  ? "bg-primary text-white" :
                      avail   ? "hover:bg-muted text-foreground" :
                                "text-muted-foreground/30 cursor-not-allowed"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Times */}
          <div className="border border-border rounded-lg p-4">
            <p className="text-[12px] text-muted-foreground font-medium mb-3">Доступное время</p>
            <div className="grid grid-cols-3 gap-2">
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelTime(t)}
                  className={`py-2.5 rounded text-[13px] font-medium border transition-colors ${
                    selTime === t
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selTime}
            onClick={() => selTime && setStep("done")}
            className="btn-primary w-full justify-center py-2.5 text-[14px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Подтвердить запись
          </button>
        </div>
      </div>
    );
  }

  /* Main screen */
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border px-4 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary text-base font-semibold flex items-center justify-center shrink-0">
              АМ
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[18px] font-semibold tracking-tight">Алина Мастерова</h1>
              <p className="text-[13px] text-muted-foreground">Мастер маникюра и педикюра · Москва</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,i) => (
                    <Icon key={i} name="Star" size={12} className="text-amber-400" />
                  ))}
                </div>
                <span className="text-[12px] text-muted-foreground">4.9 · 48 отзывов</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep("book")}
              className="btn-primary flex-1 justify-center py-2.5"
            >
              Записаться
            </button>
            <button className="btn-ghost px-3 py-2.5">
              <Icon name="MessageSquare" size={15} />
            </button>
            <button className="btn-ghost px-3 py-2.5">
              <Icon name="Share2" size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-4 sticky top-0 bg-background z-10">
        <div className="max-w-md mx-auto flex">
          {(["services","reviews"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {{ services: "Услуги", reviews: "Отзывы" }[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 pt-4">
        {tab === "services" && (
          <div className="space-y-2">
            {SERVICES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => { setSelSvc(i); setStep("book"); }}
                className="w-full text-left border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium">{s.name}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Icon name="Clock" size={11} />
                      {s.dur}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-semibold">{s.price.toLocaleString("ru")} ₽</p>
                    <p className="text-[11px] text-primary mt-0.5">Записаться</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-3">
            <div className="border border-border rounded-lg p-4 flex items-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-[28px] font-semibold tracking-tight">4.9</p>
                <div className="flex gap-0.5 justify-center">
                  {Array.from({length:5}).map((_,i) => (
                    <Icon key={i} name="Star" size={11} className="text-amber-400" />
                  ))}
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-[14px] font-medium">48 отзывов</p>
                <p className="text-[12px] text-muted-foreground">98% довольны</p>
              </div>
            </div>
            {REVIEWS.map(r => (
              <div key={r.name} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-[10px] font-semibold flex items-center justify-center">
                      {r.name.slice(0,2)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({length:r.rating}).map((_,i) => (
                      <Icon key={i} name="Star" size={11} className="text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="max-w-md mx-auto">
          <button onClick={() => setStep("book")} className="btn-primary w-full justify-center py-2.5 text-[14px]">
            Записаться онлайн
          </button>
        </div>
      </div>
    </div>
  );
}
