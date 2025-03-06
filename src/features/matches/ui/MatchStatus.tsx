import clsx from "clsx";
import { View, Text } from "react-native";

type StatusType = "Scheduled" | "Ongoing" | "Finished";

export const MatchStatus: React.FC<{ MatchStatus: StatusType }> = ({
  MatchStatus,
}) => {
  const statusProps = {
    Scheduled: {
      style: "bg-[#EB6402]",
      text: "Match preparing",
    },
    Ongoing: {
      style: "bg-[#43AD28]",
      text: "Live",
    },
    Finished: {
      style: "bg-[#EB0237]",
      text: "Finished",
    },
  };

  return (
    <View
      className={clsx(
        "rounded-[4] content-center px-[8] py-[6] min-w-[92]",
        statusProps[MatchStatus].style
      )}
    >
      <Text
        className="text-white text-center text-xs"
        style={{ fontFamily: "Inter" }}
      >
        {statusProps[MatchStatus].text}
      </Text>
    </View>
  );
};
