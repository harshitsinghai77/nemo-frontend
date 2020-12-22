import { Heading, Paragraph, Button } from "grommet";
import { themePrimaryColor } from "../themes";
import "../css/elements.css";

export const Title = ({ title, color, ...props }) => (
  <Heading
    style={{
      color: color ? themePrimaryColor : "rgb(255, 255, 255)",
    }}
    responsive={true}
    level={3}
    size="small"
    {...props}
  >
    {title}
  </Heading>
);

export const ParagraphTitle = ({ text }) => (
  <Paragraph className="elements-paragraph" size="medium">
    {text}
  </Paragraph>
);

export const PrimaryButton = ({ label, onClick }) => (
  <Button alignSelf="center" margin="small" label={label} onClick={onClick} />
);
