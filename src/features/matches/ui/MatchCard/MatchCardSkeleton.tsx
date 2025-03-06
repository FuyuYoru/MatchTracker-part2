import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";

const PulseAnimation = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View className="h-14 flex-1 sm:max-w-36 bg-gray-700 rounded-md" style={animatedStyle} />;
};

export const MatchCardSkeleton: React.FC = () => {
  return (
    <View className="flex-row justify-between items-center gap-[10] mb-[12] sm:gap-0 p-4 rounded-[4] w-full h-[90] bg-[#0F1318]">
      <PulseAnimation />
      <PulseAnimation />
      <PulseAnimation />
    </View>
  );
};
