import { View, Image, Text } from "react-native";
import { Player } from "~/src/features/matches/model";

export const PlayerStatistics: React.FC<{ player: Player }> = ({ player }) => {
    return (
        <View className="flex flex-col sm:justify-between w-full sm:flex-row py-[7px] px-[12px] items-center bg-[#101318] rounded-[4px] flex-1">
            <View className="flex-row items-center sm:justify-between gap-[8px] max-sm:w-full">
                <Image 
                    source={require("~/assets/images/image.png")} 
                    style={{ width: 32, height: 32 }} 
                />
                
                <View className="max-sm:flex-1">
                    <Text
                        className="text-white"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ 
                            fontFamily: "Inter", 
                            fontSize: 14,
                            lineHeight: 16 
                        }}
                    >
                        {player.username}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center gap-[8px">
                <Text className="text-[#FAFAFA66]" style={{ fontFamily: "Inter", fontSize: 12 }}>
                    Убийств:
                </Text>
                <Text className="text-white" style={{ fontFamily: "Inter", fontSize: 12 }}>
                    {player.kills}
                </Text>
            </View>
        </View>
    );
}