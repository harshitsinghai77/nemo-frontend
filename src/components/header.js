import { memo } from "react";
import { Header } from "grommet";
import "../css/header.css";

const HeaderContainer = ({ children }) => (
  <Header>
    <div className="header-container" id="#timer-header">
      <div>Noisli</div>
      <div className="header-container-center">{children}</div>
      <div></div>
    </div>
  </Header>
);

export default memo(HeaderContainer);
