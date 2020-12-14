import { useState } from "react";
import Timer from "./components/timer";
import Sounds from "./components/sounds";
import Header from "./components/header";
import Footer from "./components/footer";
import "./js/noisli";

function App() {
  const [myAudio, setMyAudio] = useState({});
  const [mute, setMute] = useState(false);

  const onMuteClickToggle = () => {
    setMute(!mute);
    for (const [key, audio] of Object.entries(myAudio)) {
      audio.muted = !audio.muted;
    }
  };

  return (
    <>
      <Timer onMuteClickToggle={onMuteClickToggle} />
      <div className="flex-container padding-top-60px">
        <h1>Noisli</h1>

        <Header />

        <button
          className={
            mute
              ? "flex-item fa fa-volume-off active btn-mute"
              : "flex-item fa fa-volume-up active btn-mute"
          }
          title="Mute/Unmute"
          onClick={() => onMuteClickToggle()}
        ></button>

        <Sounds
          setAudioSound={(audio) => setMyAudio(audio)}
          myAudio={myAudio}
        />
        {/* <div id="buttons" className="flex-item">
        <button id="btn-random">Random</button>
        <button id="btn-productivity">Productivity</button>
        <button id="dbtn-relax">Relax</button>
      </div> */}

        <Footer />
      </div>
    </>
  );
}

export default App;
