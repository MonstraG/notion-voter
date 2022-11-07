import type { NextApiResponse } from "next";

export const send = (
	response: NextApiResponse,
	result?: Parameters<NextApiResponse["json"]>[0]
) => {
	response.status(200);
	if (result) {
		response.json(result);
	}
	response.end();
};
