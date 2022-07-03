import useSWR from "swr";
import { NotionRow } from "types/Row";

const minuteInMs = 60000;

const useTableData = () => useSWR<NotionRow[]>("/api/table/get", { refreshInterval: minuteInMs });

export default useTableData;
