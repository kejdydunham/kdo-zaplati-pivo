import './Game.css';
import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../app/types";
import {GameProgress, gameProgressToGamePanel} from "./types";
import Button from "../../atoms/button/Button";
import {appActions} from "../../app/actions";

interface StoreProps {
    gameProgress: GameProgress;
}

interface DispatchProps {
    initGame: typeof appActions.initGame;
}

type Props = StoreProps & DispatchProps;

function Game({gameProgress, initGame}: Props) {

    let GamePanel = gameProgressToGamePanel[gameProgress];
    const onClick = () => {
        initGame();
    }
    return (
        <div className="game">
            <GamePanel/>
            {gameProgress === GameProgress.PLAYING && (
                <div className="buttons">
                    <Button
                        className="secondary"
                        onClick={onClick}
                        title={"Začít od začátku"}
                    />
                </div>
            )}
        </div>
    )
}

export default connect<StoreProps, DispatchProps, {}, RootState>(
    (state) => ({
        gameProgress: state.app.gameProgress,
    }), {
        initGame: appActions.initGame,
    }
)(Game);