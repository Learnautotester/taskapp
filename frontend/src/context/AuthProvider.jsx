import { useState } from "react";

import { AuthContext }
from "./AuthContext";


const AuthProvider = ({
  children,
}) => {

  // Immediately initialize token
  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

        const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    });


  // Login
const login = (jwtToken, userData) => {

  localStorage.setItem("token", jwtToken);
  localStorage.setItem("user", JSON.stringify(userData));

  setToken(jwtToken);
  setUser(userData);
};


  // Logout
 const logout = () => {

   localStorage.removeItem("token");
   localStorage.removeItem("user");

   setToken(null);
   setUser(null);

};


  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export default AuthProvider;