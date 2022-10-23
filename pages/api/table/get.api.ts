import type { NextApiRequest, NextApiResponse } from "next";
import type { NotionRow } from "types/Row";
import getNotionTable from "./database";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotionRow[] | string>
) {
	if (typeof process.env.DATABASE_ID !== "string") {
		res.status(500).send("DATABASE_ID not set");
		return;
	}

	return res.send(await getNotionTable(process.env.DATABASE_ID));
}
