import { Box, TextInput } from "grommet";

import { ParagraphTitle, CustomBox } from "../../components/Elements";
import "../../css/elements.css";

const PreferencesSettings = () => {
  const colorPallete = [
    "rgb(20, 97, 75)",
    "rgb(255, 206, 26)",
    "rgb(254, 190, 18)",
    "rgb(250, 121, 0)",
    "rgb(241, 107, 107)",
    "rgb(229, 75, 75)",
    "rgb(219, 51, 78)",
    "rgb(249, 152, 153)",
    "rgb(204, 137, 162)",
    "rgb(171, 38, 105)",
    "rgb(203, 146, 226)",
    "rgb(73, 64, 170)",
    "rgb(28, 18, 139)",
    "rgb(82, 186, 213)",
    "rgb(52, 152, 219)",
    "rgb(41, 54, 110)",
    "rgb(99, 211, 134)",
    "rgb(26, 188, 156)",
    "rgb(92, 229, 180)",
    "rgb(52, 87, 115)",
  ];

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
          {colorPallete.map((color) => (
            <div
              className="color-pallete"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </CustomBox>
    </div>
  );

  return content;
};

export default PreferencesSettings;
