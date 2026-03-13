import { useState, useEffect, useCallback } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const SLIDES = Array.from({ length: 5 }).fill({
  logo: "/apple.png",
  label: "iPhone 14 Series",
  title: "Up to 10% off Voucher",
  cta: "Shop Now",
  targetUrl: "/",
  image: "/hero_banner.png",
});

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
    <div
      className={`relative w-full lg:rounded-sm overflow-hidden bg-black flex items-center px-12 py-10 min-h-[340px] transition-colors duration-700`}
    >
      {/* Left content */}
      <div className={`flex flex-col gap-5 max-w-sm z-10 text-white`}>
        <div className="flex items-center gap-8">
          <img
            src={slide.logo}
            alt="Banner logo"
            className="w-8 lg:w-10 aspect-square object-contain"
          />
          <p className="text-sm">{slide.label}</p>
        </div>
        <h2 className="text-5xl font-semibold font-title tracking-wide">
          {slide.title}
        </h2>
        <Link
          to={slide.targetUrl}
          className="flex items-center gap-2 font-semibold w-max pb-0.5 hover:opacity-70 transition-opacity"
        >
          <span className="underline">{slide.cta}</span> <ArrowRightIcon />
        </Link>
      </div>

      {/* Bg image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute h-full left-[50%] -translate-x-[50%] p-4 object-contain"
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
            className={`rounded-full transition-all ${i === current ? "w-2.5 h-2.5 bg-[#DB4444] outline-2 outline-white -outline-offset-2" : "w-2.5 h-2.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};
