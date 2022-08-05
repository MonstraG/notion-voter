import type { NextApiRequest, NextApiResponse } from "next";
import type { NotionRow } from "types/Row";
import notionTable from "helpers/api/database";
import { send } from "helpers/api/send";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<NotionRow[] | string>
) {
	send(res, notionTable);
}
