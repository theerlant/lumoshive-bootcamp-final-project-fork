import { useMediaQuery } from "../../../../shared/hooks/useMediaQuery";

export const SectionHeader = ({ tag, title }) => {
  const isMobile = useMediaQuery();

  return (
    <div className="flex flex-col gap-3 px-4 lg:px-0">
      {isMobile ?? (
        <div className="flex items-center gap-3">
          <div className="w-4 h-8 bg-[#DB4444] rounded-sm" />
          <span className="text-[#DB4444] font-semibold text-sm">{tag}</span>
        </div>
      )}
      <h2 className="text-sm lg:text-2xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
};
