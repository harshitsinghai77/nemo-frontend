import axios from "axios";
import { getToken } from "../tokenStorage";

const getClient = (baseUrl = null) => {
  let config = {
    baseURL: baseUrl,
    timeout: 60 * 1000,
    headers: {
      "x-auth-token": getToken(),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const client = axios.create(config);
  return client;
};

export class APIClient {
  client;

  constructor(baseUrl) {
    this.client = getClient(baseUrl);
  }
}

export default APIClient;
