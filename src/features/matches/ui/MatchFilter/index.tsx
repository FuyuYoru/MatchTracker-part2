import { View, Text, TouchableOpacity, Animated } from "react-native";
import { DropdownMenu } from "@/shared/ui/DropdownPopup";
import { ArrowIconFilled } from "@/shared/ui/icons/ArrowIconFilled";
import { useRef, useState } from "react";
import { MatchStatus } from "../../model";
import clsx from "clsx";

interface IMatchFilter {
  onChange: (filterValue: MatchStatus | null) => void;
}

type SelectorItem = {
  value: MatchStatus | null;
  title: string;
};

export const MatchFilter: React.FC<IMatchFilter> = ({ onChange }) => {
  const selectorItems: SelectorItem[] = [
    { value: null, title: "Все статусы" },
    { value: "Scheduled", title: "Match preparing" },
    { value: "Ongoing", title: "Live" },
    { value: "Finished", title: "Finished" },
  ];

  const [selectedItem, setSelectedItem] = useState<SelectorItem>(
    selectorItems[0]
  );
  const rotationAnim = useRef(new Animated.Value(0)).current; // Анимация иконки

  const handleSelect = (item: SelectorItem) => {
    setSelectedItem(item);
    onChange(item.value);
  };

  const animateIcon = (isOpen: boolean) => {
    Animated.timing(rotationAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <DropdownMenu
      trigger={
        <View className="flex flex-row items-center justify-between sm:justify-center gap-[12] w-full sm:w-[170] bg-[#0B0E12] hover:bg-[#0F1318] py-[10] px-[16] rounded-[4]">
          <Text
            className="text-[#B4B5B6]"
            style={{ fontFamily: "Inter", fontSize: 16 }}
          >
            {selectedItem.title}
          </Text>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <ArrowIconFilled />
          </Animated.View>
        </View>
      }
      menuContent={({ closeMenu }) => (
        <View className="bg-[#0F1318] rounded-[4] shadow-md w-full sm:w-[170] z-[1000]" style={{ zIndex: 1000, elevation: 1000 }}>
          {selectorItems.map((item) => {
            const isSelected = selectedItem.value === item.value;
            console.log(isSelected);
            return (
              <TouchableOpacity
                key={item.value ?? "null"}
                className="px-4 py-2 w-full hover:bg-[#11161D] active:bg-[#0D1115] disabled:bg-[#0F1318]"
                onPress={() => {
                  if (isSelected) {
                    return
                  }
                  handleSelect(item);
                  closeMenu();
                }}
              >
                <Text
                  className={clsx("text-[#B4B5B6]  text-lg", isSelected? "text-[#68696A]": '')}
                  style={{ fontFamily: "Inter", fontSize: 16 }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      classNames="h-full w-full sm:w-[170]"
      offsetY={65}
      onChangeState={animateIcon}
    />
  );
};
