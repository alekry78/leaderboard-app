import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

interface PlayerProps {
    id: number;
    name: string;
    score: number;
    date: string;
}

const Leaderboard: React.FC = () => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);
    const [sort, setSort] = useState<string>('');
    const {register, handleSubmit} = useForm<PlayerProps>();
    const onSubmit: SubmitHandler<PlayerProps> = (data: PlayerProps) => {
        const newPlayer = {
            id: players.length + 1,
            name: data.name,
            score: data.score,
            date: new Date().toISOString()
        }
        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPlayer)
        }
        fetch('http://localhost:3001/players', requestOptions)
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            });
    };
    useEffect(() => {
        fetch('http://localhost:3001/players')
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            });
    }, []);
    const handleHowToSort = () => {
        switch (sort) {
            case '':
                setSort('descending');
                break;
            case 'descending':
                setSort('ascending');
                break;
            case 'ascending':
                setSort('descending');
        }
    }
    const handleSort = (a: PlayerProps, b: PlayerProps) => {
        if (sort === 'descending') {
            return b.score - a.score;
        } else if (sort === 'ascending') {
            return a.score - b.score;
        }
        return 0;
    }
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
                    {players.sort(handleSort).map((player, index) => (
                        <div className='w-full flex justify-between items-center p-4 border-b-2 last:border-0'
                             key={`${index}${player.id}`}>
                            <span className='w-1/3'>{player.id}</span>
                            <span className='w-1/3'>{player.name}</span>
                            <span className='w-1/3'>{player.score}</span>
                        </div>
                    ))}
                </div>
            </section>
            <button onClick={handleHowToSort} className='bg-blue-500 rounded-lg px-4 py-2 text-white'>
                Sort by score {sort === 'descending' ? 'v' : sort === 'ascending' ? '^' : ''}
            </button>
            <section className="container">
                <h1 className='text-black text-3xl font-sans font-bold my-5'>Add new player</h1>
                <form onSubmit={handleSubmit(onSubmit)}
                      className='w-1/2 mx-auto border-2 rounded-xl flex flex-col justify-start items-center p-5'>
                    <label className='w-full align-left text-lg my-5'
                           htmlFor="name">Name</label>
                    <input
                        id='name'
                        className='w-full border-2 rounded-lg p-2 text-lg focus:outline-none focus:border-black'
                        {...register('name', { required:true, maxLength:20, minLength:3})}
                    />
                    <label
                        className='w-full align-left text-lg my-5'
                        htmlFor="">Score</label>
                    <input
                        className='w-full border-2 rounded-lg p-2 text-lg focus:outline-none focus:border-black'
                        type='number' {...register('score', { required:true, max:100, min:1})} />
                    <button className='bg-blue-500 rounded-lg px-4 py-2 text-white mt-5' type="submit">Add</button>
                </form>
            </section>
        </main>
    );
}

export default Leaderboard;
