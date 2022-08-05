import type { NextApiRequest, NextApiResponse } from "next";
import { changeVote } from "pages/api/vote/voting";
import authOptions from "pages/api/auth/[...nextauth].api";
import { unstable_getServerSession } from "next-auth";
import { send } from "pages/api/send";
import type { ThisUser } from "types/User";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return unstable_getServerSession(req, res, authOptions).then((session) =>
		send(res, changeVote(session.user as ThisUser, req.body))
	);
}
