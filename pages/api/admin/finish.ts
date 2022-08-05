import type { NextApiRequest, NextApiResponse } from "next";
import { finishVote } from "helpers/api/voting";
import { send } from "helpers/api/send";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return finishVote().then(() => send(res));
}
