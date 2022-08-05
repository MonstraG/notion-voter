import create from "zustand";
import { ThisUser } from "types/User";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type UserState = {
	user: ThisUser;
	fallback: boolean;
};

const userStore = create<UserState>(() => ({ user: null, fallback: false }));

export default userStore;

/**
 * fills userStore with either data or fallback info
 * @param isVercel
 * @param fallbackInfo
 */
export const useSetUserStore = (isVercel: boolean, fallbackInfo: ThisUser | null) => {
	const { status, data } = useSession();
	useEffect(() => {
		if (status === "authenticated") {
			userStore.setState({
				user: data.user as ThisUser,
				fallback: false
			});
		}
	}, [data, status]);

	useEffect(() => {
		if (fallbackInfo) {
			userStore.setState({
				user: fallbackInfo,
				fallback: true
			});
		}
	}, [fallbackInfo]);

	return data?.user ?? fallbackInfo;
};
