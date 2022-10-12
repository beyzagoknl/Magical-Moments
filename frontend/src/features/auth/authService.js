import axios from "axios";

//const URL = process.env.BASE_SERVER_URL;
//const API_URL = "http://localhost:5007/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:5007/api/users/",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:5007/api/users/login",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  return;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
