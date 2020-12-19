import { Heading, Paragraph } from "grommet";
import { themePrimaryColor } from "../themes";

export const Title = ({ title, color }) => (
  <Heading
    style={{
      display: "block",
      fontSize: "20px",
      fontWeight: "600",
      color: color ? themePrimaryColor : "rgb(255, 255, 255)",
    }}
  >
    {title}
  </Heading>
);

export const ParagraphTitle = ({ content }) => (
  <Paragraph
    style={{
      display: "flex",
      fontWeight: "500",
      fontSize: "13px",
      lineHeight: "35px",
      color: "rgb(102, 102, 102)",
    }}
  >
    {content}
  </Paragraph>
);
