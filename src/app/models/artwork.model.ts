export interface ArtworkObject {
    data?: any,
    pagination?: any
}
export interface Artwork {
    title: string;
    artist_title: string,
    location: string;
    image_id: string;
    date_start: number;
    date_end: number;
    style_titles: Array<string>
}
export interface StyleTitle {
    title: string;
    name: number;

}

export interface Paginator {
    count: number;
    page: number;
    perPage: number;
}
export class Sorting {
    text: string;
    value: string;
    isASC: boolean;
    dataType: DataType
    constructor() {
        this.dataType = DataType.STRING;
        this.text = "";
        this.value = "";
        this.isASC = false;
    }
}
export enum DataType {
    STRING = 'STRING',
    BOOLEAN = 'BOOLEAN',
    NUMBER = 'NUMBER',
    DATE = 'DATE',
}

export const SORTING_DATA = [
    {
        text: 'Name',
        value: "title",
        isASC: false,
        dataType: DataType.STRING
    },
    {
        text: 'Artist',
        value: "artist_title",
        isASC: false,
        dataType: DataType.STRING
    },
    {
        text: 'Date',
        value: "date_start",
        isASC: false,
        dataType: DataType.NUMBER
    }
]

export const stringSorterFunction = (columnName: any, direction: any): any => {
    try {
        return (a, b) => {
            a = a[columnName] ? a[columnName] : " ";
            b = b[columnName] ? b[columnName] : " ";
            let s;
            switch (direction) {
                case "UP":
                    s = a ? a.localeCompare(b) : 1;
                    break;
                case "DOWN":
                    s = b ? b.localeCompare(a) : -1;
                    break;
                default:
                    s = 0;
                    break;
            }
            return s;
        };
    } catch (e) {
        throw e;
    }
}
export const dateSorterFunction = (columnName: any, direction: any): any => {
    return (a, b) => {
        a = new Date(a[columnName]);
        b = new Date(b[columnName]);
        let s;
        switch (direction) {
            case "UP":
                s = b - a;
                break;
            case "DOWN":
                s = a - b;
                break;
            default:
                s = 0;
                break;
        }
        return s;
    };
}
export const numberSorterFunction = (columnName: any, direction: any): any => {
    return (a, b) => {
        a = a[columnName] ? a[columnName] : 0;
        b = b[columnName] ? b[columnName] : 0;
        let s;
        switch (direction) {
            case "UP":
                s = a - b;
                break;
            case "DOWN":
                s = b - a;
                break;
            default:
                s = 0;
                break;
        }
        return s;
    };
}

