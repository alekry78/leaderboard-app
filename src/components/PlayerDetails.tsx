import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
// Define the PlayerDetailsProps interface
interface PlayerDetailsProps{
    id: number,
    name: string,
    score: number,
    date: string,
    totalGames: number,
    totalWins: number,
    totalLosses: number,
    winRate: number,
    totalScore: number,
    averageScore: number,
    highestScore: number,
    lowestScore: number,
    lastGame: {
        score: number,
        date: string
    }
}
const PlayerDetails:React.FC = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState<PlayerDetailsProps | null>(null);
    useEffect(() => {
        fetch(`http://localhost:3001/players/details/${id}`)
            .then(response => response.json())
            .then(data => setPlayer(data))
    }, [id]);
    return (
        <main className='w-full'>
            <section className="container mx-auto py-5">
                <NavLink className='rounded-lg px-4 py-2 bg-blue-500 text-lg text-white' to={"/leaderboard"}>Go Back</NavLink>
                <h1 className='text-3xl font-bold my-5'>Player Details</h1>
                <div className='flex flex-col justify-center items-center border-black border-2 py-5 rounded-lg'>
                    {player && (
                        <>
                            <h2 className='text-2xl font-bold'>{player.name}</h2>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Score:</span>
                                <span className='text-lg'>{player.score}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Date:</span>
                                <span className='text-lg'>{new Date(player.date).toLocaleDateString()}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Total Games:</span>
                                <span className='text-lg'>{player.totalGames}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Total Wins:</span>
                                <span className='text-lg'>{player.totalWins}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Total Losses:</span>
                                <span className='text-lg'>{player.totalLosses}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Win Rate:</span>
                                <span className='text-lg'>{player.winRate}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Total Score:</span>
                                <span className='text-lg'>{player.totalScore}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Average Score:</span>
                                <span className='text-lg'>{player.averageScore}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Highest Score:</span>
                                <span className='text-lg'>{player.highestScore}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10 border-b-2'>
                                <span className='text-lg'>Lowest Score:</span>
                                <span className='text-lg'>{player.lowestScore}</span>
                            </div>
                            <div className='flex flex-row justify-between item-cent w-full p-10'>
                                <span className='text-lg'>Last Game:</span>
                                <span
                                    className='text-lg'>{new Date(player.lastGame.date).toLocaleDateString()} - {player.lastGame.score}</span>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

export default PlayerDetails;
