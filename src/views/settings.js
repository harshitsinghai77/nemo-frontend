import { useContext } from "react";
import { Box, CheckBox, TextInput } from "grommet";

import { store } from "../store/store";
import { browserSupportsNotification } from "../js/notification";
import Header from "../components/Header";
import MaskedInput from "../components/Inputs/maskedInput";
import { Title, ParagraphTitle } from "../components/Elements";

const Settings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    timer,
    timeEndNotification,
    showTimerOnBrowser,
    webNotification,
    totalSessions,
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
              type: "set web notification",
              value: customNotification && !webNotification,
            });
          }
        });
      }

      dispatch({
        type: "set web notification",
        value: customNotification,
      });
    }
  };

  const setTimerValue = (timerValue) => {
    if (timerValue.length === 7) {
      const splitValue = timerValue.split(" : ");
      dispatch({
        type: "set countdown",
        value: parseInt(splitValue[0]) * 60 + parseInt(splitValue[1]),
      });
    }
    dispatch({
      type: "set timer",
      value: timerValue,
    });
  };

  const setSessionValue = (sessionValue) => {
    dispatch({
      type: "set total session",
      value: sessionValue.replace(/[^0-9]/g, ""),
    });
  };

  const content = (
    <>
      <Box
        key="time"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
        gap="40%"
      >
        <ParagraphTitle text="Time" />
        <MaskedInput
          value={timer}
          onChange={(event) => setTimerValue(event.target.value)}
        />
      </Box>
      <Box
        key="time-end-notification"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <ParagraphTitle text="Time End Notification" />
        <CheckBox
          name="time end notification toggle"
          toggle
          checked={timeEndNotification}
          onChange={() =>
            dispatch({
              type: "set time end notification",
              value: !timeEndNotification,
            })
          }
        />
      </Box>
      <Box
        key="show-timer-on-browser-tab"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <ParagraphTitle text="Show Timer on Browser Tab" />
        <CheckBox
          name="show timer on browser toggle"
          toggle
          checked={showTimerOnBrowser}
          onChange={() =>
            dispatch({
              type: "set timer on browser",
              value: !showTimerOnBrowser,
            })
          }
        />
      </Box>
      <Box
        key="web-notification"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <ParagraphTitle text="Web Notification" />
        <CheckBox
          name="web notification toggle"
          toggle
          checked={webNotification}
          onChange={() => askForNotification()}
        />
      </Box>
      <Box
        key="sessions"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
        gap="40%"
      >
        <ParagraphTitle text="Sessions" />
        <TextInput
          a11yTitle="Sessions"
          placeholder="Sessions"
          textAlign="center"
          size="small"
          value={totalSessions}
          onChange={(event) => setSessionValue(event.target.value)}
        />
      </Box>
    </>
  );

  return (
    <>
      <Header textcolor />
      <Box
        flex
        align="center"
        justify="center"
        alignContent="center"
        pad="medium"
        responsive={true}
        margin="auto"
        width="medium"
        style={{ color: "rgb(102, 102, 102)" }}
      >
        <Title title="Settings" color alignSelf="start" />
        {content}
      </Box>
    </>
  );
};

export default Settings;
