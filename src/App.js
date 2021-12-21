import React, { useState, useEffect } from 'react';
import gaara from './images/gaara.jpg'
import yugito from './images/yugito.jpg'
import yagura from './images/yagura.jpg'
import roshi from './images/roshi.jpg'
import han from './images/han.jpg'
import utakata from './images/utakata.jpg'
import fuu from './images/fuu.jpg'
import killerB from './images/killerb.jpg'
import naruto from './images/naruto.jpg'
import uniqid from 'uniqid';

export default function App() {
  
  const [score, setScore] = useState(-1);
  
  function incrementScore() {
    setScore(prevScore => prevScore + 1);
  }
  
  let jinchuriki = [gaara, yugito, yagura, roshi, han, utakata, fuu, killerB, naruto];

  
  const [imgs, setImgs] = useState(jinchuriki);
  
  function renderImages() {
    return imgs.map((img, index) => <img src={img} alt={img} id={img} key={uniqid()} height="100" width="100" onClick={ gotClicked}/>);
  }

  const [clickedImg, setClickedImg] = useState(undefined);
  const [clickedImgs, setClickedImgs] = useState([]);

  function gotClicked(e) {
    setClickedImg(e.target.id);
  }

  function checkImgs() {
    if (clickedImgs == []) {
      if (clickedImg !== undefined) {
        clickedImgs.push(clickedImg);
        setClickedImgs(clickedImgs);
      }
      return;
    }
    
      
    let found = clickedImgs.find(img => img == clickedImg);
    if (found) {
      setScore(-1);
      setClickedImg(undefined);
      setClickedImgs([]);
    } else {
      incrementScore();
      clickedImgs.push(clickedImg);
      setClickedImgs(clickedImgs);
    }
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  useEffect(() => {
    checkImgs();
    shuffleArray(jinchuriki);
    setImgs(jinchuriki);
  }, [clickedImg]);
  
  return (
    <div className="App">
      <p>Score: {score}</p>
      {renderImages()}
    </div>
  );
}