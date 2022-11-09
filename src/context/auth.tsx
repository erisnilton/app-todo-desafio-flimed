import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User } from "../model/user";
import { api, createSession, createUser } from "../services/api";

export const AuthContext = createContext({
  authenticated: false,
  user: {} as User,
  login: (email: string, password: string) => Promise.resolve({}),
  logout: () => {},
  registerUser: (name: string, email: string, password: string) => {},
  loading: true,
});

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoverUser = localStorage.getItem("user");
    if (recoverUser) {
      setUser(JSON.parse(recoverUser));
    }
    setLoading(false);
  }, []);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    createUser(name, email, password)
      .then((response) => {
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = async (email: string, password: string) => {
    // create a session
    return createSession(email, password)
      .then((response) => {
        const userLogged = response.data.user;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(userLogged));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(userLogged);

        return Promise.resolve(userLogged);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error.response.data);
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser({} as User);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        loading,
        logout,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
