const env = process.env.REACT_APP_ENVIRONMENT;
const use_backend = process.env.REACT_APP_USE_BACKEND;

export const get_server_url = () => {
  if (env === "dev") {
    return "http://localhost:8000/nemo";
  }
  if (use_backend === "QOVERY") {
    return process.env.REACT_APP_SERVER_URL_QOVERY;
  }
  if (use_backend === "DETA") {
    return process.env.REACT_APP_SERVER_URL_DETA;
  }
  return process.env.REACT_APP_SERVER_URL_HEROKU;
};
