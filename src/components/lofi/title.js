import { useState } from "react";
import { Select } from "grommet";

import LofiSlider from "./slider";
import LofiPlayer from "./yt-player";
import { moodsCategory } from "./utility";

import "../../css/lofi/lofi.css";

const LofiTitle = () => {
  const [activeMoodTitle, setActiveMoodTitle] = useState("Study & Chill");

  return (
    <>
      <div className="title">
        <div className="title__mood flex flex-row	items-baseline justify-center">
          <p className="toggle_title">Choose your mood</p>
          <Select
            a11yTitle="Choose your mood"
            dropHeight="medium"
            plain
            options={moodsCategory}
            value={activeMoodTitle}
            onChange={({ option }) => setActiveMoodTitle(option)}
          />
        </div>
        <h1>{activeMoodTitle}</h1>
      </div>
      <LofiSlider activeMoodTitle={activeMoodTitle} />
      <LofiPlayer category={activeMoodTitle} />
    </>
  );
};

export default LofiTitle;
