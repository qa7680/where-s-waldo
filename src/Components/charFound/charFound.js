import "../charFound/charFound.scss";

const CharFound = ({ waldoFound, detectiveFound, cowboyFound }) => {
    return(
        <div>
            <div className="homeMain">
                <div className="gameChar">
                    <h3>Waldo</h3>
                    <img src={ require('../../photos/waldo.png')} alt="waldo"/>
                    { !waldoFound ? <p className='notFound'>Not Found</p> : <p className='found'>Found</p> }
                </div>
                <div className="gameChar">
                    <h3>Detective</h3>
                    <img src={ require('../../photos/detective.png') } alt="detective"/>
                    { !detectiveFound ? <p className='notFound'>Not Found</p> : <p className='found'>Found</p> }
                </div>
                <div className="gameChar">
                    <h3>Cowboy</h3>
                    <img src={ require('../../photos/cowboy.png') } alt="cowboys"/>
                    { !cowboyFound ? <p className='notFound'>Not Found</p> : <p className='found'>Found</p> }
                </div>
            </div>
        </div>
    )
};

export default CharFound;