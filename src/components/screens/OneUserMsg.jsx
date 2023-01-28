import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../constants";

function OneUserMsg() {
  const { username } = useLocation().state;
  const [allUsers, setAllUsers] = useState([]);
  localStorage.setItem("username", username);
  const fetchOneUser = async () => {
    await axios
      .post(baseUrl + "/get_user", { username })
      .then((users) => console.log(users))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchOneUser();
  });
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export default OneUserMsg;
