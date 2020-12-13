import { useState, useEffect } from "react";
import SoundData from "./data/sounds.json";
import "./js/noisli";

function App() {
  const [imageActive, setImageActive] = useState({});
  const [myAudio, setMyAudio] = useState({});
  const [mute, setMute] = useState(false);

  const createAudio = () => {
    const audioDict = {};
    SoundData.forEach((el) => {
      const { dataKey } = el;
      let currentAudio = new Audio(require(`./sounds/${dataKey}.ogg`).default);
      currentAudio.loop = true;
      audioDict[dataKey] = currentAudio;
    });
    setMyAudio(audioDict);
  };

  useEffect(() => {
    createAudio();
  }, []);

  const onImageClick = (title, dataKey) => {
    setImageActive({
      ...imageActive,
      [title]: imageActive[title] ? !imageActive[title] : true,
    });

    const audio = myAudio[dataKey];
    if (audio) audio.paused ? audio.play() : audio.pause();
  };

  const onSliderChange = (event, dataKey) => {
    const { value, min, max } = event.target;
    const audio = myAudio[dataKey];
    if (audio) audio.volume = value / (max - min);
  };

  const onMuteClick = () => {
    setMute(!mute);
    for (const [audio] of Object.entries(myAudio)) {
      audio.muted = !audio.muted;
    }
  };

  return (
    <div className="flex-container">
      <h1>Noisli</h1>

      <button
        className={
          mute
            ? "flex-item fa fa-volume-off active btn-mute"
            : "flex-item fa fa-volume-up active btn-mute"
        }
        title="Mute/Unmute"
        onClick={() => onMuteClick()}
      ></button>

      <div className="flex-item welcome-text">
        <p>
          Noisli is your digital place for <strong>focus</strong>.
        </p>
        <p>
          Noisli helps you boost your motivation and help you think more
          creatively.
        </p>
      </div>

      {/* <div id="buttons" className="flex-item">
        <button id="btn-random">Random</button>
        <button id="btn-productivity">Productivity</button>
        <button id="btn-relax">Relax</button>
      </div> */}

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
                src={require(`./images/${imgsrc}`).default}
                alt={title}
                title={title}
                onClick={() => onImageClick(title, dataKey)}
                className={
                  imageActive[title] ? "flex-item active" : "flex-item"
                }
              />
              <input
                type="range"
                min="0"
                max="100"
                className={
                  imageActive[title] ? "flex-item slider-active" : "flex-item"
                }
                onChange={(event) => onSliderChange(event, dataKey)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex-item welcome-text">
        <p>
          Created by&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/harshitsinghai/"
          >
            Harshit Singhai
          </a>
          &nbsp;©2021
        </p>
        <p>
          Check out my&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://fictionally-irrelevant.vercel.app/"
          >
            blog
          </a>
          &nbsp;and&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/harshitsinghai77"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
