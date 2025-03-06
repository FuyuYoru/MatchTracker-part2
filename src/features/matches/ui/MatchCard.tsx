import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Animated, FlatList, ScrollView } from 'react-native';
import { ArrowIcon } from '@/shared/ui/icons/ArrowIcon';
import clsx from 'clsx';
import { TeamTitle } from '~/src/features/matches/ui/TeamTitle';
import { MatchStatus } from '~/src/features/matches/ui/MatchStatus';
import { TeamStatistics } from '~/src/features/matches/ui/TeamStatistics';
import { PlayerStatistics } from '~/src/features/matches/ui/PlayerStatistics';
import { Player } from '~/src/features/matches/model';

export const MatchCard: React.FC<{ matchData: any }> = ({ matchData }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const rotateAnim = useState(new Animated.Value(0))[0];

  const handlePress = useCallback(() => {
    setIsOpened((prev) => !prev);
    Animated.timing(rotateAnim, {
      toValue: isOpened ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpened, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className="flex flex-col mb-[12] bg-[#0B0E12] p-[8] sm:px-4 rounded-[4px] w-full gap-[8]">
      <Pressable onPress={handlePress}>
        <View className="flex flex-row justify-between items-center">
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
        <View className='flex sm:flex-row sm:gap-[32]' >
          <View className="flex flex-col flex-1 gap-[8]">
            <ScrollView contentContainerClassName="flex flex-row gap-[8]">
              {matchData.homeTeam.players.map((item: Player, index: number) => (
                <PlayerStatistics player={item} key={index} />
              ))}
            </ScrollView>

            <TeamStatistics team={matchData.homeTeam} />
          </View>

          <View className="block sm:hidden justify-center items-center py-[8] w-full">
            <View className="flex flex-row items-center">
              <View className="flex-1 bg-[#13181F] h-[1]"></View>
              <Text
                className="text-[#313A47] font-bold text-lg px-[8]"
                style={{ fontFamily: 'Inter', fontSize: 14 }}
              >
                VS
              </Text>
              <View className="flex-1 bg-[#13181F] h-[1]"></View>
            </View>
          </View>

          <View className="flex flex-col flex-1  gap-[8]">
            <ScrollView contentContainerClassName="flex flex-row gap-[8]">
              {matchData.awayTeam.players.map((item: Player, index: number) => (
                <PlayerStatistics player={item} key={index} />
              ))}
            </ScrollView>

            <TeamStatistics team={matchData.awayTeam} />
          </View>
        </View>
        <View className="w-full flex items-center">
          <Animated.View
            style={{ transform: [{ rotate }] }}
          >
            <ArrowIcon />
          </Animated.View>
        </View>

      </Pressable>
    </View>
  );
};
