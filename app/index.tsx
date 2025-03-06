import { useMemo, useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import "~/index.css";
import { useMatchStore } from "@/features/matches/store";
import { ReloadButton } from "@/shared/ui/ReloadButton";
import { ErrorNotify } from "@/shared/ui/ErrorNotify";
import { MatchCard, MatchFilter } from "@/features/matches/ui/";
import { MatchCardSkeleton } from "@/features/matches/ui/MatchCard/MatchCardSkeleton";
import { MatchStatus } from "@/features/matches/model";
import { useWebSocket } from "@/shared/hooks/useWebSocket";

const App: React.FC = () => {
  const { messages } = useWebSocket("wss://app.ftoyd.com/fronttemp-service/ws");
  const [selectedFilter, setSelectedFilter] = useState<MatchStatus | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        const newMatches = JSON.parse(messages[messages.length - 1])
        console.log(newMatches);
        setMatches(newMatches.data);
        setIsLoading(false);
      } catch (error) {
        setFetchError("Ошибка при обработке данных");
        setIsLoading(false);
      }
    }
  }, [messages]);

  const filteredMatches = useMemo(() => {
    return selectedFilter
      ? matches.filter((match) => match.status === selectedFilter)
      : matches;
  }, [matches, selectedFilter]);

  return (
    <View className="h-full w-full flex flex-col overflow-hidden max-h-dvh">
      <View className="flex flex-col sm:flex-row gap-[10] sm:gap-0 justify-between sticky top-0 pb-2.5 z-[10]">
        <View className="flex flex-col sm:flex-row gap-[24] z-[20]">
          <Text
            className="italic text-center text-white font-extrabold"
            style={{ fontFamily: "TacticSansUlt", fontSize: 32 }}
          >
            Match Tracker
          </Text>
          <MatchFilter onChange={(item) => setSelectedFilter(item)} />
        </View>
        <View className="flex flex-row gap-[12] items-center z-[10]">
          {fetchError && (
            <ErrorNotify text={`Ошибка: ${fetchError}`} />
          )}
          <ReloadButton
            text="Обновить"
            onPress={() => setIsLoading(true)}
            disabled={isLoading}
          />
        </View>
      </View>
      {isLoading ? (
        <FlatList
          data={Array.from({ length: 7 })}
          renderItem={({ item }) => <MatchCardSkeleton />}
          keyExtractor={(item, index) => `${index}`}
        />
      ) : (
        <FlatList
          data={filteredMatches}
          renderItem={({ item }) => <MatchCard matchData={item} />}
          keyExtractor={(item, index) => `${index}`}
        />
      )}
    </View>
  );
};

export default App;
