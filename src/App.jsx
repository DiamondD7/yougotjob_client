import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";

import "./App.css";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </>
    </>
  );
}

export default App;
