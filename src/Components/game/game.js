import "../../Components/game/game.scss"
import React, { useEffect, useRef, useState } from "react";
import Popup from "..//charPopup/charPopup";
import CharFound from "../charFound/charFound";
import Timer from "../timer/timer";
import UserPopup from "../userPopup/userPopup";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firestore.config";

const Game = () => {

  const [ imageWidth, setImageWitdh ] = useState(1317);
  const [ imageHeight, setImageHeight ] = useState(826);
  const [ userClickLocation, setUserClickLocation ] = useState({});
  const [ charPopupLocation, setCharPopupLocation ] = useState({});
  const [ charactersLocation, setCharactersLocations ] = useState({});
  const [ imgClicked, setImgClicked] = useState(false);
  const [ charClicked, setCharClicked] = useState(false);
  const [ charChosen, setCharChosen ] = useState('');
  const [ timer, setTimer] = useState(0);
  const [ winningTime, setWinningTime ] = useState(0);
  const [ foundCharacters, setFoundCharacters ] = useState({
    Waldo: false, Detective: false, Cowboy: false
  });
  const [ gameWon, setGameWon] = useState(false);
  const imageRef = useRef(null);

  //Range of locations based on full image(1920 x 1080)
  const detectiveLocation = { x1: 241, x2: 319, y1: 45.1875, y2: 208.1875 }
  const waldoLocation = { x1: 602, x2: 689, y1: 384.1875, y2: 544.1875 }
  const cowboyLocation = { x1: 1243, x2: 1294, y1: 144.1875, y2: 316.1875 }

  //find ratios of image
  const imageWidthRatio = 1317;
  const imageHeightRatio = 826;

  const detectiveRatios = {
    x1: imageWidthRatio/detectiveLocation.x1,
    x2: imageWidthRatio/detectiveLocation.x2,
    y1: imageHeightRatio/detectiveLocation.y1,
    y2: imageHeightRatio/detectiveLocation.y2
  }
  const waldoRatios = {
    x1: imageWidthRatio/waldoLocation.x1,
    x2: imageWidthRatio/waldoLocation.x2,
    y1: imageHeightRatio/waldoLocation.y1,
    y2: imageHeightRatio/waldoLocation.y2
  }
  const cowboyRatios = {
    x1: imageWidthRatio/cowboyLocation.x1,
    x2: imageWidthRatio/cowboyLocation.x2,
    y1: imageHeightRatio/cowboyLocation.y1,
    y2: imageHeightRatio/cowboyLocation.y2
  };
  

  useEffect(() => {
    setImageWitdh(imageRef.current.getBoundingClientRect().width);
    setImageHeight(imageRef.current.getBoundingClientRect().height);
  }, [imgClicked]);

  //update locations when img size changes
  useEffect(() => {
    testBackend();
    const addLocationsBackend = async() => {
      await setDoc(doc(db, "characters location", `${imageWidth} x ${imageHeight}`), {
        Detective: {
          x1: imageWidth/detectiveRatios.x1, x2: imageWidth/detectiveRatios.x2 ,
          y1: imageHeight/detectiveRatios.y1, y2: imageHeight/detectiveRatios.y2
        },
        Waldo: {
          x1: imageWidth/waldoRatios.x1, x2: imageWidth/waldoRatios.x2 ,
          y1: imageHeight/waldoRatios.y1, y2: imageHeight/waldoRatios.y2
        },
        Cowboy: {
          x1: imageWidth/cowboyRatios.x1, x2: imageWidth/cowboyRatios.x2 ,
          y1: imageHeight/cowboyRatios.y1, y2: imageHeight/cowboyRatios.y2
        },
      })
    }
    addLocationsBackend();
  }, [ imageWidth, imageHeight ]);
    
  const onImgClicked = (e) => {
    //we need to consider the top-margin of our picture which is why we substract pageTopMargin to position of y clicked
    setUserClickLocation({xCord: e.pageX  - imageRef.current.getBoundingClientRect().x + window.scrollX,
      yCord: e.pageY - (imageRef.current.getBoundingClientRect().y + window.scrollY)});
    setCharPopupLocation({ xCord: e.pageX, yCord: e.pageY });
    setImgClicked(true);
    setCharClicked(false);
    setCharChosen('');
  };

  const onTextClicked = (e) => {
    setCharChosen(e.target.textContent);
    setCharClicked(true);
    setImgClicked(false);
  };

    //test call to backend
    const testBackend = async () => {
      const docRef = doc(db, "characters location", `${imageWidth} x ${imageHeight}`);
      const docSnap = await getDoc(docRef);
      setCharactersLocations(docSnap.data());
  };  

  if(charClicked === true){
    foundCharacter();
  };
   //function for checking if character is found
   function foundCharacter() {
    if(userClickLocation.xCord >= charactersLocation[charChosen].x1 && userClickLocation.xCord <= charactersLocation[charChosen].x2
      && userClickLocation.yCord >= charactersLocation[charChosen].y1 && userClickLocation.yCord <= charactersLocation[charChosen].y2){
        setFoundCharacters({...foundCharacters, [charChosen]: true });
        setCharClicked(false);
      }
  };

  if(foundCharacters.Cowboy && foundCharacters.Waldo && foundCharacters.Detective){
    setWinningTime(timer);
    setGameWon(true);
    setFoundCharacters({
      Waldo: false,
      Detective: false,
      Cowboy: false
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
        setTimer(timer + 1)
    }, 1000) 

    return () => {
        clearInterval(interval);
    };
}, [timer])
  
const handleClose = () => {
  setGameWon(!gameWon);
  setTimer(0);
};

  return(
    <div className="gameContainer">
      {gameWon && <UserPopup winningTime={winningTime} handleClose = {handleClose}/>}
      <div className="topGame">
        <Timer gameWon={gameWon} timer={timer}/>
        <CharFound waldoFound={foundCharacters.Waldo} detectiveFound = {foundCharacters.Detective}
        cowboyFound = {foundCharacters.Cowboy}/>
      </div>
      <div className="imageContainer">
        <img className="gameImage" src =  {require('../../photos/waldo_1.png')} alt = "waldo"
        onClick={onImgClicked} style = { {backgroundSize: "contain"} }
        ref = { imageRef } />
      </div>
      { !charClicked && imgClicked && <Popup userClickedX={charPopupLocation.xCord}
      userClickedY = {charPopupLocation.yCord} 
      onTextClicked = { onTextClicked }/> }
    </div>
  )
};

export default Game;