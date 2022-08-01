import type { NextApiRequest, NextApiResponse } from "next";
import type { NotionRow } from "types/Row";
import notionTable from "helpers/api/getTableFns";
import doIfLoggedIn from "helpers/api/authConditionals/doIfLoggedIn";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotionRow[] | string>
) {
	await doIfLoggedIn(req, res, () => notionTable);
}
