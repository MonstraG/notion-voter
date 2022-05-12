import doIfLoggedIn from "pages/api/authConditionals/doIfLoggedIn";
import { NextApiRequest, NextApiResponse } from "next";
import doIfIsAdmin from "pages/api/authConditionals/doIfIsAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean | null>) {
	await doIfLoggedIn(
		req,
		res,
		doIfIsAdmin(() => true)
	);
}
