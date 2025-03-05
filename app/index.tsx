import { View, Text } from "react-native";
import "~/index.css";
import { useFonts } from "expo-font";
import { useMatchStore } from "@/features/matches/store";
import { useEffect } from "react";
import { ReloadButton } from "@/shared/ui/ReloadButton";
import { ErrorNotify } from "@/shared/ui/ErrorNotify";
import { MatchCard } from "@/features/matches/ui/MatchCard";

const App: React.FC = () => {

  const { matches, isLoading, fetchError, fetchMatches } = useMatchStore();
  
    useEffect(() => {
      fetchMatches();
    }, []);


  return (
    <View className="h-full w-full flex flex-col overflow-hidden max-h-dvh">
          {/* Header */}
          <View className="flex flex-col sm:flex-row gap-[10] sm:gap-0 justify-between sticky top-0 pb-2.5">
            <Text className="italic text-center text-white" style={{fontFamily: "TacticSansUlt", fontSize: 32}}>
              Match Tracker
            </Text>
            <View className="flex flex-row gap-[12] items-center">
              {fetchError && (
                <ErrorNotify text="Ошибка: не удалось загрузить информацию" />
              )}
              <ReloadButton text="Обновить" onPress={fetchMatches} />
            </View>
          </View>
    
          <View className="w-full h-full bg-transparent flex flex-col gap-[12px] pt-2.5 pb-5 overflow-y-auto">
            {isLoading
              ? null
              // Array.from({ length: 7 }).map((_, i) => (
              //     <MatchCardSkeleton key={i} />
              //   ))
              : matches.map((match, i) => (
                  <MatchCard key={i} matchData={match} />
                ))}
          </View>
        </View>
  );
}
export default App;
