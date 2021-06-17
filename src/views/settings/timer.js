import { useContext } from "react";
import { Box, CheckBox, TextInput } from "grommet";

import { store } from "../../store/store";
import {
  TOGGLE_WEB_NOTIFICATION,
  SET_COUNTDOWN,
  SET_TIMER,
  SET_TOTAL_SESSION,
  TOGGLE_TIME_END_NOTIFICION,
  TOGGLE_TIMER_ON_BROWSER,
  TOGGLE_WORK_IN_SESSION,
  TOGGLE_AUTO_START,
  TOGGLE_BREAK_END_NOTIFICATION,
} from "../../store/types";

import MaskedInput from "../../components/Inputs/maskedInput";
import {
  ParagraphTitle,
  BorderLine,
  CustomBox,
} from "../../components/Elements";

import { browserSupportsNotification } from "../../js/notification";

const TimerSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    timer,
    timeEndNotification,
    showTimerOnBrowser,
    webNotification,
    workInSession,
    autoStart,
    totalSessions,
    breakEndNotification,
  } = globalState.state.settings;

  const askForNotification = () => {
    if (browserSupportsNotification()) {
      let customNotification = false;
      if (Notification.permission === "granted") {
        customNotification = true && !webNotification;
      } else if (!webNotification) {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            customNotification = true;
            dispatch({
              type: TOGGLE_WEB_NOTIFICATION,
              value: customNotification && !webNotification,
            });
          }
        });
      }

      dispatch({
        type: TOGGLE_WEB_NOTIFICATION,
        value: customNotification,
      });
    }
  };

  const setWorkInSession = () => {
    dispatch({
      type: TOGGLE_WORK_IN_SESSION,
      value: !workInSession,
    });
  };

  const setAutoStart = () => {
    dispatch({
      type: TOGGLE_AUTO_START,
      value: !autoStart,
    });
  };

  const setBreakEndNotification = () => {
    dispatch({
      type: TOGGLE_BREAK_END_NOTIFICATION,
      value: !breakEndNotification,
    });
  };

  const setTimerValue = (timerValue) => {
    if (timerValue.length === 7) {
      const splitValue = timerValue.split(" : ");
      dispatch({
        type: SET_COUNTDOWN,
        value: parseInt(splitValue[0]) * 60 + parseInt(splitValue[1]),
      });
    }
    dispatch({
      type: SET_TIMER,
      value: timerValue,
    });
  };

  const setSessionValue = (sessionValue) => {
    dispatch({
      type: SET_TOTAL_SESSION,
      value: sessionValue.replace(/[^0-9]/g, ""),
    });
  };

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Time" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={timer}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Time End Notification" />
        <CheckBox
          name="time end notification toggle"
          toggle
          checked={timeEndNotification}
          onChange={() =>
            dispatch({
              type: TOGGLE_TIME_END_NOTIFICION,
              value: !timeEndNotification,
            })
          }
        />
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Show Timer on Browser Tab" />
        <CheckBox
          name="show timer on browser toggle"
          toggle
          checked={showTimerOnBrowser}
          onChange={() =>
            dispatch({
              type: TOGGLE_TIMER_ON_BROWSER,
              value: !showTimerOnBrowser,
            })
          }
        />
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Web Notification" />
        <CheckBox
          name="web notification toggle"
          toggle
          checked={webNotification}
          onChange={() => askForNotification()}
        />
      </CustomBox>

      <BorderLine />

      <CustomBox>
        <ParagraphTitle text="Work in Sessions" />
        <CheckBox
          name="Work in Sessions"
          toggle
          checked={workInSession}
          onChange={() => setWorkInSession()}
        />
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Short Break" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={timer}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox>

      <CustomBox>
        <ParagraphTitle text="Long Break" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={timer}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox>

      <CustomBox>
        <ParagraphTitle text="Sessions" />
        <Box>
          <TextInput
            a11yTitle="Sessions"
            placeholder="Sessions"
            textAlign="center"
            size="small"
            value={totalSessions}
            onChange={(event) => setSessionValue(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Auto Start" />
        <CheckBox
          name="Auto Start"
          toggle
          checked={autoStart}
          onChange={() => setAutoStart()}
        />
      </CustomBox>

      <CustomBox>
        <ParagraphTitle text="Break End Notification" />
        <CheckBox
          name="Break End Notification"
          toggle
          checked={breakEndNotification}
          onChange={() => setBreakEndNotification()}
        />
      </CustomBox>

      <BorderLine />
    </div>
  );

  return content;
};

export default TimerSettings;
