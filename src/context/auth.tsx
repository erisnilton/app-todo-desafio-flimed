import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { api, createSession, createUser } from "../services/api";

export const AuthContext = createContext({
  authenticated: false,
  user: null,
  login: (email: string, password: string) => {},
  logout: () => {},
  registerUser: (name: string, email: string, password: string) => {},
  loading: true,
});

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
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
          alert("Usuário criado com sucesso!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = async (email: string, password: string) => {
    // create a session
    const response = await createSession(email, password);
    const userLogged = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", JSON.stringify(userLogged));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(userLogged);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
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
