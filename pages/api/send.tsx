import type { NextApiResponse } from "next";

export const send = (response: NextApiResponse, result?: any) => {
	response.status(200);
	if (result) {
		response.json(result);
	}
	response.end();
};
