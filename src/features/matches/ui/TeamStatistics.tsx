import { Text, View } from "react-native"
import { Team } from "@/features/matches/model"

export const TeamStatistics: React.FC<{team:Team}> = ({team}) => {
    return(
        <View className="flex flex-row px-[24] py-[14] bg-[#101318] rounded-[4]">
            <View className="flex flex-row flex-1 gap-[4]">
                <Text className="text-[#FAFAFA66]" style={{fontFamily: "Inter", fontSize: 14}}>Points:</Text>
                <Text className="text-white" style={{fontFamily: "Inter", fontSize: 14}}>+{team.points}</Text>
            </View>
            <View className="flex flex-row flex-1 gap-[4]">
                <Text className="text-[#FAFAFA66]" style={{fontFamily: "Inter", fontSize: 14}}>Место:</Text>
                <Text className="text-white" style={{fontFamily: "Inter", fontSize: 14}}>{team.place}</Text>
            </View>
            <View className="flex flex-row flex-1 flex-nowrap gap-[4]">
                <Text className="text-[#FAFAFA66] text-nowrap" style={{fontFamily: "Inter", fontSize: 14}}>Всего убийств:</Text>
                <Text className="text-white" style={{fontFamily: "Inter", fontSize: 14}}>{team.total_kills}</Text>
            </View>
        </View>
    )
}