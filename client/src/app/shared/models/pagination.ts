import { IRealProperty } from "./realProperty";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IRealProperty[];
}