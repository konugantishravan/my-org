export interface Area {
    id: number;
    name: string;
    countryCode: string;
    ensignUrl: string;
}

export interface Winner {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crestUrl: string;
}

export interface CurrentSeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday?: number;
    winner: Winner;
}

export interface Competition {
    id: number;
    area: Area;
    name: string;
    code: string;
    emblemUrl: string;
    plan: string;
    currentSeason: CurrentSeason;
    numberOfAvailableSeasons: number;
    lastUpdated: Date;
}

export interface CompetetitionsResponse {
    count: number;
    competitions: Competition[];
}
export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday?: any;
    availableStages: string[];
}

     export interface TeamsResponse {
        count: number;
        competition: Competition;
        season: Season;
        teams: Team[];
    }
    export interface Area2 {
        id: number;
        name: string;
    }
    export interface Team {
        id: number;
        area: Area2;
        name: string;
        shortName: string;
        tla: string;
        crestUrl: string;
        address: string;
        phone: string;
        website: string;
        email: string;
        founded: number;
        clubColors: string;
        venue: string;
        lastUpdated: Date;
    }
    export interface Squad {
        id: number;
        name: string;
        position: string;
        dateOfBirth: Date;
        countryOfBirth: string;
        nationality: string;
        role: string;
    }

    export interface TeamDetailsResponse {
        id: number;
        area: Area;
        name: string;
        shortName: string;
        tla: string;
        crestUrl: string;
        address: string;
        phone: string;
        website: string;
        email: string;
        founded: number;
        clubColors: string;
        venue: string;
        squad: Squad[];
        lastUpdated: Date;
    }
