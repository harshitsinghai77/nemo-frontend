import APIClient from "./client";

const client = new APIClient("http://127.0.0.1:8000/noisli").client;

const endpoints = {
  user_login(user_token) {
    return client.post("/login", user_token);
  },

  save_analytics(analytics) {
    return client.post("/analytics", analytics);
  },

  get_analytics() {
    return client.get("/analytics");
  },

  get_settings() {
    return client.get("/settings");
  },

  get_account() {
    return client.get("/account");
  },

  update_account(account) {
    return client.patch("/account", account);
  },

  update_settings(settings) {
    return client.patch("/settings", settings);
  },
};

export default endpoints;
