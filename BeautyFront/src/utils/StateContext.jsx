import { createContext, useState, useEffect } from "react";
import {
  getAllTours,
  getAllProcedures,
  getAllUsers,
  getOneTour,
} from "../services/get";

export const StateContext = createContext();
export const StateProvider = ({ children }) => {
  const [procedures, setProcedures] = useState([]);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [navUpdate, setNavUpdate] = useState(0);
  const [show, setShow] = useState(false);
  


  const fetchProcedures = async () => {
    try {
      const {
        data: { procedures },
      } = await getAllProcedures();
      setProcedures(procedures);
    } catch (err) {}
  };
  const fetchUsers = async () => {
    try {
      const {
        data: { users },
      } = await getAllUsers();
      setUsers(users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, [update]);

  return (
    <StateContext.Provider
      value={{
        procedures,
        setProcedures,
        update,
        setUpdate,
        error,
        setError,
        users,
        setUsers,
        navUpdate,
        setNavUpdate,
        show,
        setShow,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
