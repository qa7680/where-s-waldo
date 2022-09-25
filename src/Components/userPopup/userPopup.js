import {  useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../firestore.config";
import uniqid from 'uniqid';
import "..//userPopup/userPopup.scss";

const UserPopup = ({winningTime, handleClose}) => {

    const [ userSubmitted, setUserSubmitted ] = useState(false);
    const [ inputValue, setInputValue ] = useState(`Guest User ${uniqid()}`);
    
    const submitClicked = async() => {
        await addDoc(collection(db, "Leaderboard"), {
          user: inputValue,
          time: winningTime,
          fullTime: new Date(winningTime*1000).toISOString().substr(11,8)
        })
        setUserSubmitted(true);
    };
    
    const inputHandler = (e) => {
      setInputValue(e.target.value);
    };

    return(
    <div className="popup-box">
      <div className="box">
        <div className="topSectionPopup">      
            <h1>Your Time Was {winningTime} Seconds!</h1>
            {!userSubmitted ? 
            <div className="userAndSubmit">
                <label for = "userName">Enter Your Username: </label>
                <input onChange={inputHandler} id = "userName" type = "text"/>
                <button onClick={submitClicked} className="submitBtn">Submit Score!</button>
            </div>
            : 
            <div>
              
              <h1>Submitted as {inputValue}!</h1>    

            </div>
          }
        </div>
        <div className="btnSection">
        <Link  to = "/game"><button className="playAgain" onClick={handleClose}>Play Again</button></Link>
        <Link  to = "/leaderboard"><button className="viewLead" onClick={handleClose}>View Leaderboard</button></Link>
        </div>
      </div>
    </div>
    )
};
export default UserPopup;