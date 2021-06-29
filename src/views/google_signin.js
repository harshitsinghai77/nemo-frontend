import GoogleLogin from "react-google-login";
import { setToken } from "../tokenStorage";
import apiClient from "../apiClient";

const responseGoogle = async (response) => {
  const id_token = response.getAuthResponse().id_token;
  const res = await apiClient.user_login({ google_token: id_token });
  const { data } = res;
  setToken(data["access_token"]);
};

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const googleButton = (
  <GoogleLogin
    clientId={clientId}
    buttonText="Login with Google	"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    redirectUri="http://localhost:8000/noisli/login"
    cookiePolicy={"single_host_origin"}
  />
);

const customOnClick = async () => {
  const res = await client.get("/get-settings");
  console.log(res);
};

const GoogleSignIn = () => {
  return (
    <>
      {googleButton}
      <button onClick={customOnClick} style={{ color: "red" }}>
        clike me
      </button>
    </>
  );
};

export default GoogleSignIn;
