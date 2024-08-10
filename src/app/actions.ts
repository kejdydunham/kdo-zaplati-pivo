import {ActionType, createAction} from "typesafe-actions";

interface SetPlayerCountPayload {
    playerCount: number
}

interface PlayPayload {
    currentPlayer: number;
    // name: string;
    // value: number;
}

interface FinishPayload {
    winnerNumber: number;
}

interface ChangePlayerValuePayload {
    playerNumber: number;
    value?: number;
}

interface ChangePlayerNamePayload {
    playerNumber: number;
    name?: string;
}

export const appActions = {
    initGame: createAction("INIT_NEW_GAME")(),
    startGame: createAction("START_GAME")(),
    setPlayerCount: createAction("SET_PLAYER_COUNT")<SetPlayerCountPayload>(),
    goToNextPlayer: createAction("GO_TO_NEXT_PLAYER")(),
    finish: createAction("FINISH")(),
    changePlayerValue: createAction("CHANGE_PLAYER_VALUE")<ChangePlayerValuePayload>(),
    changePlayerName: createAction("CHANGE_PLAYER_NAME")<ChangePlayerNamePayload>(),
}

export type AppAction = ActionType<typeof appActions>;
