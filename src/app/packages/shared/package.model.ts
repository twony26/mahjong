import { Guid } from "guid-typescript/dist/guid";

export class Package {
    $key: string;
    name: string;
    description: string;
    inclusions: string;
    minPersons: number;
    maxPersons: number;
    duration: string;
    address: string;
    imgUrl: string;
    contactNumber: string;
    guid: Guid;
    gallery: string[];
}
