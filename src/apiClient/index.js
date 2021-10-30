import { axiosInstance } from "./client";

const endpoints = {
  user_login(user_token) {
    return axiosInstance.post("/login", user_token);
  },

  save_analytics(analytics) {
    return axiosInstance.post("/analytics", analytics);
  },

  get_analytics() {
    return axiosInstance.get("/analytics");
  },

  get_stastics(stats) {
    return axiosInstance.get(`/statistics/${stats}`);
  },

  get_settings() {
    return axiosInstance.get("/settings");
  },

  get_account() {
    return axiosInstance.get("/account");
  },
  update_account(account) {
    return axiosInstance.patch("/account", account);
  },

  update_settings(settings) {
    return axiosInstance.patch("/settings", settings);
  },

  delete_user() {
    return axiosInstance.delete("/delete");
  },

  get_streams(category) {
    return axiosInstance.get(`/get-all-streams/${category}`);
  },
  get_stream_by_id(category, id) {
    return axiosInstance.get(`/get-all-streams/${category}/${id}`);
  },
};

export default endpoints;
