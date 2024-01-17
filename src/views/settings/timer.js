import { useContext, useEffect, useState } from "react";
import { Box, CheckBox, TextInput, Notification } from "grommet";

import { store } from "../../store/store";
import {
  TOGGLE_WEB_NOTIFICATION,
  SET_TIMER,
  SET_TIMER_DISPLAY,
  SET_TOTAL_SESSION,
  SET_DAILY_GOAL,
  TOGGLE_TIME_END_NOTIFICION,
  TOGGLE_TIMER_ON_BROWSER,
  TOGGLE_AUTO_START,
  TOGGLE_BREAK_END_NOTIFICATION,
  SET_SETTING_LOADED_FROM_BACKEND,
  SET_SETTINGS,
} from "../../store/types";
import apiClient from "../../apiClient";

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
  const [visible, setVisible] = useState(false);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    display_time,
    timer_end_notification,
    timer_show_timer_on_browser_tab,
    timer_web_notification,
    timer_auto_start,
    timer_sessions,
    daily_goal,
    timer_break_end_notification,
    timer_settings_loaded_from_backend,
  } = globalState.state.settings;

  const getSettings = async () => {
    const res = await apiClient.get_settings();
    const { data } = res;
    if (data) {
      dispatch({
        type: SET_SETTINGS,
        value: data,
      });
      dispatch({
        type: SET_SETTING_LOADED_FROM_BACKEND,
        value: !timer_settings_loaded_from_backend,
      });
    }
  };

  const updateSettings = async (payload) => {
    setVisible(false);
    await apiClient.update_settings(payload);
    setVisible(true);
  };

  useEffect(() => {
    // if settings not loaded from backend
    if (timer_settings_loaded_from_backend) {
      getSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer_settings_loaded_from_backend]);

  // const askForNotification = async () => {
  //   if (browserSupportsNotification()) {
  //     let customNotification = false;
  //     if (Notification.permission === "granted") {
  //       customNotification = true && !timer_web_notification;
  //     } else if (!timer_web_notification) {
  //       Notification.requestPermission().then(async function (permission) {
  //         if (permission === "granted") {
  //           customNotification = true;
  //           const notification_value =
  //             customNotification && !timer_web_notification;
  //           dispatch({
  //             type: TOGGLE_WEB_NOTIFICATION,
  //             value: notification_value,
  //           });
  //           await updateSettings({
  //             timer_web_notification: notification_value,
  //           });
  //         }
  //       });
  //     }

  //     dispatch({
  //       type: TOGGLE_WEB_NOTIFICATION,
  //       value: customNotification,
  //     });
  //     await updateSettings({
  //       timer_web_notification: customNotification,
  //     });
  //   }
  // };

  const setTimeEndNotification = async () => {
    dispatch({
      type: TOGGLE_TIME_END_NOTIFICION,
      value: !timer_end_notification,
    });
    await updateSettings({
      timer_end_notification: !timer_end_notification,
    });
  };

  // const setWorkInSession = () => {
  //   dispatch({
  //     type: TOGGLE_WORK_IN_SESSION,
  //     value: !workInSession,
  //   });
  // };

  const setAutoStart = async () => {
    dispatch({
      type: TOGGLE_AUTO_START,
      value: !timer_auto_start,
    });
    await updateSettings({ timer_auto_start: !timer_auto_start });
  };

  const setBreakEndNotification = async () => {
    dispatch({
      type: TOGGLE_BREAK_END_NOTIFICATION,
      value: !timer_break_end_notification,
    });
    await updateSettings({
      timer_break_end_notification: !timer_break_end_notification,
    });
  };

  const setToggleOnBrowser = async () => {
    dispatch({
      type: TOGGLE_TIMER_ON_BROWSER,
      value: !timer_show_timer_on_browser_tab,
    });
    await updateSettings({
      timer_show_timer_on_browser_tab: !timer_show_timer_on_browser_tab,
    });
  };

  const setTimerValue = async (timerValue) => {
    const totalSeconds = stringToSeconds(timerValue);
    dispatch({
      type: SET_TIMER_DISPLAY,
      value: timerValue,
    });
    dispatch({
      type: SET_TIMER,
      value: totalSeconds,
    });
    if (totalSeconds && timerValue) {
      await updateSettings({
        timer_time: totalSeconds.toString(),
        display_time: timerValue,
      });
    }
  };

  const setSessionValue = async (sessionValue) => {
    const session = sessionValue.replace(/[^0-9]/g, "");
    dispatch({
      type: SET_TOTAL_SESSION,
      value: session,
    });
    await updateSettings({ timer_sessions: Number(session) });
  };

  const setDailyGoal = async (dailyGoal) => {
    const daily_goal = dailyGoal.replace(/[^0-9]/g, "");
    dispatch({
      type: SET_DAILY_GOAL,
      value: daily_goal,
    });
    await updateSettings({ daily_goal: Number(daily_goal) });
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
      {/* <CustomBox>
        <ParagraphTitle text="Web Notification" />
        <CheckBox
          name="web notification toggle"
          toggle
          checked={timer_web_notification}
          onChange={askForNotification}
        />
      </CustomBox> */}

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
        <ParagraphTitle text="Daily Goal" />
        <Box>
          <TextInput
            a11yTitle="Daily Goal"
            placeholder="Daily Goal"
            textAlign="center"
            size="small"
            value={daily_goal}
            onChange={(event) => setDailyGoal(event.target.value)}
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

      {visible && (
        <Notification
          toast
          status="normal"
          title="Your account information has been updated!"
          // message="This is an example of a notification message"
          onClose={() => setVisible((prevVisible) => !prevVisible)}
          background="#f6f8f9"
          time={2000}
        />
      )}
    </div>
  );

  return timer_settings_loaded_from_backend ? <CustomSpinner /> : content;
};

export default TimerSettings;
