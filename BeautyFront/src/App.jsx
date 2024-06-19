import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import ProcedureReg from "./pages/ProcedureReg";

function App() {
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState(null);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/create" element={<ProcedureReg />} />
        <Route
          path="/login"
          element={
            <Login
              setUpdate={setUpdate}
              setError={setError}
              error={error}
              update={update}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <HomePage
              setUpdate={setUpdate}
              setError={setError}
              error={error}
              update={update}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
