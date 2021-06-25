import { Heading, Paragraph, Button, Box, Spinner } from "grommet";
import { themePrimaryColor } from "../themes";
import "../css/elements.css";

export const Title = ({ title, color, ...props }) => (
  <Heading
    style={{
      color: color ? themePrimaryColor : "rgb(255, 255, 255)",
      fontFamily: "Raleway",
    }}
    className=""
    responsive={true}
    level={3}
    size="small"
    {...props}
  >
    {title}
  </Heading>
);

export const ParagraphTitle = ({ text }) => (
  <Paragraph
    className="elements-paragraph mr-10"
    textAlign="start"
    size="small"
  >
    {text}
  </Paragraph>
);

export const PrimaryButton = ({ label, onClick }) => (
  <Button alignSelf="center" margin="small" label={label} onClick={onClick} />
);

export const BorderLine = () => (
  <div className="mt-10	pt-10 border-t border-solid"></div>
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
