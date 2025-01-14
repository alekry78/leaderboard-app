import React, {useEffect, useState} from 'react';
import Player from "./Player.tsx";
import AddNewPlayer from "./AddNewPlayer.tsx";
import TopPlayers from "./TopPlayers.tsx";

// Define the PlayerProps interface
export interface PlayerProps {
    id: number;
    name: string;
    score: number;
    date: string;
}

const Leaderboard: React.FC = () => {
    //State to hold the players
    const [players, setPlayers] = useState<PlayerProps[]>([]);
    //State to hold the sort order
    const [sort, setSort] = useState<string>('');
    //State to hold the name of the player to search
    const [name, setName] = useState<string>('');
    //State to hold the players sorted by name
    const [sortedByName, setSortedByName] = useState<PlayerProps[]>([]);
    useEffect(() => {
        //Fetch the players from the server
        fetch('http://localhost:3001/players')
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            });
    }, []);
    //Function to handle the sort order
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
    //Function to sort the players by score
    const handleSort = (a: PlayerProps, b: PlayerProps) => {
        if (sort === 'descending') {
            return b.score - a.score;
        } else if (sort === 'ascending') {
            return a.score - b.score;
        }
        return 0;
    }
    //Function to sort the players by date
    const handleSortByDate = (a: PlayerProps, b: PlayerProps) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    //Function to handle the search by name
    const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    //Function to filter the players by name
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
                        {/*If the name is empty, sort by score, otherwise sort by name*/}
                        {
                            name === '' ?
                                players.sort(handleSort).map((player, index) => (
                                    <Player player={player} index={index} setPlayers={setPlayers} key={`${player.name}${player.id}${player.score}${index}`}/>
                                ))
                                :
                                sortedByName.sort(handleSort).map((player, index) => (
                                    <Player player={player} index={index} setPlayers={setPlayers} key={`${player.name}${player.id}${player.score}${index}`}/>
                                ))
                        }
                    </div>
                </section>
                <button onClick={handleHowToSort} className='bg-blue-500 rounded-lg px-4 py-2 text-white'>
                    Sort by score {sort === 'descending' ? 'v' : sort === 'ascending' ? '^' : ''}
                </button>
                <section className="container">
                    <h1 className='text-black text-3xl font-sans font-bold my-5'>Add new player</h1>
                    {/* Add new player form */}
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
                        {/*Sort the players by date to showcase the recent scores*/}
                        {players.sort(handleSortByDate).map((player, index) => (
                            <Player recent player={player} index={index} setPlayers={setPlayers} key={`${player.name}${player.id}${player.score}${index}`}/>
                        ))}
                    </div>
                </section>

            </main>
            {/* Widget to show the top 3 player */}
            <TopPlayers players={players}/>
        </>
    );
}

export default Leaderboard;
