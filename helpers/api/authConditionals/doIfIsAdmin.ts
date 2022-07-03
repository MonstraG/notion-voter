import { ThisUser } from "types/User";
import { Callback } from "helpers/api/authConditionals/doIfLoggedIn";

const adminWhitelist: string[] = JSON.parse(process.env.ADMIN_WHITELIST);

const doIfIsAdmin =
	(cb: Callback): Callback =>
	(user: ThisUser, body: any) => {
		const isAdmin = adminWhitelist.includes(user.email);
		if (isAdmin) {
			return cb(user, body);
		}
		return;
	};

export default doIfIsAdmin;
