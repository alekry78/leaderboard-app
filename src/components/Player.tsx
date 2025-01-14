import React, {useEffect, useState} from 'react';
import {PlayerProps} from "./Leaderboard.tsx";
import {NavLink} from "react-router-dom";
interface PlayerComponentProps {
    player:PlayerProps,
    index: number,
    setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
    recent?: boolean;
}

const Player:React.FC<PlayerComponentProps> = ({player, index, setPlayers, recent}) => {
    //State to hold the boolean value to change the score
    const [changeScore, setChangeScore] = useState<boolean>(false);
    //State to hold the player score
    const [playerScore, setPlayerScore] = useState<number>(player.score);
    //Update the player score when the player score changes
    useEffect(() => {
        setPlayerScore(player.score);
    }, [player.score]);
    //Function to handle the change in the score
    const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerScore(parseInt(e.target.value));
    };
    //Function to update the score
    const updateScore = async () => {
        try {
            //Send a PATCH request to update the player score
            await fetch(`http://localhost:3001/players/${player.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score: playerScore }),
            }).then(response => response.json())
                .then(data => setPlayers(data))
        } catch (error) {
            console.error('Błąd przy wysyłaniu PATCH:', error);
        }
    };
    //Function to handle the blur or enter key press
    const handleBlurOrEnter = async () => {
        await updateScore();
        setChangeScore(false);
    };
    //Function to handle the key down event
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            //Update the score when the enter key is pressed
            handleBlurOrEnter();
        }
    };

    return (
        <div className='w-full flex justify-between items-center p-4 border-b-2 last:border-0 animate-fadeInDown'
             key={`${index}${player.id}`}>
            {/* Display the player details and change the player display based on recent prop */}
            {
                recent ?
                    (
                        <>
                            {/* Link to Player's details page */}
                            <NavLink to={`/player/${player.id}`} className='w-1/3 hover:underline'>
                                <span className='w-full'>{player.name}</span>
                            </NavLink>
                            {/* Display the score input field when the changeScore is true */}
                            {
                                changeScore ?
                                    <input
                                        type="number"
                                        className="w-1/3"
                                        value={playerScore}
                                        onChange={handleChangeScore}
                                        onBlur={handleBlurOrEnter}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    /> :
                                    <span className='w-1/3'
                                          onClick={() => setChangeScore(prevState => !prevState)}>{player.score}</span>
                            }
                            <span className='w-1/3'>{new Date(player.date).toLocaleDateString()}</span>
                        </>
                    ) :
                    (
                        <>
                            <span className='w-1/3'>{player.id}</span>
                            {/* Link to Player's details page */}
                            <NavLink to={`/player/${player.id}`} className='w-1/3 hover:underline'>
                                <span className='w-full'>{player.name}</span>
                            </NavLink>
                            {/* Display the score input field when the changeScore is true */}
                            {
                                changeScore ?
                                    <input
                                        type="number"
                                        className="w-1/3"
                                        value={playerScore}
                                        onChange={handleChangeScore}
                                        onBlur={handleBlurOrEnter}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    /> :
                                    <span className='w-1/3'
                                          onClick={() => setChangeScore(prevState => !prevState)}>{player.score}</span>
                            }
                        </>
                    )
            }

        </div>
    );
}

export default Player;
