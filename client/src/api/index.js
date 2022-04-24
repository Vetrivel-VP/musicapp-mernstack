import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getUsers`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  console.log(userId, role);
  try {
    const res = await axios.put(`${baseURL}api/users/updateRole`, {
      user_id: userId,
      role: role,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
