import React from 'react';
import {connect} from "react-redux";
import {Player, PlayersData, RootState} from "../../app/types";
import {values} from 'ramda';
import Button from "../../atoms/button/Button";
import {appActions} from "../../app/actions";

interface StoreProps {
    playersData: PlayersData,
    winningNumber: number;
}

interface DispatchProps {
    initGame: typeof appActions.initGame;
}

type Props = StoreProps & DispatchProps;

interface PlayerWithDiff extends Player {
    diff: number;
}

const getPlayersSortedByResult = (winningNumber: number, players: PlayersData): PlayerWithDiff[] => (
    values(players)
        .map<PlayerWithDiff>(player => ({
            ...player,
            diff: Math.abs(player.value! - winningNumber)
        }))
        .sort((a: PlayerWithDiff, b: PlayerWithDiff) => (a.diff - b.diff))
)

function GameFinished({winningNumber, playersData, initGame}: Props) {
    const sortedPlayers = React.useMemo(
        () => getPlayersSortedByResult(winningNumber, playersData),
        [winningNumber, playersData]
    )

    const minDiff = sortedPlayers[0].diff
    const winners: PlayerWithDiff[] = [];
    sortedPlayers.forEach(player => {
        if (player.diff === minDiff) {
            winners.push(player)
        }
    })

    const onClick = () => {
        initGame();
    }

    const everyoneWins = winners.length === sortedPlayers.length;

    return (
        <div>
            <h3>Hotovo, tak kdo byl nejblíž vítěznému číslu {winningNumber}?</h3>
            {winners.length === 1 && (
                <div>
                    Nejblíže byl <b>{winners[0].name}</b> (tipoval {winners[0].value}), který má nyní tu čest zaplatit
                    oběd.
                </div>
            )}
            {everyoneWins && (
                <div>Každej to trefil, impossible! . Nicméně, každej platí sám za sebe</div>
            )}
            {!everyoneWins && winners.length > 1 && (
                <div>
                    Máme těch vítězů víc, určitě se rádi podělíte o účet:
                    <hr/>
                    <div>
                        {winners.map((winner, index) => (
                            <div key={index + winner.name!}>
                                <b>{winner.name}</b> hádal {winner.value}
                            </div>
                        ))}
                        <hr />
                        <div>
                            Minuli vítězné číslo {winningNumber} pouze o {winners[0].diff}.
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Button
                    title="Novej oběd"
                    onClick={onClick}
                />
            </div>
        </div>
    )
}

export default connect<StoreProps, DispatchProps, {}, RootState>(
    (state: RootState) => ({
        winningNumber: state.app.winningNumber || 0,
        playersData: state.app.playerData,
    }),
    {
        initGame: appActions.initGame,
    }
)(GameFinished);