import { Link } from "react-router-dom";
import "../../queries.scss";
import "..//navbar/nav.scss";

const Nav = () => {
    return(
        <div className="navSection">
            
            <p className="waldoTitle">Where's Waldo And His Friends?</p>
            
            <ul className="navbarLinks">
                <li>
                    <Link to = "/" className="navLink">Home</Link>
                </li>
                <li>
                    <Link to = "/game" className="navLink">Game</Link>
                </li>
                <li>
                    <Link to = "/leaderboard" className="navLink">Leaderboard</Link>
                </li>
            </ul>
        </div>
    )
};
export default Nav;