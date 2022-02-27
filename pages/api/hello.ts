import type { NextApiRequest, NextApiResponse } from "next";
import notion from "api/notion";
import { Row } from "types/Row";

type DatabaseRow = UnArray<Awaited<TableRowsQueryResult>>;

const getCheckboxValue = (row: DatabaseRow, property: string): boolean => {
	const prop = row![property];
	if (property == null) {
		console.warn(`Did not find property ${property} in row ${row!.id}`);
		return false;
	}
	return prop.type === "checkbox" && prop.checkbox;
};

const getRichTextPlainValue = (row: DatabaseRow, property: string): string => {
	const prop = row![property];
	if (property == null) {
		console.warn(`Did not find property ${property} in row ${row!.id}`);
		return "";
	}
	return prop.type === "rich_text" ? prop.rich_text[0].plain_text : "";
};

const getTitle = (row: DatabaseRow, property: string): string => {
	const prop = row![property];
	if (property == null) {
		console.warn(`Did not find property ${property} in row ${row!.id}`);
		return "";
	}
	return prop.type === "title" ? prop.title[0].plain_text : "";
};

const parseRows = (rows: Awaited<TableRowsQueryResult>): Row[] =>
	rows
		.filter((row) => !getCheckboxValue(row, "N/A")) // only available
		.map((row) => ({
			played: getCheckboxValue(row, "Played"),
			players: getRichTextPlainValue(row, "Players"),
			completed: getCheckboxValue(row, "Completed"),
			name: getTitle(row, "Name")
		}));

type UnArray<T> = T extends (infer U)[] ? U : T;
//
// type QueryDatabaseResults = UnArray<QueryDatabaseResponse["results"]>;
//
// type DatabaseProperties = QueryDatabaseResults["properties"];

type TableRowsQueryResult = ReturnType<typeof queryForTableRows>;

const queryForTableRows = async (databaseId: string) => {
	const response = await notion.databases.query({
		database_id: databaseId
	});

	return response.results
		.map((p) => {
			if (p.object === "page" && "properties" in p) {
				return p?.properties;
			}
			return null;
		})
		.filter((p) => p != null);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Row[] | string>) {
	if (typeof process.env.DATABASE_ID !== "string") {
		res.status(500).send("DATABASE_ID not set");
		return;
	}

	const tableRows = await queryForTableRows(process.env.DATABASE_ID);

	res.status(200).json(parseRows(tableRows));
}
