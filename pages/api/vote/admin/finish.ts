import { NextApiRequest, NextApiResponse } from "next";
import { finishVote } from "helpers/api/vote";
import doIfLoggedIn from "pages/api/authConditionals/doIfLoggedIn";
import doIfIsAdmin from "pages/api/authConditionals/doIfIsAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await doIfLoggedIn(req, res, doIfIsAdmin(finishVote));
}
