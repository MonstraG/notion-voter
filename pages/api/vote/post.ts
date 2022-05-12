import { NextApiRequest, NextApiResponse } from "next";
import { changeVote } from "pages/api/vote";
import doIfLoggedIn from "pages/api/authConditionals/doIfLoggedIn";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await doIfLoggedIn(req, res, changeVote);
}
