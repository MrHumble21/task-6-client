import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "reactstrap";

function AllMsg() {
  const senderName = useLocation().state;
  const [allUsers, setAllUsers] = useState([]);
  const [senderData, setSenderData] = useState([]);
  const [allmsg, setAllmsg] = useState([]);

  localStorage.setItem("sender_name", senderName.senderName);
  // console.log(localStorage.getItem("sender_name"));
  const fetchSender = async () => {
    await axios
      .post("/get_sender_data", { sender: localStorage.getItem("sender_name") })
      .then((response) => {
        setSenderData(response.data.sender);
        setAllmsg(response.data.messages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(allmsg);

  useEffect(() => {
    fetchSender();
  }, []);

  return (
    <Container className="p-5">
      <h1>{senderName.senderName}</h1>
      {allUsers.map((user, i) => {
        return (
          <Container key={i} className="m-1">
            <div className="accordion" id="accordionExample">
              <ul className="list-group">
                {allUsers.length > 0 && (
                  <Link
                    state={{ username: user.Name }}
                    to={"/spec_msgs"}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {user.Name}
                    <span className="badge bg-primary rounded-pill">
                      {user.messages.length}
                    </span>
                  </Link>
                )}
              </ul>
            </div>
          </Container>
        );
      })}
    </Container>
  );
}

export default AllMsg;
