import { memo } from "react";
import { MaskedInput } from "grommet";

const Masked = ({ value, onChange }) => (
  <MaskedInput
    mask={[
      {
        length: [1, 2],
        options: [
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
        ],
        regexp: /^1[1-2]$|^[0-9]$/,
        placeholder: "hh",
      },
      { fixed: " : " },
      {
        length: 2,
        options: [
          "05",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
          "55",
          "60",
        ],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: "mm",
      },
      { fixed: " : " },
      {
        length: 2,
        options: ["00", "15", "30", "45"],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: "ss",
      },
    ]}
    size="small"
    value={value}
    onChange={onChange}
  />
);

export default memo(Masked);
