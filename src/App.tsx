import {BrowserRouter, Route, Routes} from "react-router-dom";
import Leaderboard from "./components/Leaderboard.tsx";
import PlayerDetails from "./components/PlayerDetails.tsx";
import "./App.css";
function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path={'/leaderboard'} index element={<Leaderboard />}/>
            <Route path="*" element={<Leaderboard />}/>
            <Route path={'/participant/:id'} element={<PlayerDetails /> }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
