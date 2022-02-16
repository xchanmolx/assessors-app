import { IKindOfProperty } from "./kindOfProperty";

export interface IMergeOfLandsMixUse {
    tdNo: string;
    propertyLocation: string;
    kindOfProperties: IKindOfProperty[];
    previousAssessedValue: number;
    year: number;
}