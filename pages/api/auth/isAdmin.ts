import doIfLoggedIn from "helpers/api/authConditionals/doIfLoggedIn";
import { NextApiRequest, NextApiResponse } from "next";
import doIfIsAdmin from "helpers/api/authConditionals/doIfIsAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean | null>) {
	await doIfLoggedIn(
		req,
		res,
		doIfIsAdmin(() => true)
	);
}
