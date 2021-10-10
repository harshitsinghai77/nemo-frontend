import { useContext } from "react";
import { RangeInput } from "grommet";

import { store } from "../store/store";
import { TOGGLE_ACTIVATE_IMAGE } from "../store/types";

import SoundData from "../data/sounds.json";

function Sounds() {
  const globalState = useContext(store);
  const { myAudio, myImages } = globalState.state;

  const onImageClick = (title, stream_url) => {
    const { dispatch } = globalState;
    dispatch({ type: TOGGLE_ACTIVATE_IMAGE, title });

    playAudio(stream_url);
  };

  const playAudio = (stream_url) => {
    const audio = myAudio[stream_url];
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const onSliderChange = (event, stream_url) => {
    const { value, min, max } = event.target;
    const audio = myAudio[stream_url];
    if (audio) audio.volume = value / (max - min);
  };

  return (
    <div className="flex-container sound-types">
      {SoundData.map((el, index) => {
        const { imgsrc, stream_url, title } = el;
        return (
          <div
            key={index}
            data-key={stream_url}
            className="flex-container sound-container"
          >
            <img
              src={require(`../images/${imgsrc}`).default}
              alt={title}
              title={title}
              onClick={() => onImageClick(title, stream_url)}
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
              onChange={(event) => onSliderChange(event, stream_url)}
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
