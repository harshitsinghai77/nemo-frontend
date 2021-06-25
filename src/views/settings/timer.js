import { useContext } from "react";
import { Box, CheckBox, TextInput } from "grommet";

import { store } from "../../store/store";
import {
  TOGGLE_WEB_NOTIFICATION,
  SET_TIMER,
  SET_TIMER_DISPLAY,
  SET_TOTAL_SESSION,
  TOGGLE_TIME_END_NOTIFICION,
  TOGGLE_TIMER_ON_BROWSER,
  TOGGLE_WORK_IN_SESSION,
  TOGGLE_AUTO_START,
  TOGGLE_BREAK_END_NOTIFICATION,
} from "../../store/types";
import { updateSettings } from "./utils";

import MaskedInput from "../../components/Inputs/maskedInput";
import {
  ParagraphTitle,
  BorderLine,
  CustomBox,
  CustomSpinner,
} from "../../components/Elements";

import { browserSupportsNotification } from "../../js/notification";
import { stringToSeconds } from "../../js/utils";

const TimerSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    display_time,
    timer_end_notification,
    timer_show_timer_on_browser_tab,
    timer_web_notification,
    workInSession,
    timer_auto_start,
    timer_sessions,
    timer_break_end_notification,
    timer_settings_loaded_from_backend,
  } = globalState.state.settings;

  const askForNotification = () => {
    if (browserSupportsNotification()) {
      let customNotification = false;
      if (Notification.permission === "granted") {
        customNotification = true && !timer_web_notification;
      } else if (!timer_web_notification) {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            customNotification = true;
            const notification_value =
              customNotification && !timer_web_notification;
            dispatch({
              type: TOGGLE_WEB_NOTIFICATION,
              value: notification_value,
            });
            updateSettings({ timer_web_notification: notification_value });
          }
        });
      }

      dispatch({
        type: TOGGLE_WEB_NOTIFICATION,
        value: customNotification,
      });
      updateSettings({ timer_web_notification: customNotification });
    }
  };

  const setTimeEndNotification = () => {
    dispatch({
      type: TOGGLE_TIME_END_NOTIFICION,
      value: !timer_end_notification,
    });
    updateSettings({ timer_end_notification: !timer_end_notification });
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
      value: !timer_auto_start,
    });
    updateSettings({ timer_auto_start: !timer_auto_start });
  };

  const setBreakEndNotification = () => {
    dispatch({
      type: TOGGLE_BREAK_END_NOTIFICATION,
      value: !timer_break_end_notification,
    });
    updateSettings({
      timer_break_end_notification: !timer_break_end_notification,
    });
  };

  const setToggleOnBrowser = () => {
    dispatch({
      type: TOGGLE_TIMER_ON_BROWSER,
      value: !timer_show_timer_on_browser_tab,
    });
    updateSettings({
      timer_show_timer_on_browser_tab: !timer_show_timer_on_browser_tab,
    });
  };

  const setTimerValue = async (timerValue) => {
    const totalTime = stringToSeconds(timerValue);
    dispatch({
      type: SET_TIMER_DISPLAY,
      value: timerValue,
    });
    dispatch({
      type: SET_TIMER,
      value: totalTime,
    });

    if (totalTime && timerValue) {
      updateSettings({
        timer_time: totalTime.toString(),
        display_time: timerValue,
      });
    }
  };

  const setSessionValue = (sessionValue) => {
    const session = sessionValue.replace(/[^0-9]/g, "");
    dispatch({
      type: SET_TOTAL_SESSION,
      value: session,
    });
    updateSettings({ timer_sessions: session });
  };

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Time" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={display_time.toString()}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Time End Notification" />
        <CheckBox
          name="time end notification toggle"
          toggle
          checked={timer_end_notification}
          onChange={setTimeEndNotification}
        />
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Show Timer on Browser Tab" />
        <CheckBox
          name="show timer on browser toggle"
          toggle
          checked={timer_show_timer_on_browser_tab}
          onChange={setToggleOnBrowser}
        />
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Web Notification" />
        <CheckBox
          name="web notification toggle"
          toggle
          checked={timer_web_notification}
          onChange={askForNotification}
        />
      </CustomBox>

      <BorderLine />

      {/* <CustomBox>
        <ParagraphTitle text="Work in Sessions" />
        <CheckBox
          name="Work in Sessions"
          toggle
          checked={workInSession}
          onChange={setWorkInSession}
        />
      </CustomBox> */}
      {/* <CustomBox>
        <ParagraphTitle text="Short Break" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={timer_time}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox>

      <CustomBox>
        <ParagraphTitle text="Long Break" />
        <Box>
          <MaskedInput
            textAlign="center"
            value={timer_time}
            onChange={(event) => setTimerValue(event.target.value)}
          />
        </Box>
      </CustomBox> */}

      <CustomBox>
        <ParagraphTitle text="Sessions" />
        <Box>
          <TextInput
            a11yTitle="Sessions"
            placeholder="Sessions"
            textAlign="center"
            size="small"
            value={timer_sessions}
            onChange={(event) => setSessionValue(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Auto Start" />
        <CheckBox
          name="Auto Start"
          toggle
          checked={timer_auto_start}
          onChange={setAutoStart}
        />
      </CustomBox>

      <CustomBox>
        <ParagraphTitle text="Break End Notification" />
        <CheckBox
          name="Break End Notification"
          toggle
          checked={timer_break_end_notification}
          onChange={setBreakEndNotification}
        />
      </CustomBox>

      <BorderLine />
    </div>
  );

  return timer_settings_loaded_from_backend ? <CustomSpinner /> : content;
};

export default TimerSettings;
