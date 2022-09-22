import type { NextApiRequest, NextApiResponse } from "next";
import { changeVote } from "pages/api/vote/voting";
import { send } from "pages/api/send";
import { getServerUser } from "pages/api/auth/getServerUser";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return getServerUser(req, res).then((user) => send(res, changeVote(user, req.body)));
}
