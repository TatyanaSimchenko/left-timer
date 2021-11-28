import React, { useState, useEffect } from "react";
import PauseButton from "../PauseButton/PauseButton";
import PlayButton from "../PlayButton/PlayButton";
import "./timer.css";
function Timer() {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [status, setStatus] = useState("working");

  useEffect(() => {
    let secondTimerId;
    if (status === "working") {
      secondTimerId = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = displayMessage ? 1 : 0;
            let seconds = 59;
            setMinutes(minutes);
            setSeconds(seconds);
            setDisplayMessage(!displayMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(secondTimerId);
    };
  }, [minutes, seconds, status]);

  const stopTimer = () => {
    setStatus("paused");
  };
  const playTimer = () => {
    setStatus("working");
  };
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className="timer">
      <div className="timer__display">
        {timerMinutes}:{timerSeconds}
      </div>

      <div className="timer__btn">
        <PlayButton onClick={playTimer} />
      </div>
      <div className="timer__btn">
        <PauseButton onClick={stopTimer} />
      </div>
      <div className="timer__message">
        {displayMessage && <div>Break time!</div>}
      </div>
    </div>
  );
}

export default Timer;
