export type Festival = {
    id?: number;
    name: string;
    description: string;
    imageUrl: string;
    isCurrent: boolean
}

export type Game = {
    id?: number;
    name: string;
    minNumberPlayer: number;
    maxNumberPlayer: number;
    minYearPlayer: number;
    duration: number;
    isPrototype: boolean;
    type: GameType;
    manual: string;
    imageUrl?: string;
    editor: Company;
}

export type GameType = {
    id?: number;
    label: string
}

export type Company = {
    id?: string;
    name: string;
    mail: string;
    address: string;
    canBeExhibitor: boolean;
    contacts: Contact[];
    games: Game[];
}

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    isAdmin: boolean;
}

export type Contact = {
    id?: number;
    firstname: string;
    lastname: string;
    mail: string;
    mobilePhoneNumber: string;
    fixPhoneNumber: string;
    job: string;
    isImportant: boolean;
    isDeleted: boolean;
    company: Company;
}

export type Space = {
    id?: number;
    label: string;
    tablePrice: number;
    meterPrice: number;
    tableTotal: number;
}
