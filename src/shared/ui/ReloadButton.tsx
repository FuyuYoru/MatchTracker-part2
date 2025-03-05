import { Pressable, Text, View } from "react-native";
import { ReloadIcon } from "./icons/ReloadIcon";
import { useFonts } from "expo-font";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const ReloadButton: React.FC<ButtonProps> = ({ text, disabled, onPress }) => {

  return (
    <Pressable
      className={`
        p-4 rounded-[4px] w-full sm:w-[204] h-[56]
        ${disabled ? "bg-[#701328]" : "bg-[#EB0237] active:bg-[#A01131]"}
        justify-center items-center
      `}
      disabled={disabled}
      onPress={onPress}
    >
      <View className="flex-row items-center space-x-2">
        <Text className="text-lg font-medium text-white" style={{fontFamily: "Inter"}}>{text}</Text>
        <ReloadIcon />
      </View>
    </Pressable>
  );
};
