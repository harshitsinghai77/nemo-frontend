import { Component } from "react";

import apiClient from "../../apiClient";
import { moodsCategory } from "./utility";
import { CustomSpinner } from "../Elements";
import "../../css/lofi/music-player.css";

class MusicPlayer extends Component {
  state = {
    index: 0,
    currentTime: "0:00",
    musicList: [],
    all_streams: [],
    pause: false,
    loading: true,
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

    this.fetchAndUpdateStreamsList();
  }

  async fetchFirstStream(mood) {
    try {
      const res = await apiClient.get_streams_by_category(mood);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchAndUpdateStreamsList() {
    const allStreams = [];
    const allPromises = [];
    const successStreams = [];

    const firstMood = this.props.category;
    let newPlaylist = await this.fetchFirstStream(firstMood);

    // If first API is successful, show playlist on the screen and process other requests in background.
    if (newPlaylist.length > 0) {
      this.setState({
        loading: false,
        musicList: newPlaylist,
      });
      allStreams.push(...newPlaylist);
      successStreams.push(firstMood);
      this.updatePlayer();
    }

    moodsCategory.forEach((mood) => {
      if (mood === firstMood && newPlaylist.length > 0) {
        return;
      }

      allPromises.push(
        apiClient
          .get_streams_by_category(mood)
          .then((response) => {
            // push response to allStreams
            allStreams.push(...response.data);
            successStreams.push(mood);
          })
          .catch((error) => {
            console.log("Error", error.message);
          })
      );
    });

    Promise.all(allPromises).then(() => {
      // let newPlaylist = allStreams.filter(
      //   (playlist) => playlist.category === this.props.category
      // );

      // First Call API failed.
      if (newPlaylist.length === 0) {
        const successStream = successStreams[0];
        this.props.onMoodTitleChange(successStream);
        newPlaylist = allStreams.filter(
          (playlist) => playlist.category === successStream
        );
        this.setState({ musicList: newPlaylist });
      }

      // set the dropdown options to the mood with the successful API call.
      this.props.onMoodOptionChange(successStreams);

      this.setState({ all_streams: allStreams });
      this.updatePlayer();
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
      const newPlaylist = this.state.all_streams.filter(
        (playlist) => playlist.category === this.props.category
      );
      return newPlaylist;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.setState({ musicList: snapshot, index: 0, pause: true });
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
    if (isFinite(currentTime)) {
      this.playerRef.currentTime = currentTime;
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
    if (this.playerRef) {
      this.playerRef.load();
    }
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
    const { pause } = this.state;
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

  truncateString = (str, num = 50) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  getAudioCard(currentSong) {
    const { currentTime } = this.state;
    return (
      <>
        {/* <div className="img-wrap">
          <img
            src="https://www.bensound.com/bensound-img/slowmotion.jpg"
            alt="currentsong"
          />
        </div> */}
        <span className="song-name font-serif text-white h-12 mb-4">
          {this.truncateString(currentSong.title)}
        </span>
        <span className="song-autor font-bold font-serif text-white h-10">
          {currentSong.author}
        </span>

        <div className="time">
          <div className="current-time font-light	text-white">{currentTime}</div>
          <div className="end-time font-light	text-white">
            {currentSong.duration}
          </div>
        </div>
      </>
    );
  }

  render() {
    const { musicList, index, pause, loading } = this.state;
    const currentSong = musicList[index];
    const currentSongUrl = currentSong ? currentSong.url : null;

    return (
      <div className="musicplayer">
        <div className="current-song">
          <audio ref={(ref) => (this.playerRef = ref)}>
            <source src={currentSongUrl} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
          {currentSong && this.getAudioCard(currentSong)}

          <div
            ref={(ref) => (this.timelineRef = ref)}
            className={!loading ? "timeline" : ""}
          >
            <div
              ref={(ref) => (this.playheadRef = ref)}
              className="playhead"
            ></div>
            <div
              ref={(ref) => (this.hoverPlayheadRef = ref)}
              className="hover-playhead"
              data-content="0:00"
            ></div>
          </div>

          {loading ? (
            <CustomSpinner />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MusicPlayer;
