import { NextApiRequest, NextApiResponse } from "next";
import { resetVote } from "helpers/api/vote";
import doIfLoggedIn from "helpers/api/authConditionals/doIfLoggedIn";
import doIfIsAdmin from "helpers/api/authConditionals/doIfIsAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await doIfLoggedIn(req, res, doIfIsAdmin(resetVote));
}
