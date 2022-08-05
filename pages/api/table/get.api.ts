import type { NextApiRequest, NextApiResponse } from "next";
import type { NotionRow } from "types/Row";
import notionTable from "pages/api/table/database";
import { send } from "pages/api/send";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotionRow[] | string>
) {
	send(res, notionTable);
}
