import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {PlayerProps} from "./Leaderboard.tsx";
interface AddNewPlayerProps {
    players: PlayerProps[];
    setPlayers: React.Dispatch<React.SetStateAction<PlayerProps[]>>;
}
//Component that allows adding new players to the leaderboard
const AddNewPlayer:React.FC<AddNewPlayerProps> = ({players, setPlayers}) => {
    //React Hook Form
    const {register
        , handleSubmit
        , reset
        , formState: { errors },
    } = useForm<PlayerProps>();
    //Function that handles the form submission
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
        //Fetch POST request to add new player
        fetch('http://localhost:3001/players', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data){
                    reset();
                    setPlayers(data)
                }
            });
    };
    return (
        //Form to add new player
        <form onSubmit={handleSubmit(onSubmit)}
              className='w-1/2 mx-auto border-2 rounded-xl flex flex-col justify-start items-center p-5'>
            <label className='w-full align-left text-lg my-5'
                   htmlFor="name">Name</label>
            <input
                id='name'
                className='w-full border-2 rounded-lg p-2 text-lg focus:outline-none focus:border-black'
                {...register('name', {required: true, maxLength: 20, minLength: 3})}
            />
            <label
                className='w-full align-left text-lg my-5'
                htmlFor="">Score</label>
            <input
                className='w-full border-2 rounded-lg p-2 text-lg focus:outline-none focus:border-black'
                type='number' {...register('score', {required: true, max: 100, min: 1})} />

            {/*Error messages*/}
            {errors.name?.type === 'maxLength' && (
                <p className="text-red-500">Name cannot exceed 20 characters</p>
            )}
            {errors.name?.type === 'required' && (
                <p className="text-red-500">Name is required</p>
            )}
            {errors.name?.type === 'minLength' && (
                <p className="text-red-500">Name must be at least 3 characters</p>
            )}
            {errors.score?.type === 'min' && (
                <p className="text-red-500">Score must be at least 1</p>
            )}
            {errors.score?.type === 'max' && (
                <p className="text-red-500">Score cannot exceed 100</p>
            )}
            {errors.score?.type === 'required' && (
                <p className="text-red-500">Score is required</p>
            )}
            <button className='bg-blue-500 rounded-lg px-4 py-2 text-white mt-5' type="submit">Add</button>
        </form>
    );
}

export default AddNewPlayer;
