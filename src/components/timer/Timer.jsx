import React, { useState, useEffect } from "react";
import PauseButton from "../PauseButton/PauseButton";
import PlayButton from "../PlayButton/PlayButton";
import "./Timer.css";

function Timer({ start, step }) {
  const [time, setTime] = useState(start);
  const [play, setPlay] = useState(true);
  const timeFormat =
    ("0" + Math.floor((time / 60000) % 60)).slice(-2) +
    ":" +
    ("0" + Math.floor((time / 1000) % 60)).slice(-2);

  useEffect(() => {
    let interval = null;
    let stepInProgress = 1000;
    if (play) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - stepInProgress * step;
          } else {
            setPlay(false);
            return (prevTime = start);
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [play, start, step]);

  return (
    <div className="timer">
      <div className="timer__display">{timeFormat}</div>
      <div className="timer__btn">
        <PlayButton onClick={() => setPlay(true)} />
      </div>
      <div className="timer__btn">
        <button onClick={() => setTime(start)}>Reset</button>
      </div>
      <div className="timer__btn">
        <PauseButton onClick={() => setPlay(false)} />
      </div>
    </div>
  );
}

export default Timer;
