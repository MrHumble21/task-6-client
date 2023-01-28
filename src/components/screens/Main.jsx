import React, { useState, createContext } from "react";
import { Button, Container } from "reactstrap";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "./email.json";
import SendForm from "./SendForm";
import { Link } from "react-router-dom";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const username = createContext();

function Main() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(false);
  const [final, setFinal] = useState("");
  const saveUser = async () => {
    axios.post("/create_user", { name }).then((response) => {
      setFinal(name);
      console.log(response);
      if (response.status === 200) {
      }
    });
  };
  return (
    <username.Provider value={name}>
      <Container className="p-3">
        <center>
          <h1>Hello, welcome to email-transition</h1>
          <center>
            <Lottie options={defaultOptions} height={230} width={230} />
          </center>
          <Container className="my-2">
            <h4 className="text-center">Please write your name in the form!</h4>
            <center>
              <form action="">
                <div className="form-group w-50">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Your Name {name.length ? "is" : ""} <b>{name + " 🙃 "}</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="exampleInputEmail1"
                    aria-describedby="text"
                    placeholder="Your name please!"
                  />
                </div>
                {name.length ? (
                  <Link state={{ name }} to={"/message"}>
                    <button
                      onClick={saveUser}
                      type="button"
                      className="btn my-3 btn-outline-primary"
                    >
                      Save your name, and preceed
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    type="button"
                    className="btn my-3 btn-outline-primary"
                  >
                    Enter your name
                  </button>
                )}
              </form>
            </center>
          </Container>
        </center>
      </Container>
    </username.Provider>
  );
}

export default Main;
