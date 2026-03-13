import { BannerCarousel } from "./home/BannerCarousel";
import { CategoryCarousel } from "./home/CategoryCarousel";
import { CategorySection } from "./home/CategorySection";
import { BestSellerSection } from "./home/BestSellerSection";
import { ExploreSection } from "./home/ExploreSection";
import { RecommendSection } from "./home/RecommendSection";
import { FeaturesBar } from "./home/FeaturesBar";

export const HomePage = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Banner Carousel */}
      <BannerCarousel />

      {/* Browse By Category */}
      <CategorySection />

      <div className="my-14" />

      {/* Best Selling Products */}
      <BestSellerSection />

      <div className="my-14" />

      {/* Category carousel */}
      <CategoryCarousel />

      {/* Explore Our Products */}
      <ExploreSection />

      <div className="my-14" />

      {/* Recommend Section */}
      <RecommendSection />

      {/* Features Bar */}
      <FeaturesBar />
    </div>
  );
};
