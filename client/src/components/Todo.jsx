import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchData } from "../api";

const Todo = ({ token }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (token) {
      fetchData(token).then((data) => {
        setData(data);
      });
    }
  }, [token]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Todo</div>;
};

export default Todo;
