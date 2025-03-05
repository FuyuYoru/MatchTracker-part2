// import { useTheme } from "@/app/providers/ThemeProvider";
import ErrorIcon from "@/shared/ui/icons/ErrorIcon";
import { Text, View } from "react-native";

interface ErrorNotifyProps {
  text: string;
  type?: "error";
}

export const ErrorNotify: React.FC<ErrorNotifyProps> = ({
  text,
  type = "error",
}) => {
  // const { theme } = useTheme();

  return (
    <View
      className={
        "bg-[#0F1318] flex flex-row px-[26px] py-[14px] gap-[10px] rounded-[4px] h-auto"
      }
    >
      {type === "error" ? <ErrorIcon /> : null}
      <Text className="content-center font-inter text-lg font-medium">{text}</Text>
    </View>
  );
};
