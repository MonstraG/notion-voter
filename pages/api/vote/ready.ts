import { NextApiRequest, NextApiResponse } from "next";
import { changeReady } from "pages/api/vote";
import doIfLoggedIn from "pages/api/doIfLoggedIn";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await doIfLoggedIn(req, res, changeReady);
}
