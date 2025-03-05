import clsx from "clsx";
import { Image, Text, View } from "react-native";

interface TeamTitleProps {
  name: string;
  classNames?: string;
  //   icon?: FC<{ className?: string }>;
}

export const TeamTitle: React.FC<TeamTitleProps> = ({
  name,
  classNames = "",
  //   icon: Icon = TeamIcon,
}) => {
  return (
    <View
      className={clsx(
        "bg-transparent flex flex-row items-center gap-[14] p-4",
        classNames
      )}
    >
      {/* <Icon className="w-6 h-6 mr-2" /> */}
      <Image src="/teamIcon.png" />
      <Text className="text-white font-[600]" style={{fontFamily: 'Inter', fontSize: 16}}>{name}</Text>
    </View>
  );
};
