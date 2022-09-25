import "../home/home.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firestore.config";
import { query, orderBy, limit, collection, onSnapshot } from 'firebase/firestore';

const leaderboardRef = collection(db, "Leaderboard");
const topFive = query(leaderboardRef, orderBy("time"), limit(5));

const Home = () => {

    const [ topFiveUsers, setTopFiveUsers ] = useState([]);

    useEffect(() => {
        let counter = 0;
        onSnapshot(topFive, (snapshot) => {
            setTopFiveUsers(snapshot.docs.map((doc) => {
                    counter +=1;
                    return {...doc.data(), rank:counter };
                }))
        })
    }, [topFiveUsers]);

    return(  
        <div className="homeContainer">
            <div className="currentLeaderboard">
                <h1>Current Leaderboard</h1>
               <div className="userScoreContainer">
                   <div className="userScore">
                       { topFiveUsers.map((user) => {
                           return <table>
                                    {user.rank}.{ user.user }: { user.fullTime }
                                </table>
                       }) }
                   </div>
               </div>
                <div className="buttons">
                    <Link to = "/game" className="playLink"><button className="playBtn">PLAY NOW</button></Link>
                    <Link to = "/leaderboard" className="leadLink"><button className="leadBtn">LEADERBOARD</button></Link>
                </div>
            </div>
            <div className="culprits">
                <h1 className="homeText">The Culprits</h1>
                <div className="clupritsContainer">
                    <div className="waldo">
                        <img src={ require('../../photos/waldo.png')} alt="waldo" />
                        <div className="rightSideCulprit">
                            <p>Name: Waldo</p>
                            <p>Hat: Toque</p>
                            <p>Location: Unknown</p>
                        </div>
                    </div>
                    <div className="detective">
                        <img src={ require('../../photos/detective.png') } alt="detective" />
                        <div className="rightSideCulprit">
                            <p>Name: Detective</p>
                            <p>Hat: Peaked Cap</p>
                            <p>Location: Unknown</p>
                        </div>
                    </div>
                    <div className="cowboy">
                        <img src={ require('../../photos/cowboy.png') } alt="cowboys"/>
                        <div className="rightSideCulprit">
                            <p>Name: Cowboy</p>
                            <p>Hat: Cowboy Hat</p>
                            <p>Location: Unknown</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
        
    )
};

export default Home;