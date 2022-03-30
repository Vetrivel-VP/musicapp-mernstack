import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
  const res = await axios.get(`${baseURL}api/users`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
};
