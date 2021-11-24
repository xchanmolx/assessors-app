import { IBoundary } from "./boundary";
import { IKindOfProperty } from "./kindOfProperty";

export interface IRealProperty {
    id: number;
    tdNo: string;
    owner: string;
    address: string;
    propertyLocation: string;
    propertyIndentificationNo: string;
    arpNo: string;
    tinNo: string;
    telephoneNo: string;
    octTctCloaNo: string;
    octNo: string;
    dated: string;
    surveyLotNo: string;
    assessorLotNo: string;
    blkNo: string;
    boundary: IBoundary;
    kindOfPropertyAssessed: string;
    noOfStoreys: string;
    briefDescription: string;
    specify: string;
    kindOfProperties: IKindOfProperty[];
    totalAssessedValueInWord: string;
    taxableExempt: string;
    quarter: string;
    year: number;
    recommendedBy: string;
    approvedBy: string;
    date: Date;
    declarationCancels: string;
    ownerTdNoCancels: string;
    previousAssessedValue: number;
    memoranda: string;
    approvedMessage: string;
    notes: string;
}