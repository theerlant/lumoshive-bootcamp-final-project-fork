import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const PROMO_SLIDES = [
  {
    id: 1,
    label: "Categories",
    title: "Enhance Your\nMusic Experience",
    bg: "bg-black",
    image: "https://placehold.co/480x320/111827/ffffff?text=Speaker",
    cta: "Buy Now!",
  },
  {
    id: 2,
    label: "Limited Offer",
    title: "Next-Gen\nGaming Setup",
    bg: "bg-[#0D0D0D]",
    image: "https://placehold.co/480x320/0f172a/ffffff?text=Gaming+PC",
    cta: "Shop Now",
  },
];

export const PromoBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % PROMO_SLIDES.length), []);
  const prev = () => setCurrent((c) => (c - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = PROMO_SLIDES[current];

  return (
    <div className={`relative w-full rounded-sm overflow-hidden ${slide.bg} flex items-center justify-between px-16 py-16 min-h-[400px] transition-colors duration-700 mt-14`}>
      {/* Left content */}
      <div className="flex flex-col gap-5 max-w-sm z-10 text-white">
        <p className="text-sm opacity-60 tracking-widest uppercase">{slide.label}</p>
        <h2 className="text-4xl font-bold leading-tight whitespace-pre-line">{slide.title}</h2>
        <button className="flex items-center gap-2 font-semibold text-[#00ff88] border-b border-[#00ff88] w-max pb-0.5 hover:opacity-70 transition-opacity mt-2">
          {slide.cta} →
        </button>
      </div>

      {/* Right image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-[480px] h-[300px] object-contain z-10"
      />

      {/* Prev / Next */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-20">
        <ChevronLeftIcon size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-2 transition-colors z-20">
        <ChevronRightIcon size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {PROMO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};
