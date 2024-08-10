import GameInit from "../../molecules/game-init/GameInit";
import GameFinished from "../../molecules/game-finished/GameFinished";
import GamePlaying from "../../molecules/game-playing/GamePlaying";

export enum GameProgress {
    INITIALIZED = 'INITIALIZED', PLAYING = 'PLAYING', FINISHED = 'FINISHED'
}

type GameProgressToPanel = {
    [progress in GameProgress]: React.ComponentType
}

export const gameProgressToGamePanel: GameProgressToPanel = {
    [GameProgress.INITIALIZED]: GameInit,
    [GameProgress.PLAYING]: GamePlaying,
    [GameProgress.FINISHED]: GameFinished,


}