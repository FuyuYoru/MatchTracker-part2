import clsx from "clsx";
import { Match } from "../model";
// import { useTheme } from "@/app/providers/ThemeProvider";
import { MatchStatus } from "@/shared/ui/MatchStatus";
import { TeamTitle } from "@/shared/ui/TeamTitle";
import { View, Text } from "react-native";

export const MatchCard: React.FC<{ matchData: Match }> = ({ matchData }) => {
  // const { theme } = useTheme();

  return (
    <View
      className={clsx(
        "flex flex-row justify-between items-center bg-[#0B0E12] p-4 rounded-[4px] w-full h-[90px]"
      )}
    >
      <TeamTitle name={matchData.homeTeam.name} classNames="flex-1" />
      
      <View className="flex flex-col justify-center items-center gap-[4px] flex-1">
        <Text
          className="text-xl text-white font-medium"
          style={{ fontFamily: "Inter" }}
        >
          {matchData.homeScore + " : " + matchData.awayScore}
        </Text>
        <MatchStatus MatchStatus={matchData.status} />
      </View>

      <TeamTitle
        name={matchData.awayTeam.name}
        classNames="flex-row-reverse flex-1"
      />
    </View>
  );
};
