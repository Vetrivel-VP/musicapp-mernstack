import axios from "axios";

export const fetchData = async (token) => {
  const res = await axios.get("http://localhost:4000/todos", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};
