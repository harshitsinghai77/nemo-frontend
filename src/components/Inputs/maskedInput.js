import { memo } from "react";
import { MaskedInput } from "grommet";

const Masked = ({ options, value, onChange }) => (
  <MaskedInput
    mask={[
      {
        length: [1, 2],
        options: options,
        regexp: /^1[1-2]$|^[0-9]$/,
        placeholder: "hh",
      },
      { fixed: " : " },
      {
        length: 2,
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: "mm",
      },
      { fixed: " : " },
      {
        length: 2,
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
