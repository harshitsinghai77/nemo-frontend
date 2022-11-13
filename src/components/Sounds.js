import { useContext } from "react";
import { RangeInput } from "grommet";

import { store } from "../store/store";
import { TOGGLE_ACTIVATE_IMAGE } from "../store/types";

function Sounds() {
  const globalState = useContext(store);
  const { myAudio, myImages } = globalState.state;

  const onImageClick = async (title) => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_ACTIVATE_IMAGE, title });
    playAudio(title);
  };

  const playAudio = (stream_name) => {
    const audio = myAudio[stream_name].currentAudio;
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const onSliderChange = (event, stream_name) => {
    const { value, min, max } = event.target;
    const audio = myAudio[stream_name].currentAudio;
    if (audio) audio.volume = value / (max - min);
  };

  return (
    <div className="flex-container sound-types">
      {Object.values(myAudio).map((el, index) => {
        const { imgsrc, title } = el;
        return (
          <div
            key={index}
            data-key={title}
            className="flex-container sound-container"
          >
            <img
              src={require(`../images/${imgsrc}`).default}
              alt={title}
              title={title}
              onClick={() => onImageClick(title)}
              className={myImages[title] ? "active sound-img" : "sound-img"}
            />
            <RangeInput
              min="0"
              max="100"
              className={
                myImages[title]
                  ? "dashboard-input slider-active "
                  : "dashboard-input"
              }
              onChange={(event) => onSliderChange(event, title)}
            />
            {/* <input
                type="range"
                min="0"
                max="100"
                className={
                  activeImage[title]
                    ? "flex-item slider-active dashboard-input"
                    : "flex-item dashboard-input"
                }
                onChange={(event) => onSliderChange(event, dataKey)}
              /> */}
          </div>
        );
      })}
    </div>
  );
}

export default Sounds;
