import { Component } from "react";
import "../../css/lofi/music-player.css";

import stream from "./data/streams.json";

class MusicPlayer extends Component {
  state = {
    index: 0,
    currentTime: "0:00",
    musicList: [
      {
        name: "Bloodstream",
        author: "Royalty",
        img: "https://www.bensound.com/bensound-img/buddy.jpg",
        url: "https://r2---sn-gwpa-civ6.googlevideo.com/videoplayback?expire=1634990879&ei=v6ZzYf3nGJ6v3LUP-IeD8Ao&ip=2405%3A201%3A3010%3Ac088%3A5756%3Acfff%3Ac516%3A7d7a&id=o-ANevhyL_ChH53P6sG4H0UZt-vAu03u_1DvRKX1XbjWMS&itag=251&source=youtube&requiressl=yes&mh=Bx&mm=31%2C29&mn=sn-gwpa-civ6%2Csn-gwpa-cvhy&ms=au%2Crdu&mv=m&mvi=2&pl=48&gcr=in&initcwndbps=238750&vprv=1&mime=audio%2Fwebm&ns=uTZG79C52HWHB7UG6DB9ah8G&gir=yes&clen=3715036&dur=225.861&lmt=1577237881013183&mt=1634968841&fvip=2&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=a47nGKduOdlgIDgD-y6&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgZY_p2xP-Ml5_r_eNUJpzJglKCRd0_yrCmfXqd2XLs0YCIQDrs7cYJCa3e2v3yU13ZeOl2Olg7xzNkn4bgav4shtaww%3D%3D&sig=AOq0QJ8wRQIhAIzrr80L2znTUKrWOJP6zmbfXjITawGxvWZKEGBmblG8AiBGv8eifgT8hr-3dm-_JwJ-CM8UbRxKyoHJnzbsMtcyRg==",
        duration: "2:02",
      },
      {
        name: "Gentle acoustic",
        author: "Acoustic",
        img: "https://www.bensound.com/bensound-img/sunny.jpg",
        url: "https://www.bensound.com//bensound-music/bensound-sunny.mp3",
        duration: "2:20",
      },
      {
        name: "Corporate motivational",
        author: "Corporate",
        img: "https://www.bensound.com/bensound-img/energy.jpg",
        url: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
        duration: "2:59",
      },
      {
        name: "Slow cinematic",
        author: "Royalty",
        img: "https://www.bensound.com/bensound-img/slowmotion.jpg",
        url: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
        duration: "3:26",
      },
    ],
    pause: false,
  };

  componentDidMount() {
    this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
    this.playerRef.addEventListener("ended", this.nextSong, false);

    this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
    this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
    this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.playOrPause();
      }
    });
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);

    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);

    document.removeEventListener("keydown", this);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      const newPlaylist = stream.filter(
        (playlist) => playlist.category === this.props.category
      );
      return newPlaylist;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.setState({ musicList: snapshot });
      this.updatePlayer();
      this.playerRef.play();
    }
  }

  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;

    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    const currentTime = (duration * userClickWidhtInPercent) / 100;
    if (currentTime !== null) {
      this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
    }
  };

  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;

    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    if (userClickWidhtInPercent <= 100) {
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }

    const time = (duration * userClickWidhtInPercent) / 100;

    if (time >= 0 && time <= duration) {
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  };

  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  };

  timeUpdate = () => {
    const duration = this.playerRef.duration;
    // const timelineWidth =
    //   this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
    this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
    this.setState({
      currentTime,
    });
  };

  formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
  };

  nextSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + musicList.length - 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  playOrPause = () => {
    if (this.playerRef === null) return;
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if (!this.state.pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
    this.setState({
      pause: !pause,
    });
  };

  clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({
      index: key,
    });

    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return (
      <div className="musicplayer">
        <div className="current-song">
          <audio ref={(ref) => (this.playerRef = ref)}>
            <source src={currentSong.url} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          {/* <div className="img-wrap">
            <img
              src="https://www.bensound.com/bensound-img/slowmotion.jpg"
              alt="currentsong"
            />
          </div> */}
          <span className="song-name font-serif text-white">
            {currentSong.name}
          </span>
          <span className="song-autor font-bold font-serif text-white">
            {currentSong.author}
          </span>

          <div className="time">
            <div className="current-time font-light	text-white">
              {currentTime}
            </div>
            <div className="end-time font-light	text-white">
              {currentSong.duration}
            </div>
          </div>

          <div ref={(ref) => (this.timelineRef = ref)} id="timeline">
            <div ref={(ref) => (this.playheadRef = ref)} id="playhead"></div>
            <div
              ref={(ref) => (this.hoverPlayheadRef = ref)}
              className="hover-playhead"
              data-content="0:00"
            ></div>
          </div>

          <div className="controls">
            <button
              onClick={this.prevSong}
              className="prev prev-next current-btn"
            >
              <i className="fas fa-backward"></i>
            </button>

            <button onClick={this.playOrPause} className="play current-btn">
              {!pause ? (
                <i className="fas fa-play"></i>
              ) : (
                <i className="fas fa-pause"></i>
              )}
            </button>
            <button
              onClick={this.nextSong}
              className="next prev-next current-btn"
            >
              <i className="fas fa-forward"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
