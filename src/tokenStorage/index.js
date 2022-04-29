const TOKEN = "TOKEN";
const IMAGE_URL = "IMAGE_URL";

export function setToken(jwtToken) {
  localStorage.setItem(TOKEN, jwtToken);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
}

export function getUserImage() {
  return localStorage.getItem(IMAGE_URL);
}

export function setUserImage(user_image_url) {
  localStorage.setItem(IMAGE_URL, user_image_url);
}

export function removeUserImage() {
  localStorage.removeItem(IMAGE_URL);
}
