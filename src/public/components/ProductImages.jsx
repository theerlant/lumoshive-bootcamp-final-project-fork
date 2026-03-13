import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const ProductImages = ({ images = [] }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const thumbRefs = useRef([]);

  const isMoreThanOne = images?.length > 1;

  // Auto-play interval handling
  useEffect(() => {
    if (!isMoreThanOne) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // changes image every 5 seconds

    return () => clearInterval(interval);
  }, [mainImageIndex, isMoreThanOne]); // dependency resets interval when manually changing images

  // Auto-scroll active thumb into view
  useEffect(() => {
    if (thumbRefs.current[mainImageIndex] && scrollContainerRef.current) {
      thumbRefs.current[mainImageIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Vertical alignment
        inline: "center", // Horizontal alignment (keeps active thumb centered if possible)
      });
    }
  }, [mainImageIndex]);

  const handleNext = useCallback(() => {
    setMainImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setMainImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  const mainImage = images[mainImageIndex];

  return (
    <section id="images" className="flex flex-col gap-4 min-w-0">
      <div className="relative group">
        <img
          src={`http://103.150.116.241:8082${mainImage.image_url}`}
          className="w-full aspect-[1.5] object-contain p-16 bg-[#F5F5F5] rounded-sm transition-opacity duration-300"
          alt="Product Main Image"
        />

        {/* Navigation Buttons (only show if > 1 image) */}
        {isMoreThanOne && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md z-10"
              aria-label="Previous Image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-md z-10"
              aria-label="Next Image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 *:shrink-0 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {images.map((image, i) => {
          const isSelected = i === mainImageIndex;
          return (
            <button
              key={`${image.id}-${i}`}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => setMainImageIndex(i)}
              className={`w-40 aspect-[1.2] rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                isSelected
                  ? "border-black"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={`http://103.150.116.241:8082${image.image_url}`}
                className="w-full h-full object-contain bg-[#F5F5F5]"
                alt={`Product Thumbnail ${i + 1}`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};
