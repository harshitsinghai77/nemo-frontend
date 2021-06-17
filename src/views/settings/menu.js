import { Tabs, Tab } from "grommet";

import Timer from "./timer";
import Account from "./account";
import Preferences from "./preferences";

const Menu = () => {
  return (
    <Tabs>
      <Tab title="Timer">
        <Timer />
      </Tab>
      <Tab title="Account">
        <Account />
      </Tab>
      <Tab title="Preferences">
        <Preferences />
      </Tab>
    </Tabs>
  );
};

export default Menu;
