import axios from "axios";
import apiConfig from "../configs/api-config";

const ENDPOINT = `${apiConfig.URL}/users`;

// Signs up a user
async function signupUser(signupData) {
  const ENDPOINT = `${apiConfig.URL}/signup`;
  const response = (await axios.post(ENDPOINT, signupData)).data;
  localStorage.setItem("access-token", response.token); // Storing the tokens
  return response.user;
}

// Authenticates a user from the access-token
async function authenticateUserFromToken() {
  const ENDPOINT = `${apiConfig.URL}/tokenUser`;
  const token = localStorage.getItem("access-token");
  const responseData = (await axios.get(ENDPOINT, { headers: { Authorization: `Bearer ${token}` } })).data;
  localStorage.setItem("access-token", responseData.token);
  return responseData.user;
}

// Logs in a user
async function loginUser(credentials) {
  const ENDPOINT = `${apiConfig.URL}/login`;
  const response = (await axios.post(ENDPOINT, credentials)).data;
  localStorage.setItem("access-token", response.token); // Storing the tokens
  return response.user;
}

// Gets users
async function fetchUsers(page = 1, limit = 12, order = "DESC", search = "") {
  const URL = `${ENDPOINT}?page=${page}&limit=${limit}&order=${order}&search=${search}`;
  return (await axios.get(URL)).data;
}

// Gets a user
async function fetchUser(id) {
  const URL = `${ENDPOINT}/${id}`;
  const headers = {};
  const token = localStorage.getItem("access-token");
  if (token) headers.Authorization = `Bearer ${token}`;
  return (await axios.get(URL, { headers })).data;
}

// Updates a user's profile phto
async function updateUserPhoto(userId, photoData) {
  const URL = `${ENDPOINT}/${userId}/photo`;
  const token = localStorage.getItem("access-token");
  return (await axios.put(URL, photoData, { headers: { Authorization: `Bearer ${token}` } })).data;
}

// Updates the user's personal information
async function updateUserPersoInfo(userId, userData) {
  const URL = `${ENDPOINT}/${userId}`;
  const token = localStorage.getItem("access-token");
  return (await axios.put(URL, userData, { headers: { Authorization: `Bearer ${token}` } })).data;
}

// Updates the user's password
async function updateUserPassword(userId, passwordData) {
  const URL = `${ENDPOINT}/${userId}/password`;
  const token = localStorage.getItem("access-token");
  return (await axios.put(URL, passwordData, { headers: { Authorization: `Bearer ${token}` } })).data;
}

// Deletes the user's account
async function deleteUserAccount(userId, passwordData) {
  const URL = `${ENDPOINT}/${userId}`;
  const token = localStorage.getItem("access-token");
  await axios.delete(URL, { headers: { Authorization: `Bearer ${token}` }, data: passwordData });
}

// Adds a user to another user's followings
async function addFollowing(followedUserId) {
  const URL = `${ENDPOINT}/${followedUserId}/followings`;
  const token = localStorage.getItem("access-token");
  const following = (
    await axios.post(URL, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return following;
}

// Adds a user to another user's followings
async function removeFollowing(followingId, followedUserId) {
  const URL = `${ENDPOINT}/${followedUserId}/followings/${followingId}`;
  const token = localStorage.getItem("access-token");
  await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  signupUser,
  authenticateUserFromToken,
  loginUser,
  fetchUsers,
  fetchUser,
  updateUserPhoto,
  updateUserPersoInfo,
  updateUserPassword,
  deleteUserAccount,
  addFollowing,
  removeFollowing,
};
