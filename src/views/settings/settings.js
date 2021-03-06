import Header from "../../components/Header";
import { Title } from "../../components/Elements";
import Menu from "./menu";

import "../../css/settings.css";

const Settings = () => {
  return (
    <div className="settings-hero-pattern">
      <Header textcolor />
      <div className="max-w-xl self-start m-auto">
        <Title title="Settings" color alignSelf="start" className="mb-5" />
        <Menu />
      </div>
    </div>
  );
};

export default Settings;
