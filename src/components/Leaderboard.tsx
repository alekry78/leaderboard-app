import React, {useEffect, useState} from 'react';
import Player from "./Player.tsx";
import AddNewPlayer from "./AddNewPlayer.tsx";
import PlayerWithDate from "./PlayerWithDate.tsx";
import TopPlayers from "./TopPlayers.tsx";

export interface PlayerProps {
    id: number;
    name: string;
    score: number;
    date: string;
}

const Leaderboard: React.FC = () => {
    const [players, setPlayers] = useState<PlayerProps[]>([]);
    const [sort, setSort] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [sortedByName, setSortedByName] = useState<PlayerProps[]>([]);
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
    const handleSortByDate = (a: PlayerProps, b: PlayerProps) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    useEffect(() => {
        if(name !== ''){
            //With includes
            setSortedByName(players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())));
            // With startsWith
            // setSortedByName(players.filter(player => player.name.toLowerCase().startsWith(name.toLowerCase())));
            //With equals
            // setSortedByName(players.filter(player => player.name.toLowerCase() === name.toLowerCase()));
        }
    }, [name]);
    return (
        <>
            <main className='w-full flex flex-col justify-start items-center'>

                <section className='container mx-auto py-6'>
                    <h1 className='text-black text-3xl font-sans font-bold my-5'>Leaderboard</h1>
                    <div className='flex flex-row items-center justify-start my-2'>
                        <label htmlFor="byName" className='text-lg mr-2'>Search player by name</label>
                        <input id='byName'
                               type="text"
                               value={name}
                               onChange={handleSearchByName}
                               className='border-2 border-black rounded-lg focus:outline-none p-2'/>
                    </div>
                    <div className='border-2 rounded-lg flex-col justify-start w-full'>
                        <header className='w-full flex justify-between items-center p-4 border-b-2 '>
                            <h3 className='w-1/3'>ID</h3>
                            <h3 className='w-1/3'>Player</h3>
                            <h3 className='w-1/3'>Score</h3>
                        </header>
                        {
                            name === '' ?
                                players.sort(handleSort).map((player, index) => (
                                    <Player player={player} index={index} setPlayers={setPlayers}/>
                                ))
                                :
                                sortedByName.sort(handleSort).map((player, index) => (
                                    <Player player={player} index={index} setPlayers={setPlayers}/>
                                ))
                        }
                    </div>
                </section>
                <button onClick={handleHowToSort} className='bg-blue-500 rounded-lg px-4 py-2 text-white'>
                    Sort by score {sort === 'descending' ? 'v' : sort === 'ascending' ? '^' : ''}
                </button>
                <section className="container">
                    <h1 className='text-black text-3xl font-sans font-bold my-5'>Add new player</h1>
                    <AddNewPlayer players={players} setPlayers={setPlayers}/>
                </section>
                <section className='container mx-auto py-5'>
                    <h1 className='text-black text-3xl font-sans font-bold my-5'>Recent high scores</h1>
                    <div className='border-2 rounded-lg flex-col justify-start w-full'>
                        <header className='w-full flex justify-between items-center p-4 border-b-2 '>
                            <h3 className='w-1/3'>Player</h3>
                            <h3 className='w-1/3'>Score</h3>
                            <h3 className='w-1/3'>Date</h3>
                        </header>
                        {players.sort(handleSortByDate).map((player, index) => (
                            <PlayerWithDate player={player} index={index} setPlayers={setPlayers}/>
                        ))}
                    </div>
                </section>

            </main>
            <TopPlayers players={players}/>
        </>
    );
}

export default Leaderboard;
