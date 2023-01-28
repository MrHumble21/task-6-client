/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AiOutlineDownload } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import Sent from "./Sent";
function genUUID() {
  return uuidv4();
}
function SendForm({ name }) {
  const location = useLocation();
  const [allRecipients, setAllRecipients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  // form values start
  const [typedReceiver, setTypedReceiver] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [senderObject, setSenderObject] = useState("");
  const [rec, setRec] = useState("");
  const [toggleContainer, setToggleContainer] = useState(true);
  const [messageToggle, setMessageToggle] = useState(false);
  const [sentMessageAnimation, setAnimation] = useState(false);
  // form values ends

  localStorage.setItem("name", location.state.name);
  const fetchAllUsers = async () => {
    await axios
      .get("./all_users")
      .then((res) => setAllRecipients(res.data))
      .catch((err) => console.log(err));
  };
  const fetchSender = async () => {
    await axios
      .post("/sender", { senderName: localStorage.getItem("name") })
      .then((res) => {
        setSenderObject(res.data);
        setSender(res.data[0]["_id"]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSender();
    fetchAllUsers();
  }, []);

  console.log(senderObject);
  //test
  const updateReciever = async () => {
    let email_details = {
      title,
      text: message,
      receiver: rec,
      sender: location.state.name,
      status: true,
      custom_id: genUUID(),
    };
    //
    // console.log(email_details);
    await axios
      .post("/reciever-patch", {
        rec: String(typedReceiver),
        message: email_details,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSender = async () => {
    let email_details = {
      title,
      text: message,
      receiver: rec,
      sender: location.state.name,
      status: true,
      custom_id: genUUID(),
    };
    //
    // console.log(email_details);

    await axios
      .patch("/sender-patch", {
        s: String(email_details.sender),
        message: email_details,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //test
  // console.log(allRecipients);
  let email_details = {
    title,
    text: message,
    receiver: rec,
    sender: location.state.nameender,
    status: true,
    custom_id: genUUID(),
  };
  return (
    <>
      <Container className="p-4">
        <center>
          <Link to={"/"}>
            <h3>Main page</h3>
          </Link>
        </center>
        {sentMessageAnimation && (
          <Container
            style={{
              zIndex: 10,
              top: "25%",
            }}
            className=" position-absolute"
          >
            <Sent />
          </Container>
        )}
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <div className="w-75">
            <div className="alert alert-dismissible alert-light">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="btn-close"
                data-bs-dismiss="alert"
              ></button>
              <strong>{location.state.name}</strong>
              <Container>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Recipient name
                  </label>
                  <input
                    type="text"
                    required
                    onFocus={() => {
                      setMessageToggle(true);
                    }}
                    onBlur={() => {
                      setToggleContainer(false);
                    }}
                    value={typedReceiver}
                    onChange={(e) => {
                      setTypedReceiver(e.target.value);
                      setToggleContainer(true);

                      setFiltered(
                        allRecipients.filter((user) => {
                          return user.Name.includes(e.target.value);
                        })
                      );

                      setRec(
                        allRecipients.filter((el) => {
                          return el.Name.includes(e.target.value);
                        })[0]["Name"]
                      );
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Start typing and users will be appeared in the dropdown list "
                  />
                </div>
                <br />
                {typedReceiver.length > 0 ? (
                  <div
                    style={{
                      maxHeight: "300px",
                      overflow: "scroll",
                    }}
                    className={`list-group ${toggleContainer ? "" : "d-none"}`}
                  >
                    {filtered.map((r, i) => (
                      <p
                        key={i}
                        role="button"
                        onClick={() => {
                          setTypedReceiver(r.Name);
                          setToggleContainer(!toggleContainer);
                        }}
                        className="list-group-item list-group-item-action active"
                      >
                        {r.Name}
                      </p>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    value={title}
                    className="form-control"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Subject"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleTextarea" className="form-label mt-4">
                    Email Content
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                  ></textarea>
                </div>
                <center>
                  {message.length > 0 && typedReceiver.length > 0 ? (
                    <Link
                      state={{ senderName: localStorage.getItem("name") }}
                      to={"#"}
                      className="btn m-4 rounded-3 py-2 px-3 btn-outline-primary"
                    >
                      <p
                        role={"button"}
                        className="border-none p-0 m-0 bg-transparent"
                        onClick={async () => {
                          if (message.length > 0 && typedReceiver.length > 0) {
                            console.log(email_details);
                            updateReciever();
                            updateSender();

                            setAnimation(true);
                            setTimeout(() => {
                              setAnimation(false);
                            }, 3500);

                            await axios
                              .post("/save_message", { email_details })
                              .then((r) => {
                                console.log(r);
                              })
                              .catch((e) => {
                                console.log(e);
                              });

                            // setTypedReceiver("");
                            // setMessage("");
                            // setTitle("");
                            // console.log(email_details);
                            // window.location.href = "/all_msg";
                          } else {
                            alert("Please fill all the fields");
                          }
                        }}
                      >
                        Send email{" "}
                        {typedReceiver.length > 0 && `to ${typedReceiver}`}
                      </p>
                    </Link>
                  ) : (
                    ""
                  )}
                </center>
              </Container>
            </div>
          </div>

          <br />
          <br />
        </Container>
      </Container>
      {messageToggle ? (
        <Container
          className="rounded-3 my-4 p-4"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <div className="d-flex flex-column justify-content-start align-items-center">
            <h4 className="m-3">Recieved messages</h4>
            {Object.keys(senderObject).length > 0 &&
              senderObject[0].recieved.reverse().map((element, index) => (
                <div
                  key={index}
                  className="alert my-2 alert-light w-100"
                  role="alert"
                >
                  <Container className="d-flex justify-content-between">
                    <h5>
                      <span className="fs-5 mx-2">From:</span>
                      {element.sender}
                    </h5>
                    <h5>
                      <span className="fs-5"></span>{" "}
                      {element.status && <AiOutlineDownload color="blue" />}
                    </h5>
                  </Container>
                  <Container className="px-4">
                    <strong>
                      <span>Title: {element.title}</span>
                    </strong>
                    <p className="m-0">Message:</p>
                    <div
                      style={{
                        border: "1.5px solid #A0C3D2",
                      }}
                      className="bg-white rounded-3 px-3 py-1"
                    >
                      <p className="m-0">{element.text}</p>
                    </div>
                  </Container>
                </div>
              ))}
          </div>
        </Container>
      ) : (
        ""
      )}
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default SendForm;
