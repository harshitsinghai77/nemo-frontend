import { useEffect, useCallback } from "react";

import moods from "./data/mood.json";
import "../../css/lofi/lofi.css";

const mood_images = {};
moods.forEach((m) => {
  const img_src = (
    <img src={require(`./wallpapers/${m.cover}`).default} alt={m.title} />
  );
  mood_images[m.title] = img_src;
});

const LofiSlider = ({ activeMoodTitle }) => {
  const activeImage = document.querySelector(".active");
  const newImage = document.querySelector(".new");

  const toggleSliderAnimation = useCallback(
    (state) => {
      if (activeImage === null || newImage === null) return;
      activeImage.classList[state]("slider-out");
      newImage.classList[state]("slider-in");
    },
    [activeImage, newImage]
  );

  const loadImage = useCallback(
    (title) => {
      if (activeImage === null || newImage === null) return;
      activeImage.src = mood_images[title].props.src;
      newImage.src = mood_images[title].props.src;
    },
    [activeImage, newImage]
  );

  useEffect(() => {
    loadImage(activeMoodTitle, "new");
    toggleSliderAnimation("add");

    // for some reason animationEnd event not working here ( multiple calls )
    // this hack should work for now
    setTimeout(() => {
      toggleSliderAnimation("remove");
      if (activeImage && newImage) {
        activeImage.src = newImage.src;
        // newImage.removeAttribute("src");
      }
    }, 1350);
  }, [
    activeMoodTitle,
    loadImage,
    activeImage,
    newImage,
    toggleSliderAnimation,
  ]);

  return (
    <div className="slider">
      {/* {images && images[activeMoodTitle]} */}
      <img
        className="active"
        alt="active background"
        src={require(`./wallpapers/wall1.jpg`).default}
      />
      <img
        className="new"
        alt="slider background"
        src={require(`./wallpapers/wall1.jpg`).default}
      />
    </div>
  );
};

export default LofiSlider;
