import jwt_decode from "jwt-decode";
import axios from "axios";

export function getToken() {
  const token = localStorage.getItem("token");
  if (token && token !== "Bearer undefined") return true;
}

export function getJWTUsername() {
  const token = localStorage.getItem("token");
  if (token) return jwt_decode(token).email;
}

export function getJWTID() {
  const token = localStorage.getItem("token");
  if (token) return jwt_decode(token).id;
}

export function getJWTScreenName() {
  const token = localStorage.getItem("token");
  if (token) return jwt_decode(token).screenName;
}

export function getJWTAdminStatus() {
  const token = localStorage.getItem("token");
  if (token) return jwt_decode(token).admin;
}

export function setHeader() {
  if (getToken()) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }
}
