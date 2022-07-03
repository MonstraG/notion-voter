import create from "zustand";
import { ThisUser } from "types/User";

type UserState = {
	user: ThisUser;
	fallback: boolean;
}

const userStore = create<UserState>(null);

export default userStore;
