export interface IGame {
    id?:number;
    name: string;
    minNumberPlayer: number;
    maxNumberPlayer: number;
    minYearPlayer: number;
    duration: number;
    isPrototype: boolean;
    type: IGameType;
    manual: string;
    imageUrl: string;
    editor: ICompany
}

export interface IGameType {
    id?: number;
    label: string
}

export interface ICompany {
    id?:string;
    name: string;
    mail: string;
    address: string;
    canBeExhibitor: boolean;
}
