import { HeadphonesIcon, RefreshCwIcon, TruckElectricIcon } from "lucide-react";

const FEATURES = [
  {
    icon: <TruckElectricIcon size={36} strokeWidth={1.5} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <HeadphonesIcon size={36} strokeWidth={1.5} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <RefreshCwIcon size={36} strokeWidth={1.5} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

export const FeaturesBar = () => (
  <div className="flex justify-center gap-20 mt-20">
    {FEATURES.map((f) => (
      <div
        key={f.title}
        className="flex-1 flex flex-col items-center gap-3 text-center"
      >
        <div className="flex items-center justify-center text-white rounded-full w-20 h-20 bg-[#2F2E30]/30">
          <div className="flex items-center justify-center bg-black rounded-full w-15 h-15">
            {f.icon}{" "}
          </div>
        </div>
        <h4 className="font-bold text-sm uppercase tracking-wide mt-1">
          {f.title}
        </h4>
        <p className="text-sm">{f.desc}</p>
      </div>
    ))}
  </div>
);
