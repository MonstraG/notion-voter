import { NextApiRequest, NextApiResponse } from "next";
import { ThisUser } from "types/User";
import { getSession } from "next-auth/react";

const required = Boolean(process.env.VERCEL);
const fallbackUser = JSON.parse(process.env.FALLBACK_USER_INFO!);

export type Callback = (user: ThisUser, body: any) => Promise<any> | any;

const doIfLoggedIn = async (req: NextApiRequest, res: NextApiResponse, cb: Callback) => {
	if (!required) {
		const result = await cb(fallbackUser, req.body);
		res.status(200);
		if (result) {
			res.json(result);
		}
		res.end();
		return;
	}

	const session = await getSession({ req });
	if (session && session.user?.name) {
		// Signed in
		const result = await cb(session.user as ThisUser, req.body);
		res.status(200);
		if (result) {
			res.json(result);
		}
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};

export default doIfLoggedIn;
