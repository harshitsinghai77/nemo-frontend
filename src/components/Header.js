import { memo } from "react";
import { Link } from "react-router-dom";
import { Header, Avatar } from "grommet";

import { getToken } from "../tokenStorage";
import { settingsIcon } from "../components/svg";
import { themePrimaryColor } from "../themes";
import { Title } from "./Elements";
import { APP_NAME } from "../js/utils";
import "../css/header.css";

const HeaderContainer = ({ textcolor, children, profile_pic }) => (
  <Header>
    <div className="header-container" id="#timer-header">
      <Link to="/">
        <Title title={APP_NAME} color={textcolor} />
      </Link>
      <div className="header-container-center">{children}</div>

      {getToken() ? (
        <div className="flex flex-row items-baseline">
          <div className="m-auto">
            <Link to="/settings">
              {settingsIcon(textcolor, themePrimaryColor)}
            </Link>
          </div>
          {profile_pic && (
            <Avatar src={profile_pic} margin="xsmall" size="small" />
          )}
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </Header>
);

export default memo(HeaderContainer);
