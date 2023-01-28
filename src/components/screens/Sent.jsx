import React from "react";
import animationData from "./sentAnim.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Sent() {
  return (
    <div>
      <Lottie options={defaultOptions} height={230} width={230} />
    </div>
  );
}

export default Sent;
