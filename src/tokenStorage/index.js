const TOKEN = "TOKEN";

export function setToken(jwtToken) {
  localStorage.setItem(TOKEN, jwtToken);
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}
