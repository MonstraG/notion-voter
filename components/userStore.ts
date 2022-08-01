import create from "zustand";
import { ThisUser } from "types/User";

type UserState = {
	user: ThisUser;
	fallback: boolean;
};

const userStore = create<UserState>(() => ({ user: null, fallback: false }));

export default userStore;
