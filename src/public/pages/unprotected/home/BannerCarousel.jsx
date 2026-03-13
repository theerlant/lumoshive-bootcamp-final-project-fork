import { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    label: "iPhone 14 Series",
    title: "Up to 10% off Voucher",
    cta: "Shop Now",
    bg: "bg-black",
    textColor: "text-white",
    image: "https://placehold.co/420x300/111827/ffffff?text=iPhone+14",
  },
  {
    id: 2,
    label: "Summer Collection",
    title: "Exclusive Deals on Fashion",
    cta: "Shop Now",
    bg: "bg-[#0D0D0D]",
    textColor: "text-white",
    image: "https://placehold.co/420x300/1e293b/ffffff?text=Fashion",
  },
  {
    id: 3,
    label: "Tech Essentials",
    title: "Best Laptops & Gadgets",
    cta: "Explore",
    bg: "bg-[#1A1A2E]",
    textColor: "text-white",
    image: "https://placehold.co/420x300/1a1a2e/ffffff?text=Laptops",
  },
];

export const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className={`relative w-full rounded-sm overflow-hidden ${slide.bg} flex items-center justify-between px-12 py-10 min-h-[340px] transition-colors duration-700`}>
      {/* Left content */}
      <div className={`flex flex-col gap-5 max-w-sm z-10 ${slide.textColor}`}>
        <p className="text-sm opacity-70 tracking-widest uppercase">{slide.label}</p>
        <h2 className="text-4xl font-bold leading-tight">{slide.title}</h2>
        <button className="flex items-center gap-2 font-semibold border-b border-white w-max pb-0.5 hover:opacity-70 transition-opacity">
          {slide.cta} →
        </button>
      </div>

      {/* Right image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-[420px] h-[280px] object-contain z-10"
      />

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-20"
      >
        <ChevronLeftIcon size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors z-20"
      >
        <ChevronRightIcon size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
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
