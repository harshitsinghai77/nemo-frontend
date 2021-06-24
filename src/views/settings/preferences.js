import { useContext } from "react";

import { store } from "../../store/store";
import { SET_BACKGROUND_COLOR } from "../../store/types";

import { Box, TextInput, Spinner } from "grommet";

import { ParagraphTitle, CustomBox } from "../../components/Elements";
import { colorPallete } from "../../js/utils";
import { rainbow } from "../../components/rainbow";

import "../../css/elements.css";

const PreferencesSettings = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const onColorChange = (bgColor) => {
    dispatch({
      type: SET_BACKGROUND_COLOR,
      value: bgColor,
    });
  };

  const content = (
    <div className="mt-10">
      <CustomBox>
        <ParagraphTitle text="Shuffle Time" />
        <Box>
          <TextInput
            placeholder="type here"
            value={10}
            size="small"
            //   onChange={(event) => setValue(event.target.value)}
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
