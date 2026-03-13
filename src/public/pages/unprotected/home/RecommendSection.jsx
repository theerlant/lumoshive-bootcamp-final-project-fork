import { SectionHeader } from "./SectionHeader";

const RECOMMEND_ITEMS = [
  {
    id: 1,
    title: "PlayStation 5",
    subtitle: "Black and White version",
    bg: "bg-black",
    textColor: "text-white",
    image: "https://placehold.co/420x340/111827/ffffff?text=PS5",
    large: true,
  },
  {
    id: 2,
    title: "Women's Collections",
    subtitle: "Featured woman collections",
    bg: "bg-[#C8A882]",
    textColor: "text-white",
    image: "https://placehold.co/420x280/c8a882/ffffff?text=Women",
    large: false,
  },
  {
    id: 3,
    title: "CANON EOS DSLR Camera",
    subtitle: "DSLR Camera #1 is a canon camera",
    bg: "bg-[#E0D5F5]",
    textColor: "text-black",
    image: "https://placehold.co/200x200/e0d5f5/333333?text=Camera",
    large: false,
    small: true,
  },
  {
    id: 4,
    title: "Kids Electric Car",
    subtitle: "Electric Cars for your little ones",
    bg: "bg-[#FFEBD6]",
    textColor: "text-black",
    image: "https://placehold.co/200x200/ffebd6/333333?text=Kid+Car",
    large: false,
    small: true,
  },
];

const RecommendCard = ({ item }) => (
  <div className={`relative rounded-sm overflow-hidden ${item.bg} flex items-end p-6 group cursor-pointer flex-1 min-h-[220px]`}>
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
    />
    <div className={`relative z-10 ${item.textColor}`}>
      <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
      <p className="text-sm opacity-70 mt-1">{item.subtitle}</p>
      <button className="mt-3 text-sm font-semibold border-b border-current w-max pb-0.5 hover:opacity-70 transition-opacity">
        Shop Now
      </button>
    </div>
  </div>
);

export const RecommendSection = () => {
  const [main, ...rest] = RECOMMEND_ITEMS;
  const [topRight, ...smallItems] = rest;

  return (
    <div className="flex flex-col gap-6 mt-14">
      <SectionHeader tag="Featured" title="Recomment" />
      <div className="grid grid-cols-[1fr_1fr] gap-6">
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
      </div>
    </div>
  );
};
