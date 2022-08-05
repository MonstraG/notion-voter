import type { NextApiRequest, NextApiResponse } from "next";
import { getVoteState } from "pages/api/vote/voting";
import { send } from "pages/api/send";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return send(res, getVoteState());
}
