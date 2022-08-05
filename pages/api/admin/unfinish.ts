import type { NextApiRequest, NextApiResponse } from "next";
import { unfinishVote } from "helpers/api/voting";
import { send } from "helpers/api/send";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return unfinishVote().then(() => send(res));
}
