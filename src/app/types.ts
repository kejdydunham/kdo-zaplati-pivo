import {AppState} from "./storage/rootReducer";

export interface RootState {
    app: AppState;
}

export interface Player {
    name?: string;
    value?: number;
}

export interface PlayersData {
    [playerNumber: number]: Player;
}