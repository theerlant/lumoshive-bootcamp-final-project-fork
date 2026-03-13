import { BannerCarousel } from "./home/BannerCarousel";
import { CategorySection } from "./home/CategorySection";
import { BestSellerSection } from "./home/BestSellerSection";
import { PromoBanner } from "./home/PromoBanner";
import { ExploreSection } from "./home/ExploreSection";
import { RecommendSection } from "./home/RecommendSection";
import { FeaturesBar } from "./home/FeaturesBar";

export const HomePage = () => {
  return (
    <div className="w-full flex flex-col mt-10 pb-20">
      {/* Hero Banner Carousel */}
      <BannerCarousel />

      {/* Browse By Category */}
      <CategorySection />

      <hr className="my-14 border-black/10" />

      {/* Best Selling Products */}
      <BestSellerSection />

      {/* Promo / Music Banner */}
      <PromoBanner />

      {/* Explore Our Products */}
      <ExploreSection />

      <hr className="my-14 border-black/10" />

      {/* Recommend Section */}
      <RecommendSection />

      {/* Features Bar */}
      <FeaturesBar />
    </div>
  );
};
