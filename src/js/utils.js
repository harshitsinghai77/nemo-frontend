import SoundData from "../data/sounds.json";

export function LoadSound() {
  const audioDict = {};

  SoundData.forEach((el) => {
    let { imgsrc, stream_url, file_name, title } = el;

    let newAudio = new Audio(require(`../data/sounds/${file_name}`).default);
    newAudio.loop = true;

    // // check if error ocucces when making the request
    // newAudio.addEventListener("error", (e) => {
    //   // if the url fails, use backup url
    //   newAudio.src = stream_url_gcp_backup;
    // });
    // newAudio.src = stream_url;
    // // removing event listener
    // newAudio.removeEventListener("error", () => {});

    // add audio to object
    audioDict[title] = { imgsrc, stream_url, title, currentAudio: newAudio };
  });
  return audioDict;
}

export function numberToMinute(num) {
  return Math.floor(num / 60);
}

export function numberToSeconds(num) {
  return num % 60;
}

export function numberToHours(num) {
  return num / 3600;
}

export function secToHourMinuteSecond(sec) {
  sec = Number(sec);
  const hour = Math.floor(sec / 3600);
  sec %= 3600;
  const min = Math.floor(sec / 60);
  sec = sec % 60;
  return [hour, min, sec];
}

export function secondsToString(sec) {
  const [h, m] = secToHourMinuteSecond(sec);
  if (h === 0 && m < 10) {
    return parseFloat(`${h}.0${m}`);
  }
  return parseFloat(`${h}.${m}`);
}

export function secondsToHrsMinString(sec) {
  const [h, m] = secToHourMinuteSecond(sec);
  if (h === 0) {
    return `${m} min`;
  }
  return `${h}hr ${m}min`;
}

export function minuteToSeconds(min, seconds) {
  return parseInt(min) * 60 + parseInt(seconds);
}

export function parseString(str) {
  const splitValue = str.split(" : ");
  const hrs = splitValue[0] || 0;
  const minutes = splitValue[1] || 0;
  const seconds = splitValue[2] || 0;

  return [hrs, minutes, seconds];
}

export function stringToSeconds(str) {
  const [hrs, minutes, seconds] = parseString(str);
  const totalSeconds = +hrs * 60 * 60 + +minutes * 60 + +seconds;
  return totalSeconds;
}

export function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export const colorPallete = [
  "rgb(20, 97, 75)",
  "rgb(255, 206, 26)",
  "rgb(254, 190, 18)",
  "rgb(250, 121, 0)",
  "rgb(241, 107, 107)",
  "rgb(229, 75, 75)",
  "rgb(219, 51, 78)",
  "rgb(249, 152, 153)",
  "rgb(204, 137, 162)",
  "rgb(171, 38, 105)",
  "rgb(203, 146, 226)",
  "rgb(73, 64, 170)",
  "rgb(28, 18, 139)",
  "rgb(82, 186, 213)",
  "rgb(52, 152, 219)",
  "rgb(41, 54, 110)",
  "rgb(99, 211, 134)",
  "rgb(26, 188, 156)",
  "rgb(92, 229, 180)",
  "rgb(52, 87, 115)",
];

export const APP_NAME = "Nemo";
