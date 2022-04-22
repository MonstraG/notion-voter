import type { NextApiRequest, NextApiResponse } from "next";
import { NotionRow } from "types/Row";
import getNotionTable from "pages/api/getTableFns";
import doIfLoggedIn from "pages/api/doIfLoggedIn";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotionRow[] | string>
) {
	await doIfLoggedIn(req, res, async () => {
		if (typeof process.env.DATABASE_ID !== "string") {
			res.status(500).send("DATABASE_ID not set");
			return;
		}

		return await getNotionTable(process.env.DATABASE_ID);
	});
}
