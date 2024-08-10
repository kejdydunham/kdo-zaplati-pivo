import {combineReducers} from "redux";
import {AppAction, appActions} from "../actions";
import {PlayersData, RootState} from "../types";
import {getType} from "typesafe-actions";
import {GameProgress} from "../../organisms/game/types";
import {assocPath} from "ramda";

export interface AppState {
    gameProgress: GameProgress;
    playerCount?: number;
    currentPlayer?: number;
    playerData: PlayersData;
    winningNumber?: number;
    // winner?: Player,
}

export const appInitialState: AppState = {
    gameProgress: GameProgress.INITIALIZED,
    playerData: {},
}

export type RootActionType = AppAction;

const app = (state: AppState = appInitialState, action: RootActionType): AppState => {
    switch (action.type) {
        case getType(appActions.initGame): {
            return {
                ...appInitialState,
            };
        }
        case getType(appActions.goToNextPlayer): {
            // const {currentPlayer} = action.payload;
            return {
                ...state,
                currentPlayer: (state.currentPlayer || 1) + 1
            }
        }
        case getType(appActions.finish): {
            // const {winnerNumber} = action.payload;
            return {
                ...state,
                gameProgress: GameProgress.FINISHED,
                // winner: state.playerData[winnerNumber]
            }
        }
        case getType(appActions.setPlayerCount): {
            const {playerCount} = action.payload
            const playerData: PlayersData = {};
            for (let i = 1; i <= playerCount; i++) {
                playerData[i] = {
                    name: "",
                }
            }
            return {
                ...state,
                playerCount,
                playerData,
            }
        }
        case getType(appActions.startGame): {
            return {
                ...state,
                gameProgress: GameProgress.PLAYING,
                currentPlayer: 1,
                winningNumber: Math.floor(Math.random() * 100),
            };
        }
        case getType(appActions.changePlayerValue): {
            const {playerNumber, value} = action.payload
            return assocPath(['playerData', playerNumber, 'value'], value, state);
        }
        case getType(appActions.changePlayerName): {
            const {playerNumber, name} = action.payload
            return assocPath(['playerData', playerNumber, 'name'], name, state);
        }
        default: {
            return state;
        }
    }

}

export const createRootReducer = () => combineReducers<RootState>({
    // @ts-ignore dont have time for this shit now
    app,
})