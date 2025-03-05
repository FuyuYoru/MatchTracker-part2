// _layout.tsx

import React, { ReactNode } from "react";
import { SafeAreaView, StatusBar, View, Text, Platform } from "react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import clsx from "clsx";
import { scale, verticalScale } from 'react-native-size-matters';


interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [fontsLoaded] = useFonts({
    TacticSans: require("~/assets/fonts/TacticSans-Reg.ttf"),
    TacticSansBold: require("~/assets/fonts/TacticSans-Bld.ttf"),
    TacticSansUlt: require("~/assets/fonts/TacticSans-Ult.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading fonts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-[#06080C]"
      // style={{ flex: 1, backgroundColor: "#06080C" }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        className={clsx(
          "flex-1 bg-[#06080C] p-[16] sm:p-[16] md:p-[36] lg:p-[42]",
        )}
        // style={{padding: scale(16)}}
        // style={{ flex: 1, backgroundColor: "#06080C" }}
      >
        <Slot />
      </View>
    </SafeAreaView>
  );
};

export default AppLayout;
