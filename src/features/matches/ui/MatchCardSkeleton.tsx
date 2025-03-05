import { useTheme } from "@/app/providers/ThemeProvider";
import clsx from "clsx";

export const MatchCardSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "flex flex-row justify-between items-center p-4 rounded-[4px] w-full h-[90px]",
        theme === "dark" ? "bg-[#0F1318]" : "bg-[#E5E7EB]"
      )}
    >
      <div className="h-14 w-36 animate-pulse bg-gray-700 rounded-md"></div>
      <div className="h-14 w-24 animate-pulse bg-gray-700 rounded-md"></div>
      <div className="h-14 w-36 animate-pulse bg-gray-700 rounded-md"></div>
    </div>
  );
};
