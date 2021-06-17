import GoogleLogin from "react-google-login";

const responseGoogle = async (response) => {
  const id_token = response.getAuthResponse().id_token;

  const raw = await fetch("http://127.0.0.1:8000/noisli/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ google_token: id_token }),
  });
  const content = await raw.json();
  console.log(content);
};

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GoogleSignIn = () => {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google	"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      redirectUri="http://localhost:8000/noisli/login/callback"
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignIn;
