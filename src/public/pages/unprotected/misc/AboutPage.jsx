import { useState } from "react";
import {
  Store,
  DollarSign,
  ShoppingBag,
  Coins,
  Twitter,
  Instagram,
  Linkedin,
  Truck,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import SideImage from "../../../../assets/Side_Image.jpg";
import image_founder from "../../../../assets/image_founder.png";
import image_managing_director from "../../../../assets/image_managing_director.png";
import image_managing_designer from "../../../../assets/image_product_designer.png";
import { Breadcrumbs } from "@/public/components/BreadCrumbs";

export default function AboutPage() {
  const [activeEllipse, setActiveEllipse] = useState(2);

  const stats = [
    {
      id: 1,
      icon: <Store size={30} />,
      value: "10.5k",
      label: "Sellers active our site",
    },
    {
      id: 2,
      icon: <DollarSign size={30} />,
      value: "33k",
      label: "Monthly Product Sale",
    },
    {
      id: 3,
      icon: <ShoppingBag size={30} />,
      value: "45.5k",
      label: "Customer active in our site",
    },
    {
      id: 4,
      icon: <Coins size={30} />,
      value: "25k",
      label: "Anual gross sale in our site",
    },
  ];

  const team = [
    { name: "Tom Cruise", role: "Founder & Chairman", image: image_founder },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image: image_managing_director,
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: image_managing_designer,
    },
  ];

  const services = [
    {
      icon: <Truck size={35} />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: <Headphones size={35} />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <ShieldCheck size={35} />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20 mb-24">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-black">
            Our Story
          </h1>
          <p className="text-base leading-relaxed text-black">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-base leading-relaxed text-black">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={SideImage}
            alt="Our Story"
            className="w-full h-auto rounded-l-md object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group border border-gray-300 rounded-md p-8 flex flex-col items-center justify-center transition-all duration-300 hover:bg-[#DB4444] hover:border-[#DB4444] cursor-pointer"
          >
            <div className="bg-black text-white p-2 rounded-full border-8 border-gray-300 group-hover:bg-white group-hover:text-black group-hover:border-red-300 transition-all">
              {stat.icon}
            </div>
            <h2 className="text-3xl font-bold mt-4 group-hover:text-white">
              {stat.value}
            </h2>
            <p className="text-sm text-center mt-2 group-hover:text-white">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {team.map((member, index) => (
          <div key={index} className="space-y-4">
            <div className="bg-[#F5F5F5] pt-10 px-10 rounded-sm flex justify-center items-end h-[430px] overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="max-h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-wider">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <div className="flex gap-4 pt-2">
                <Twitter
                  size={18}
                  className="cursor-pointer hover:text-[#DB4444]"
                />
                <Instagram
                  size={18}
                  className="cursor-pointer hover:text-[#DB4444]"
                />
                <Linkedin
                  size={18}
                  className="cursor-pointer hover:text-[#DB4444]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mb-24">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            type="button"
            key={i}
            onClick={() => setActiveEllipse(i)}
            className={`w-[12px] h-[12px] rounded-full cursor-pointer border-2 ${
              activeEllipse === i
                ? "bg-[#DB4444] border-[#DB4444]"
                : "bg-gray-400 border-white"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="bg-black text-white p-3 rounded-full border-10 border-gray-300">
              {service.icon}
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
