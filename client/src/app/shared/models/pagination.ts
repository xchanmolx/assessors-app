import { IRealProperty } from "./realProperty";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    totalAssessedValue: number;
    totalPrevAssessedValue: number;
    data: IRealProperty[];
}