import { useState, useEffect } from "react";
import SoundData from "../data/sounds.json";

function Sounds(props) {
  const [imageActive, setImageActive] = useState({});

  const createAudio = () => {
    const { setAudioSound } = props;
    const audioDict = {};
    SoundData.forEach((el) => {
      const { dataKey } = el;
      let currentAudio = new Audio(require(`../sounds/${dataKey}.ogg`).default);
      currentAudio.loop = true;
      audioDict[dataKey] = currentAudio;
    });

    setAudioSound(audioDict);
  };

  useEffect(() => {
    createAudio();
  }, []);

  const onImageClick = (title, dataKey) => {
    setImageActive({
      ...imageActive,
      [title]: imageActive[title] ? !imageActive[title] : true,
    });

    playAudio(dataKey);
  };

  const playAudio = (datakey) => {
    const { myAudio } = props;

    const audio = myAudio[datakey];
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const onSliderChange = (event, dataKey) => {
    const { myAudio } = props;
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
                  imageActive[title]
                    ? "flex-item active sound-img"
                    : "flex-item sound-img"
                }
              />
              <input
                type="range"
                min="0"
                max="100"
                className={
                  imageActive[title]
                    ? "flex-item slider-active dashboard-input"
                    : "flex-item dashboard-input"
                }
                onChange={(event) => onSliderChange(event, dataKey)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Sounds;
