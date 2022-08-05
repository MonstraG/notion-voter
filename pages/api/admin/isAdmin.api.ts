import type { NextApiRequest, NextApiResponse } from "next";
import { send } from "pages/api/send";

export default function handler(req: NextApiRequest, res: NextApiResponse<boolean | null>) {
	return send(res, true);
}
