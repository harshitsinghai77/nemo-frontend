import { axiosInstance } from "./client";

const endpoints = {
  user_login(user_token) {
    return axiosInstance.post("/login", user_token);
  },

  get_user_image_url() {
    return axiosInstance.get("/user-image");
  },

  get_analytics() {
    return axiosInstance.get("/analytics");
  },

  save_analytics(analytics) {
    return axiosInstance.post("/analytics", analytics);
  },

  get_statistics(stats) {
    return axiosInstance.get(`/statistics/${stats}`);
  },

  save_task(task) {
    return axiosInstance.post("/create_task", task);
  },

  get_tasks() {
    return axiosInstance.get("/get-tasks");
  },

  remove_tasks(task_id) {
    return axiosInstance.delete(`/tasks/${task_id}`);
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

  get_streams_by_category(category) {
    return axiosInstance.get(`/get-streams-by-category/${category}`);
  },

  get_stream_by_id(category, video_id) {
    return axiosInstance.get(`/get-stream-by-id/${category}/${video_id}`);
  },
};

export default endpoints;
