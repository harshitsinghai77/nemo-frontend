import { useState } from "react";
import Timer from "../components/timer";
import Sounds from "../components/sounds";
import Introduction from "../components/introduction";
import Footer from "../components/footer";
import "../js/noisli";

function Dashboard() {
  const [myAudio, setMyAudio] = useState({});
  const [mute, setMute] = useState(false);

  const onMuteClickToggle = () => {
    setMute(!mute);
    for (const [key, audio] of Object.entries(myAudio)) {
      audio.muted = !audio.muted;
    }
  };

  return (
    <div id="#dashboard" className="dashboard">
      <Timer onMuteClickToggle={onMuteClickToggle} />
      <div className="flex-container">
        <h1>Noisli</h1>

        <Introduction />

        <button
          className={
            mute
              ? "flex-item fa fa-volume-off active btn-mute dashboard-button"
              : "flex-item fa fa-volume-up active btn-mute dashboard-button"
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
    </div>
  );
}

export default Dashboard;
