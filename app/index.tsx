import { View, Text, FlatList } from "react-native";
import "~/index.css";
import { useFonts } from "expo-font";
import { useMatchStore } from "@/features/matches/store";
import { useEffect } from "react";
import { ReloadButton } from "@/shared/ui/ReloadButton";
import { ErrorNotify } from "@/shared/ui/ErrorNotify";
import { MatchCard } from "@/features/matches/ui/MatchCard";
import { MatchCardSkeleton } from "~/src/features/matches/ui/MatchCardSkeleton";

const App: React.FC = () => {

  const { matches, isLoading, fetchError, fetchMatches } = useMatchStore();

  useEffect(() => {
    fetchMatches();
  }, []);



  return (
    <View className="h-full w-full flex flex-col overflow-hidden max-h-dvh">
      {/* Header */}
      <View className="flex flex-col sm:flex-row gap-[10] sm:gap-0 justify-between sticky top-0 pb-2.5">
        <View className="flex flex-col sm:flex-row gap-[10]">
          <Text className="italic text-center text-white font-extrabold" style={{ fontFamily: "TacticSansUlt", fontSize: 32 }}>
            Match Tracker
          </Text>
        </View>
        <View className="flex flex-row gap-[12] items-center">
          {fetchError && (
            <ErrorNotify text="Ошибка: не удалось загрузить информацию" />
          )}
          <ReloadButton text="Обновить" onPress={fetchMatches} disabled={isLoading} />
        </View>
      </View>
      {isLoading
        ? <FlatList data={Array.from({ length: 7 })} renderItem={({ item }) => <MatchCardSkeleton />} keyExtractor={(item, index) => `${index}`} />
        : <FlatList data={matches} renderItem={({ item }) => <MatchCard matchData={item} />} keyExtractor={(item, index) => `${index}`} />
      }
    </View>
  );
}
export default App;
