export interface NotionRow {
	played: boolean;
	players: string;
	completed: boolean;
	name: string;
}

export interface NotionResultRow extends NotionRow {
	votes?: number;
}
