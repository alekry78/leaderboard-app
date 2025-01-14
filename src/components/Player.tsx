import React, {useState} from 'react';
import {PlayerProps} from "./Leaderboard.tsx";
interface PlayerComponentProps {
    player:PlayerProps,
    index: number
}

const Player:React.FC<PlayerComponentProps> = ({player, index}) => {
    const [changeScore, setChangeScore] = useState<boolean>(false);
    const [playerScore, setPlayerScore] = useState<number>(player.score);
    const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerScore(parseInt(e.target.value));
    }
    return (
        <div className='w-full flex justify-between items-center p-4 border-b-2 last:border-0'
             key={`${index}${player.id}`}>
            <span className='w-1/3'>{player.id}</span>
            <span className='w-1/3'>{player.name}</span>
            {
                changeScore ?
                    <input
                            type='number'
                            className='w-1/3'
                           value={playerScore}
                           onChange={handleChangeScore}/> :
                    <span className='w-1/3'
                          onClick={() => setChangeScore(prevState => !prevState)}>{player.score}</span>
            }

        </div>
    );
}

export default Player;
