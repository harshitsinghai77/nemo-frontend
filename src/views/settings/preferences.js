import { useContext } from "react";

import { store } from "../../store/store";
import apiClient from "../../apiClient";
import {
  SET_BACKGROUND_COLOR,
  SET_BACKGROUND_SHUFFLE_TIME,
} from "../../store/types";

import { Box, TextInput } from "grommet";

import {
  ParagraphTitle,
  CustomBox,
  CustomSpinner,
} from "../../components/Elements";
import { colorPallete } from "../../js/utils";
import { rainbow, selectedColor } from "../../components/svg";

const PreferencesSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    preference_shuffle_time,
    preference_background_color,
    timer_settings_loaded_from_backend,
  } = globalState.state.settings;

  const onColorChange = async (bgColor) => {
    dispatch({
      type: SET_BACKGROUND_COLOR,
      value: bgColor,
    });
    if (bgColor) {
      await apiClient.update_settings({ preference_background_color: bgColor });
    }
  };

  const onShuffleTimeChange = async (value) => {
    const shuffle = value.replace(/[^0-9]/g, "");
    dispatch({
      type: SET_BACKGROUND_SHUFFLE_TIME,
      value: shuffle,
    });
    if (shuffle) {
      await apiClient.update_settings({ preference_shuffle_time: shuffle });
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
          <div
            className="color-pallete"
            onClick={() => onColorChange("rainbow")}
          >
            {rainbow}
            {preference_background_color === "rainbow" && selectedColor}
          </div>
          {colorPallete.map((color) => {
            return (
              <div
                key={color}
                className="color-pallete opacity-50"
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              >
                {preference_background_color === color && selectedColor}
              </div>
            );
          })}
        </div>
      </CustomBox>
    </div>
  );

  return timer_settings_loaded_from_backend ? <CustomSpinner /> : content;
};

export default PreferencesSettings;
