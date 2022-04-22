import Header from "../../components/Header";
import { Title } from "../../components/Elements";
import Menu from "./menu";

const Settings = () => {
  return (
    <>
      <Header textcolor />
      <div className="max-w-xl self-start m-auto">
        <Title title="Settings" color alignSelf="start" className="mb-5" />
        <Menu />
      </div>
    </>
  );
};

export default Settings;
