import React, {useEffect, useState} from 'react';
import {PlayerProps} from "./Leaderboard.tsx";
interface PlayerComponentProps {
    player:PlayerProps,
    index: number,
    setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}

const PlayerWithDate:React.FC<PlayerComponentProps> = ({player, index, setPlayers}) => {
    const [changeScore, setChangeScore] = useState<boolean>(false);
    const [playerScore, setPlayerScore] = useState<number>(player.score);
    useEffect(() => {
        setPlayerScore(player.score);
    }, [player.score]);

    // Obsługa zmiany wartości w <input>
    const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerScore(parseInt(e.target.value));
    };
    // Funkcja wysyłająca PATCH z nową wartością
    const updateScore = async () => {
        try {
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
    // Obsługa rozmycia inputa (onBlur) lub Enter (onKeyDown)
    const handleBlurOrEnter = async () => {
        // Zapisz do backendu
        await updateScore();
        // Zamykamy tryb edycji
        setChangeScore(false);
    };
    // Jeżeli wciśnięto Enter, wywołaj patch
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Wywołujemy tę samą funkcję co przy blur
            handleBlurOrEnter();
        }
    };

    return (
        <div className='w-full flex justify-between items-center p-4 border-b-2 last:border-0'
             key={`${index}${player.id}`}>
            <span className='w-1/3'>{player.name}</span>
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
        </div>
    );
}

export default PlayerWithDate;
