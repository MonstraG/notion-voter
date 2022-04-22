import useSWR from "swr";
import { NotionRow } from "types/Row";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const minuteInMs = 60000;

const useTableData = () =>
	useSWR<NotionRow[]>("/api/table/get", fetcher, { refreshInterval: minuteInMs });

export default useTableData;
