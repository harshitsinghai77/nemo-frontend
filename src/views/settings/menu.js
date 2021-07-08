import { Tabs, Tab } from "grommet";

import Timer from "./timer";
import Account from "./account";
import Preferences from "./preferences";
import Analytics from "./analytics"

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
      <Tab title="Analytics">
        <Analytics />
      </Tab>
    </Tabs>
  );
};

export default Menu;
