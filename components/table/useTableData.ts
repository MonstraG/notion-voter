import useSWR from "swr";
import type { NotionRow } from "types/Row";

const useTableData = () => useSWR<NotionRow[]>("/api/table/get");

export default useTableData;
