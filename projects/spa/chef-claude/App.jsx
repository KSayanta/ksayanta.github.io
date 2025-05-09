import { useEffect } from "react";
import { pingHost } from "/src/utils.js";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  useEffect(() => {
    pingHost();
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}
