import SoundData from "../data/sounds.json";

export function LoadSound() {
  const audioDict = {};

  SoundData.forEach((el) => {
    const { dataKey } = el;
    let currentAudio = new Audio(require(`../sounds/${dataKey}.ogg`).default);
    currentAudio.loop = true;
    audioDict[dataKey] = currentAudio;
  });

  return audioDict;
}

export function numberToMinute(num) {
  return Math.floor(num / 60);
}

export function numberToSeconds(num) {
  return num % 60;
}

export const APP_NAME = "Noisli";
