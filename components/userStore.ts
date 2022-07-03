import create from "zustand";
import { ThisUser } from "types/User";

const userStore = create<{
	user: ThisUser;
	fallback: boolean;
}>(null);

export default userStore;
