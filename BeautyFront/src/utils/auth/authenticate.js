import axios from "axios";

export const login = async (values) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/login",
    values
  );
  localStorage.setItem("user", JSON.stringify(response.data));
};
export const signUp = async (values) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/users/signup",
    values
  );
  localStorage.setItem("user", JSON.stringify(response.data));
};
export const authenticate = () => {
  const logedInUser = getLogedInUser();
  const token = logedInUser ? logedInUser.token : null;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const logout = () => {
  localStorage.removeItem("user");
};
