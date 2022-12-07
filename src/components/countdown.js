import { useEffect, memo } from "react";
import { useTimer } from "react-timer-hook";
import { Grid, Box } from "grommet";

import TitleComponent from "./TitleComponent";
import { playIcon, pauseIcon } from "../components/svg";
import { InputTaskWhatAreYouWorkingOn } from "../components/TaskInput";

import { truncateString } from "../js/utils";
import "../css/timer.css";

const Countdown = ({
  expiryTimestamp,
  current_session,
  timer_sessions,
  currentTask,
  onExpire, // function to call when time expires
}) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: onExpire,
  });

  useEffect(() => {
    restart(expiryTimestamp, false);
  }, [expiryTimestamp]);

  const onChangeActive = () => {
    isRunning ? pause() : resume();
  };

  const timerHours = hours > 0 ? `0${hours}` : "00";
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const ShowTime = `${timerHours} : ${timerMinutes} : ${timerSeconds}`;

  return (
    <>
      <TitleComponent title={`${ShowTime} remaining`} />
      <Grid
        rows={["xxsmall"]}
        columns={[120, 120, 120]}
        gap="xsmall"
        className="pr-10"
        areas={[
          { name: "block1", start: [0, 0], end: [0, 0] },
          { name: "block2", start: [1, 0], end: [1, 0] },
          { name: "block3", start: [2, 0], end: [2, 0] },
          { name: "block4", start: [3, 0], end: [3, 0] },
        ]}
      >
        <Box gridArea="block1" className="timer-container-total-cycle">
          {current_session}/{timer_sessions}
        </Box>
        <Box gridArea="block2" className="timer-container-countdown bubble">
          {ShowTime}
        </Box>
        {currentTask && isRunning ? (
          <Box gridArea="block3" className="timer-container-task bubble">
            {truncateString(currentTask, 20)}
          </Box>
        ) : (
          <InputTaskWhatAreYouWorkingOn />
        )}
        <Box gridArea="block4">
          <div className="timer-container-right-reset" onClick={onChangeActive}>
            {isRunning ? pauseIcon : playIcon}
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default memo(Countdown);
