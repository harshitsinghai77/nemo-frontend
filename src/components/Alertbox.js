import { Box, Layer, Image } from "grommet";
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
          <PrimaryButton label="Time's up take a break" onClick={onClose} />
        </Layer>
      )}
    </Box>
  );
}

export default AlertBox;
