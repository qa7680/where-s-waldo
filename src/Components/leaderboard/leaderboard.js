import "..//leaderboard/leaderboard.scss";
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from "../..//firestore.config";
import { useEffect, useState } from "react";

const leaderboardRef = collection(db, "Leaderboard");
const leaderboardOrderByTime = query(leaderboardRef, orderBy("time"));

const Leaderboard = () => {

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        let counter = 0;
            onSnapshot(leaderboardOrderByTime, (snapshot) => {
                setUsers(snapshot.docs.map((doc) => {
                    counter +=1;
                    return {...doc.data(), rank:counter };
                }))
        })
    }, [users]);

    return(
        <div className="leaderboardTable">
            <h1>Leaderboard</h1>
            <table>
                <tbody>
                    <tr className="leaderboardRows">
                        <th>Rank</th>
                        <th>User</th>
                        <th>Time</th>
                    </tr>
                { users.map((user) => {
                    return <tr>
                        <td>{user.rank}</td>
                        <td>{user.user}</td>
                        <td>{user.fullTime}</td>
                    </tr>
                }) }
                </tbody>
            </table>
        </div>
    )
};

export default Leaderboard;