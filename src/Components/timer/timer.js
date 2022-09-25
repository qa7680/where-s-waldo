import "..//timer/timer.scss"

const Timer = ({ gameWon, timer }) => {
    return(
        <div className="timerBox">
            <img src= { require('../../photos/timer.png') } alt = "timer"/>
            <h1>{!gameWon ? new Date(timer*1000).toISOString().substr(11,8) : new Date(0).toISOString().substr(11,8)}</h1>
        </div>
    )
};

export default Timer;