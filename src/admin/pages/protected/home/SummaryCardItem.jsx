import { UsersRoundIcon } from "lucide-react";

export const SummaryCardItem = ({
  icon = <></>,
  title = "Title",
  value = "35k",
}) => {
  return (
    <div className="grow shrink basis-auto bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-black rounded-lg p-1.5 text-white">{icon}</div>
        <h2 className="font-medium">{title}</h2>
      </div>
      <h3 className="font-bold text-4xl mb-4">{value}</h3>
      <div className="bg-[#DB44444D] rounded-full h-1 min-w-[100px] max-w-full relative">
        <div className="absolute bg-[#DB4444] left-0 top-0 w-[50%] h-1 rounded-full" />
      </div>
    </div>
  );
};
