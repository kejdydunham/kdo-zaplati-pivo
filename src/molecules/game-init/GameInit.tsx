import React from 'react';
import {appActions} from "../../app/actions";
import {connect} from "react-redux";
import {RootState} from "../../app/types";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";


interface StoreProps {
    playerCount?: number;
}

interface DispatchProps {
    startGame: typeof appActions.startGame;
    setPlayerCount: typeof appActions.setPlayerCount;
}

type Props = StoreProps & DispatchProps;

function GameInit({startGame, playerCount = undefined, setPlayerCount}: Props) {
    const onClick = () => {
        startGame();
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueUnchecked = parseInt(event.target.value, 10);
        setPlayerCount({
            playerCount: valueUnchecked
        })
    }

    const isButtonEnabled = typeof playerCount === 'number' && playerCount > 0

    return (
        <div>
            <h2>
                Budete se snažit neuhodnout číslo :D
            </h2>
            <p>
                V této hře každý napíšete své jméno a číslo mezi 1 až 100.
                Kdo bude nejblíž k náhodně vybranému číslu, tak platí oběd.
                Tím pádem to vlastně vyhrál i prohrál naráz. Good luck :D
            </p>
            <h3>Kolik vas dneska jedlo?</h3>
            <div>
                <Input onChange={onInputChange} title="Takže kolik?" type="number" defaultValue={playerCount || ""}/>
            </div>
            <div>
                <Button
                    onClick={onClick}
                    isButtonDisabled={!isButtonEnabled}
                    title="Jdem na to!"
                />
            </div>
        </div>
    )
}

export default connect<StoreProps, DispatchProps, {}, RootState>(
    (state) => ({
        playerCount: state.app.playerCount,
    }), {
        startGame: appActions.startGame,
        setPlayerCount: appActions.setPlayerCount
    }
)(GameInit);