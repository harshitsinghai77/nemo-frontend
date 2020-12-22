import { Box, Layer, Image, Paragraph } from "grommet";
import { PrimaryButton } from "./Elements";
import HurrayGif from "../images/giphy.webp";
import "../css/alertbox.css";

function AlertBox(props) {
  const { show, onClose } = props;
  return (
    <Box>
      {show && (
        <Layer
          onEsc={onClose}
          onClickOutside={onClose}
          animation="slide"
          position="center"
          responsive={true}
        >
          <Image fit="cover" src={HurrayGif} className="alertbox-img" />
          <Paragraph
            alignSelf="center"
            textAlign="center"
            className="alertbox-heading"
          >
            Yeah, you did it. Take 15 min break...
          </Paragraph>
          <PrimaryButton label="I'm taking a break" onClick={onClose} />
        </Layer>
      )}
    </Box>
  );
}

export default AlertBox;
