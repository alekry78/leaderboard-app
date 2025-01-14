import React, {useEffect, useState} from 'react';

interface PlayerProps{
    id: number;
    name: string;
    score: number;
}

const Leaderboard:React.FC = () => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);

    useEffect(() => {
        fetch('/mockPlayers.json')
            .then(response => response.json())
            .then(data =>{
                setPlayers(data)
            });
    }, []);
    return (
        <main className='w-full flex flex-col justify-start items-center'>
            <section className='container mx-auto py-6'>
                <h1 className='text-black text-3xl font-sans font-bold my-5'>Leaderboard</h1>
                <div className='border-2 rounded-lg flex-col justify-start w-full'>
                    <header className='w-full flex justify-between items-center p-4 border-b-2 '>
                        <h3 className='w-1/3'>ID</h3>
                        <h3 className='w-1/3'>Player</h3>
                        <h3 className='w-1/3'>Score</h3>
                    </header>
                    {players.sort((a, b) => b.score - a.score).map((player, index) => (
                        <div className='w-full flex justify-between items-center p-4 border-b-2 last:border-0' key={`${index}${player.id}`}>
                            <span className='w-1/3'>{player.id}</span>
                            <span className='w-1/3'>{player.name}</span>
                            <span className='w-1/3'>{player.score}</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container">

            </section>
        </main>
    );
}

export default Leaderboard;
