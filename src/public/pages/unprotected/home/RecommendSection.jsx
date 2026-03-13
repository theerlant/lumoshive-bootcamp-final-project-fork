import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";

const RECOMMEND_ITEMS = [
  {
    id: 1,
    title: "PlayStation 5",
    subtitle: "Black and White version of the PS5 coming out on sale.",
    bg: "bg-black",
    textColor: "text-white",
    image: "/ps5.png",
    large: true,
  },
  {
    id: 2,
    title: "Women's Collections",
    subtitle: "Featured woman collections",
    image: "/womens.png",
    large: false,
  },
  {
    id: 3,
    title: "Speakers",
    subtitle: "Amazon wireless speakers",
    image: "/speaker.png",
    large: false,
    small: true,
  },
  {
    id: 4,
    title: "Perfume",
    subtitle: "GUCCI INTENSE OUD EDP",
    image: "/perfume.png",
    large: false,
    small: true,
  },
];

const RecommendCard = ({ item }) => (
  <div
    className={`relative rounded-sm overflow-hidden ${item.bg} flex items-end p-6 group cursor-pointer flex-1 min-h-[220px]`}
  >
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-scale-down bg-black group-hover:scale-105 transition-transform duration-500"
    />
    <div className={`relative z-10 text-white`}>
      <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
      <p className="text-sm mt-1">{item.subtitle}</p>
      <Link
        to={"/all"}
        className="mt-3 text-sm font-semibold border-b border-current w-max pb-0.5 hover:opacity-70 transition-opacity"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

export const RecommendSection = () => {
  const isMobile = useMediaQuery();

  const [main, ...rest] = RECOMMEND_ITEMS;
  const [topRight, ...smallItems] = rest;

  return (
    <div className="flex flex-col gap-6 mt-14">
      <SectionHeader tag="Featured" title="Recommend" />
      <div className="grid grid-cols-[1fr_1fr] gap-6 px-4 lg:px-0">
        {isMobile ? (
          RECOMMEND_ITEMS.map((item) => {
            return <RecommendCard item={item} key={item.id} />;
          })
        ) : (
          <>
            {/* Large left card */}
            <RecommendCard item={main} />

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <RecommendCard item={topRight} />
              <div className="grid grid-cols-2 gap-6">
                {smallItems.map((item) => (
                  <RecommendCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
