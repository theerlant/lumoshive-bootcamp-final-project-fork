import { useEffect } from "react";
import { UserService } from "@/shared/services/userService";
import { SummaryCardItem } from "./SummaryCardItem";
import {
  BadgeDollarSignIcon,
  ChevronRight,
  MousePointerClickIcon,
  PackageIcon,
  UsersRoundIcon,
} from "lucide-react";
import useSWR from "swr";
import { dashboardService } from "../../../../shared/services/dashboardService";
import { PageLoading } from "../../../components/SimpleConditional";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { productService } from "../../../../shared/services/productService";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  useEffect(() => {
    UserService.get()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8 *:p-5 *:bg-white *:rounded-lg *:overflow-hidden *:shadow-sm">
      <SummaryCard />
      <MonthlyProfitCard />
      <AnnualProfitChart />
      <BestSellerCard />
    </div>
  );
}

const SummaryCard = () => {
  const { data, isLoading, error } = useSWR("/summary", () =>
    dashboardService.getSummary(),
  );

  return (
    <section id="summary" className="pb-8!">
      <h1 className="font-medium text-xl mb-6">Summary</h1>
      {data && !isLoading ? (
        <>
          <div className="flex gap-4 flex-wrap">
            <SummaryCardItem
              icon={<UsersRoundIcon size={18} />}
              title="Users"
              value={data.users}
            />
            <SummaryCardItem
              icon={<MousePointerClickIcon size={18} />}
              title="Orders"
              value={data.orders}
            />
            <SummaryCardItem
              icon={<BadgeDollarSignIcon size={18} />}
              title="Sales"
              value={`Rp ${data.sales}`}
            />
            <SummaryCardItem
              icon={<PackageIcon size={18} />}
              title="Items"
              value={data.items}
            />
          </div>
        </>
      ) : (
        <PageLoading />
      )}
    </section>
  );
};

const MonthlyProfitCard = () => {
  const { data, isLoading, error } = useSWR("/monthly-earning", () =>
    dashboardService.getMonthlyEarning(),
  );

  return (
    <section
      id="monthly_earning"
      className="flex flex-col items-center justify-center gap-4"
    >
      <h1 className="font-medium text-lg text-center">
        Total earning this month
      </h1>
      <h2 className="text-[#DB4444] text-5xl font-bold">
        {data && !isLoading ? `Rp${data.total_earning}` : `Loading`}
      </h2>
      <p className="text-[#89868D] text-center font-medium mb-2">
        total income profit this month
      </p>
    </section>
  );
};

const AnnualProfitChart = () => {
  const year = new Date().getFullYear();

  const { data, isLoading, error } = useSWR("/revenue-chart", () =>
    dashboardService.getRevenueChart(year),
  );

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <section id="annual_profit">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-medium text-xl">Revenue {year}</h1>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-[#DB4444]" />
          <p className="text-[#DB4444] text-sm">Sales</p>
        </div>
      </div>
      <div className="h-[300px] w-full mt-4">
        {data ? (
          <ResponsiveContainer
            minWidth={100}
            minHeight={50}
            width="100%"
            height="100%"
          >
            <LineChart
              data={data.data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                width={60}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${value / 1000000}M`;
                  if (value >= 1000) return `${value / 1000}K`;
                  return `${value}`;
                }}
              />
              <Tooltip
                formatter={(value) => {
                  let formattedValue = `${value}`;
                  if (value >= 1000000) formattedValue = `${value / 1000000}M`;
                  else if (value >= 1000) formattedValue = `${value / 1000}K`;
                  return [formattedValue, "Revenue"];
                }}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#DB4444"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#DB4444",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </section>
  );
};

const BestSellerCard = () => {
  // Api error dari backend
  // const { data, isLoading, error } = useSWR("/top-products", () =>
  //   dashboardService.getTopSelling(4),
  // );

  const { data, isLoading, error } = useSWR("/products", () =>
    productService.public.getAll({ limit: 5 }),
  );

  return (
    <section id="best-seller">
      <h1 className="font-medium text-xl mb-6">Best Item Sales</h1>
      {data?.data ? (
        data.data.map((product) => (
          <Link to={`./products/${product.id}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-black text-white rounded-lg p-2">
                <PackageIcon size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-medium line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-xs text-[#89868D]">
                  {product.category.name || " "}
                </p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        ))
      ) : (
        <PageLoading />
      )}
    </section>
  );
};
