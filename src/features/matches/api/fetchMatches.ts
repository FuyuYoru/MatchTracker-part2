import { axiosInstance } from "@/shared/api/axiosInstance";
import { Match } from "../model";
import { matches } from "@/mock/matches";
import { ApiPaths } from "@/shared/api/apiPaths";

export const fetchMatches = async (): Promise<Match[]> => {
    // const res = await new Promise<Match[]>((resolve) => {
    //     setTimeout(() => resolve(matches), 1000);
    // });
    // return res
    const response = await axiosInstance.get(ApiPaths.getMatches());

    if (!response.status) {
        throw new Error("Ошибка при загрузке матчей");
    }

    return response.data.data.matches;
};
