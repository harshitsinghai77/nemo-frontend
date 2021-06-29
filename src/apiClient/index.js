import APIClient from "./client";

const client = new APIClient("http://127.0.0.1:8000/noisli").client;

export default {
  user_login(user_token) {
    return client.get("/login", user_token);
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
