import { useContext } from "react";
import { RangeInput } from "grommet";
import { store } from "../context";
import SoundData from "../data/sounds.json";

function Sounds() {
  const globalState = useContext(store);
  const myAudio = globalState.state.myAudio;
  const activeImage = globalState.state.imageActive;

  const onImageClick = (title, dataKey) => {
    const { dispatch } = globalState;
    dispatch({ type: "toggle activate image", title });

    playAudio(dataKey);
  };

  const playAudio = (datakey) => {
    const audio = myAudio[datakey];
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const onSliderChange = (event, dataKey) => {
    const { value, min, max } = event.target;
    const audio = myAudio[dataKey];
    if (audio) audio.volume = value / (max - min);
  };

  return (
    <>
      <div className="flex-container flex-item sound-types">
        {SoundData.map((el, index) => {
          const { imgsrc, dataKey, title } = el;
          return (
            <div
              key={index}
              data-key={dataKey}
              className="flex-container flex-item"
            >
              <img
                src={require(`../images/${imgsrc}`).default}
                alt={title}
                title={title}
                onClick={() => onImageClick(title, dataKey)}
                className={
                  activeImage[title]
                    ? "flex-item active sound-img"
                    : "flex-item sound-img"
                }
              />
              <RangeInput
                min="0"
                max="100"
                className={
                  activeImage[title]
                    ? "flex-item slider-active dashboard-input"
                    : "flex-item dashboard-input"
                }
                onChange={(event) => onSliderChange(event, dataKey)}
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
    </>
  );
}

export default Sounds;
