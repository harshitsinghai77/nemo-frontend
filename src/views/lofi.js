import Timer from "../components/Timer";
import LofiTitle from "../components/lofi/title";

import "../css/lofi/lofi.css";

const Lofi = () => {
  return (
    <>
      <Timer />
      <div className="main_layout">
        <LofiTitle />
      </div>
    </>
  );
};

export default Lofi;
