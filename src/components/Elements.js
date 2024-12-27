import { Heading, Text, Paragraph, Button, Box, Spinner } from "grommet";
import { CircleInformation } from "grommet-icons";
import { themePrimaryColor } from "../themes";
import "../css/elements.css";

export const Title = ({ title, color, ...props }) => (
  <Heading
    style={{
      color: color ? themePrimaryColor : "rgb(255, 255, 255)",
      fontFamily: "Raleway",
    }}
    className="m-1"
    responsive={true}
    level={3}
    size="small"
    {...props}
  >
    {title}
  </Heading>
);

export const ParagraphTitle = ({ text, helperText }) => (
  <Paragraph
    className="elements-paragraph mr-10"
    textAlign="start"
    size="small"
  >
    {text}
    {helperText && (
      <Button
        tip={{
          dropProps: { align: { left: "right" } },
          content: (
            <Box width={{ max: "small" }} round="xsmall">
              <Text>{helperText}</Text>
            </Box>
          ),
        }}
        a11yTitle={helperText}
        icon={<CircleInformation size="small" />}
      />
    )}
  </Paragraph>
);

export const BorderLine = () => (
  <div className="mt-10	pt-10 border-t border-solid text-light"></div>
);

export const CustomBox = ({ children }) => (
  <div className="flex flex-wrap items-center justify-between mb-5 text-gray-500">
    {children}
  </div>
);

export const CustomSpinner = ({ color }) => (
  <Box align="center" className="my-24">
    <Spinner align="center" color={color} size="small" />
  </Box>
);
