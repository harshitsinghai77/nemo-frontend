import { useContext } from "react";
import { Box, CheckBox, TextInput } from "grommet";

import { store } from "../context";
import Header from "../components/Header";
import MaskedInput from "../components/Inputs/maskedInput";
import { ParagraphTitle } from "../components/Heading";

const Settings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    timer,
    timeEndNotification,
    showTimerOnBrowser,
    webNotification,
    sessions,
  } = globalState.state.settings;

  const content = [
    <Box key="type" align="center" gap="small" direction="column">
      <Box
        key="time"
        align="center"
        gap="large"
        direction="row"
        alignContent="between"
      >
        <ParagraphTitle content="Time" />
        <MaskedInput
          options={[
            "00",
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ]}
          value={timer}
          onChange={(event) =>
            dispatch({
              type: "set timer",
              value: event.target.value,
            })
          }
        />
      </Box>
      <Box
        key="time-end-notification"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <ParagraphTitle content="Time End Notification" />
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
        <ParagraphTitle content="Show Timer on Browser Tab" />
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
        <ParagraphTitle content="Web Notification" />
        <CheckBox
          name="web notification toggle"
          toggle
          checked={webNotification}
          onChange={() =>
            dispatch({
              type: "set web notification",
              value: !webNotification,
            })
          }
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
        <ParagraphTitle content="Sessions" />
        <TextInput
          a11yTitle="Sessions"
          placeholder="Sessions"
          textAlign="center"
          size="small"
          value={sessions}
          onChange={(event) =>
            dispatch({
              type: "set sessions",
              value: event.target.value,
            })
          }
        />
      </Box>
    </Box>,
  ];

  return (
    <>
      <Header textcolor />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: "rgb(102, 102, 102)",
        }}
      >
        <Box flex align="center" justify="center" pad="medium">
          {content}
        </Box>
      </div>
    </>
  );
};

export default Settings;
