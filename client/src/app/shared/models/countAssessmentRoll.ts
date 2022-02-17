import { IRealProperty } from "./realProperty";

export interface ICountAssessmentRoll {
    totalAssessedValue: number;
    totalPrevAssessedValue: number;
    count: number;
    data: IRealProperty[];
}