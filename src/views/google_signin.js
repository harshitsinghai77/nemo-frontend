import { useState } from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { CustomSpinner } from "../components/Elements";
import { setToken } from "../tokenStorage";
import apiClient from "../apiClient";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleSignIn = () => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const responseGoogle = async (response) => {
    setLoader(true);
    const id_token = response.getAuthResponse().id_token;
    const res = await apiClient.user_login({ google_token: id_token });
    const { data } = res;
    if (data) {
      setToken(data["access_token"]);
      setLoader(false);
      history.push("/");
    }
  };

  const googleButton = (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Connect with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );

  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <h1 className="h1 text-black text-5xl font-extrabold">
              {loader
                ? "Please wait while we create your account"
                : "Connect with Google to get started."}
              {loader && <CustomSpinner />}
            </h1>
            <div className="mt-8 mb-2">{googleButton}</div>
            <Link to="/">
              <p className="text-sm" style={{ color: "rgb(92, 229, 180)" }}>
                I'll connect later
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleSignIn;
