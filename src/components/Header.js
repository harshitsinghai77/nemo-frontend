import { memo } from "react";
import { Link } from "react-router-dom";
import { Header } from "grommet";

import { getToken } from "../tokenStorage";
import { settingsIcon } from "../components/svg";
import { themePrimaryColor } from "../themes";
import { Title } from "./Elements";
import { APP_NAME } from "../js/utils";
import "../css/header.css";

const HeaderContainer = ({ textcolor, children }) => (
  <Header>
    <div className="header-container" id="#timer-header">
      <Link to="/">
        <Title title={APP_NAME} color={textcolor} />
      </Link>
      <div className="header-container-center">{children}</div>

      {getToken() ? (
        <Link to="/settings">{settingsIcon(textcolor, themePrimaryColor)}</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </Header>
);

export default memo(HeaderContainer);
