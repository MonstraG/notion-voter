import { NextApiRequest, NextApiResponse } from "next";
import { unfinishVote } from "pages/api/vote";
import doIfLoggedIn from "pages/api/authConditionals/doIfLoggedIn";
import doIfIsAdmin from "pages/api/authConditionals/doIfIsAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await doIfLoggedIn(req, res, doIfIsAdmin(unfinishVote));
}
