import type { NextApiRequest, NextApiResponse } from "next";
import notion from "api/notion";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (typeof process.env.DATABASE_ID !== "string") {
		res.status(500).send("DATABASE_ID not set");
		return;
	}

	const response = await notion.databases.query({
		database_id: process.env.DATABASE_ID
	});

	const data = response.results
		.map((p) => {
			if (p.object === "page" && "properties" in p) {
				return p?.properties;
			}
			return null;
		})
		.filter((p) => p != null);

	res.status(200).json(data);
}
