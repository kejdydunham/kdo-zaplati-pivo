import React from 'react';
import {connect} from "react-redux";
import {RootState} from "../../app/types";
import {GameProgress, gameProgressToGamePanel} from "./types";

interface StoreProps {
    gameProgress: GameProgress;
}

interface DispatchProps {

}

type Props = StoreProps & DispatchProps;

function Game({gameProgress}: Props) {

    let GamePanel = gameProgressToGamePanel[gameProgress];
    return (
        <div>
            <GamePanel />
        </div>
    )
}

export default connect<StoreProps, DispatchProps, {} , RootState>(
    (state) => ({
        gameProgress: state.app.gameProgress
    })
)(Game);