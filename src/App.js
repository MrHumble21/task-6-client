import logo from "./logo.svg";
import "./App.css";
import { Container } from "reactstrap";
import Main from "./components/screens/Main";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SendForm from "./components/screens/SendForm";
import AllMsg from "./components/screens/AllMsg";
import OneUserMsg from "./components/screens/OneUserMsg";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/message",
      element: <SendForm />,
    },
    {
      path: "/all_msg",
      element: <AllMsg />,
    },
    {
      path: "/spec_msgs",
      element: <OneUserMsg />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
