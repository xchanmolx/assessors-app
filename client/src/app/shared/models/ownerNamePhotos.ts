import { IPhoto } from "./photo";

export interface IOwnerNamePhotos {
    owner: string;
    photos: IPhoto[];
}