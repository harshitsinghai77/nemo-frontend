import React, { useMemo, useState } from "react";

import {
  Grommet,
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Calendar,
  Chart,
  CheckBox,
  Clock,
  DataTable,
  Diagram,
  Distribution,
  FormField,
  Grid,
  Heading,
  MaskedInput,
  Menu,
  Meter,
  Paragraph,
  RadioButtonGroup,
  RangeInput,
  RangeSelector,
  Select,
  Stack,
  Tab,
  Tabs,
  Text,
  TextArea,
  TextInput,
  Video,
} from "grommet";

const Components = () => {
  const [checkBox, setCheckBox] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [maskedInput, setMaskedInput] = useState("");
  const [radioButton, setRadioButton] = useState("RadioButton 1");

  const content = [
    <Box key="type" align="center" gap="small" direction="column">
      <Box
        key="type"
        align="center"
        gap="large"
        direction="row"
        alignContent="between"
      >
        <Paragraph>Time</Paragraph>
        <MaskedInput
          mask={[
            {
              length: [1, 4],
              options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
              regexp: /^\d{1,4}$/,
              placeholder: "nnn",
            },
            { fixed: " " },
            {
              length: 2,
              options: ["MB", "GB", "TB"],
              regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
              placeholder: "gb",
            },
          ]}
          value={maskedInput}
          onChange={(event) => setMaskedInput(event.target.value)}
        />
      </Box>
      <Box
        key="type"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <Paragraph>Time End Notification</Paragraph>
        <CheckBox
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
        />
      </Box>
      <Box
        key="type"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <Paragraph>Show Timer on Browser Tab</Paragraph>
        <CheckBox
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
        />
      </Box>
      <Box
        key="type"
        align="center"
        direction="row"
        alignSelf="stretch"
        justify="between"
      >
        <Paragraph>Web Notification</Paragraph>
        <CheckBox
          name="toggle"
          toggle
          checked={checkBox}
          onChange={(event) => setCheckBox(event.target.checked)}
        />
      </Box>
    </Box>,
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "rgb(102, 102, 102)",
      }}
    >
      <Grommet style={{ flex: "1 1" }}>
        <Box fill pad="medium" overflow="auto">
          <Box direction="row" wrap align="start" gap="large">
            {content}
          </Box>
        </Box>
      </Grommet>
    </div>
  );
};

export default Components;
