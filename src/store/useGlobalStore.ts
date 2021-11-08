import create from "zustand";
import { User } from "../types";

// store types
type Store = {
	user: User;
	loginUser: (user: User) => void;
	logoutUser: () => void;
	changePostsSetter: () => void;
	changePosts: boolean;
};

const useGlobalStore = create<Store>((set) => ({
	user: {
		signedIn: false,
	},
	changePosts: false,
	loginUser: (user) => set({ user }),
	logoutUser: () => set({ user: { signedIn: false } }),
	changePostsSetter: () =>
		set((state) => ({
			changePosts: !state.changePosts,
		})),
}));

export default useGlobalStore;
