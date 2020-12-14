import { useState, useEffect } from "react";
import "./components.css";

const Timer = (props) => {
  const [cycle, setCycle] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(45);
  const [started, setStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(2700);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        if (counter === 0) {
          setCycle((cycle) => cycle + 1);
          setCounter(3);
          setIsActive(false);
          setMinute(2700);
          setSecond(0);
          return;
        }

        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        setSecond(secondCounter);
        setMinute(minuteCounter);
        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const { onMuteClickToggle } = props;

  return (
    <div className="timer-header" id="#timer-header">
      <div>Noisli</div>
      <div className="timer-header-center-container">
        <div className="timer-header-center-container-left">
          <div className="timer-header-center-container-total-cycle">
            {cycle}/4
          </div>
        </div>
        <div className="timer-header-center-container-center">
          <div className="timer-header-center-container-countdown">
            {minute} : {second}
          </div>
        </div>
        <div
          className="timer-header-center-container-right-reset"
          onClick={() => {
            setIsActive((prevState) => !prevState);
            if (started) {
              onMuteClickToggle();
            } else {
              setStarted(true);
            }
          }}
        >
          {isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M3 1a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1zm6 0a1 1 0 1 1 2 0v12a1 1 0 0 1-2 0V1z"
                ></path>
                <path d="M0 0h14v14H0z"></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M5 2.869v8.262L11.197 7 5 2.869zm8.555 4.963l-9 6A1 1 0 0 1 3 13V1A1 1 0 0 1 4.555.168l9 6a1 1 0 0 1 0 1.664z"
                ></path>
                <path d="M0 0h14v14H0z"></path>
              </g>
            </svg>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Timer;
