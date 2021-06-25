import { useContext } from "react";

import { store } from "../../store/store";
import {
  SET_BACKGROUND_COLOR,
  SET_BACKGROUND_SHUFFLE_TIME,
} from "../../store/types";
import { updateSettings } from "./utils";

import { Box, TextInput } from "grommet";

import { ParagraphTitle, CustomBox } from "../../components/Elements";
import { colorPallete } from "../../js/utils";
import { rainbow } from "../../components/rainbow";

const PreferencesSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const { preference_shuffle_time } = globalState.state.settings;

  const onColorChange = (bgColor) => {
    dispatch({
      type: SET_BACKGROUND_COLOR,
      value: bgColor,
    });
  };

  const onShuffleTimeChange = (value) => {
    const shuffle = value.replace(/[^0-9]/g, "");
    dispatch({
      type: SET_BACKGROUND_SHUFFLE_TIME,
      value: shuffle,
    });
    if (shuffle) {
      updateSettings({ preference_shuffle_time: shuffle });
    }
  };

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Shuffle Time" />
        <Box>
          <TextInput
            placeholder="type here"
            value={preference_shuffle_time}
            size="small"
            onChange={(event) => onShuffleTimeChange(event.target.value)}
          />
        </Box>
      </CustomBox>
      <CustomBox>
        <ParagraphTitle text="Background Color" />
        <div className="color-pallete-box mt-10">
          {rainbow}
          {colorPallete.map((color) => (
            <div
              key={color}
              className="color-pallete"
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            ></div>
          ))}
        </div>
      </CustomBox>
    </div>
  );

  return content;
};

export default PreferencesSettings;
