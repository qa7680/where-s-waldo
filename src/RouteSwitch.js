import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./Components/game/game.js";
import Home from "./Components/home/home";
import Leaderboard from "..//src/Components/leaderboard/leaderboard";
import Nav from "./Components/navbar/nav";

const RouteSwtich = () => {
    return(
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path = "/" element = { <Home />} />
                <Route path = "/game" element = { <Game />} />
                <Route path = "/leaderboard" element = { <Leaderboard />} />
            </Routes>
        </BrowserRouter>
    )
};

export default RouteSwtich;