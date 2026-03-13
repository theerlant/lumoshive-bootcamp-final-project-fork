import { ShieldCheckIcon, HeadphonesIcon, RefreshCwIcon } from "lucide-react";

const FEATURES = [
  {
    icon: <ShieldCheckIcon size={40} strokeWidth={1.5} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <HeadphonesIcon size={40} strokeWidth={1.5} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <RefreshCwIcon size={40} strokeWidth={1.5} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

export const FeaturesBar = () => (
  <div className="flex justify-center gap-20 mt-20 py-8">
    {FEATURES.map((f) => (
      <div key={f.title} className="flex flex-col items-center gap-3 text-center max-w-[180px]">
        <div className="p-4 bg-black text-white rounded-full">{f.icon}</div>
        <h4 className="font-bold text-sm uppercase tracking-wide mt-1">{f.title}</h4>
        <p className="text-sm text-black/50">{f.desc}</p>
      </div>
    ))}
  </div>
);
