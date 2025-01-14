import React from 'react';
import {PlayerProps} from "./Leaderboard.tsx";
interface TopPlayersProps {
    players:PlayerProps[];
}
const TopPlayers:React.FC<TopPlayersProps> = ({players}) => {
    //Return the top 3 players, display them in a widget that sticks to the right side of the screen and is animated on hover to reveal the list
    //Before hover only Top Scores is visible
    return (
        <div className="group flex flex-row fixed top-1/4 right-0 translate-x-80 border border-gray-300 hover:translate-x-0  transform
        transition-transform
        duration-300 ">
            <div className="relative w-6 bg-black">
                <span
                    className="
                    absolute
                    top-3/4
                    left-1/2
                    -translate-y-1/2
                    -rotate-90
                    origin-left
                    whitespace-nowrap
                    text-white

                  "
                >
                  Top scores
                </span>
            </div>

            {/* The main content for players' scores */}
            <div className="flex flex-col w-80 bg-white">
                {players
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((player, index) => (
                        <div
                            key={index}
                            className="w-full flex justify-between items-center p-4 border-b last:border-0"
                        >
                            <span className="w-1/3">{index + 1}</span>
                            <span className="w-1/3">{player.name}</span>
                            <span className="w-1/3">{player.score}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default TopPlayers;
