import React, { useState } from "react";

import { Box, CheckBox, TextInput } from "grommet";

import Header from "../components/Header";
import MaskedInput from "../components/Inputs/maskedInput";
import TabTitle from "../components/TitleComponent";
import { ParagraphTitle } from "../components/Heading";

const Settings = () => {
  const [checkBox, setCheckBox] = useState(true);
  const [maskedInput, setMaskedInput] = useState("");
  const [sessions, setSessions] = useState("4");

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
          value={maskedInput}
          onChange={(event) => setMaskedInput(event.target.value)}
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
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
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
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
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
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
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
          onChange={(event) => setSessions(event.target.value)}
        />
      </Box>
    </Box>,
  ];

  return (
    <>
      <TabTitle title="Fuck me" />
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
