import { create } from "zustand";
import { Match } from "./model"
import { fetchMatches } from "./api/fetchMatches";


interface MatchStore {
    matches: Match[],
    isLoading: boolean,
    fetchError: boolean,
    fetchMatches: () => Promise<void>;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
    matches: [],
    isLoading: false,
    fetchError: false,

    fetchMatches: async () => {
        set({ isLoading: true, fetchError: false });
    
        try {
            setTimeout(async () => {
                const res = await fetchMatches();
                const data = res;
                set({ matches: data, isLoading: false });
                console.log(get().matches);
            }, 1500);
        } catch {
            set({ fetchError: true, isLoading: false });
        }
    },    
}));