import React from 'react';
import {connect} from "react-redux";
import {Player, RootState} from "../../app/types";
import Button from "../../atoms/button/Button";
import {appActions} from "../../app/actions";
import Input from "../../atoms/input/Input";

interface StoreProps {
    playerCount: number;
    currentPlayerNumber: number;
    currentPlayerData: Player;
}

interface DispatchProps {
    goToNextPlayer: typeof appActions.goToNextPlayer;
    changePlayerName: typeof appActions.changePlayerName;
    changePlayerValue: typeof appActions.changePlayerValue
    finish: typeof appActions.finish;
}

type Props = StoreProps & DispatchProps;

function GamePlaying(props: Props) {
    const {
        currentPlayerNumber, currentPlayerData, playerCount, goToNextPlayer,
        finish, changePlayerValue, changePlayerName
    } = props
    const isLastPlayer = currentPlayerNumber === playerCount;
    const {value, name} = currentPlayerData;
    const onClick = () => {
        if (isLastPlayer) {
            finish()
        } else {
            goToNextPlayer()
        }
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value || "";
        if (value.length < 51) {
            changePlayerName({
                playerNumber: currentPlayerNumber,
                name: value
            })
        }
    }

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueUnchecked = parseInt(event.target.value, 10);

        changePlayerValue({
            playerNumber: currentPlayerNumber,
            value: valueUnchecked,
        })
    }

    const isButtonEnabled = typeof value === 'number' && value >= 0 && value <= 100 && name?.length;

    return (
        <div>
            <h3>Hráč číslo: {currentPlayerNumber}</h3>
            <div>
                <div>
                    <Input
                        type="text"
                        onChange={onNameChange}
                        title={"Jméno:"}
                        defaultValue={name}
                    />
                </div>
                <div>
                    <Input
                        type="number"
                        onChange={onValueChange}
                        title={"Tvůj tip mezi 0 a 100"}
                        defaultValue={value}
                    />
                </div>
            </div>
            <div>
                <Button onClick={onClick} isButtonDisabled={!isButtonEnabled} title="Pokračuj"/>
            </div>
        </div>
    )
}

export default connect<StoreProps, DispatchProps, {}, RootState>(
    (state: RootState) => ({
        currentPlayerNumber: state.app.currentPlayer || 0,
        playerCount: state.app.playerCount || 0,
        currentPlayerData: state.app.playerData?.[state.app.currentPlayer || 0],
    }),
    {
        goToNextPlayer: appActions.goToNextPlayer,
        finish: appActions.finish,
        changePlayerName: appActions.changePlayerName,
        changePlayerValue: appActions.changePlayerValue,
    }
)(GamePlaying);