import { NotionRow } from "types/Row";
import notion from "pages/api/notion";

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

const parseRows = (rows: Awaited<TableRowsQueryResult>): NotionRow[] =>
	rows
		.filter((row) => !getCheckboxValue(row, "N/A")) // only available
		.map((row) => ({
			played: getCheckboxValue(row, "Played"),
			players: getRichTextPlainValue(row, "Players"),
			completed: getCheckboxValue(row, "Completed"),
			name: getTitle(row, "Name")
		}));

type UnArray<T> = T extends (infer U)[] ? U : T;

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

const getNotionTable = (databaseId: string): Promise<NotionRow[]> =>
	queryForTableRows(databaseId).then(parseRows);

export default getNotionTable;
