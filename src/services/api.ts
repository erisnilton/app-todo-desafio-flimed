import axios from "axios";
import { Nota } from "../model/nota";
import { User } from "../model/user";
export const api = axios.create({
  baseURL: "https://test-flimed-backend.herokuapp.com",
});

export const createSession = async (email: string, password: string) => {
  return await api.post("/users/auth", { email, password });
};

export const getNotas = async (token: string, user: User) => {
  return await api.get(`/notes/show/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNota = async (nota: Nota) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return api.post("/notes/create", nota, { headers });
};

export const getAllNotas = () => {
  return JSON.parse(localStorage.getItem("notas") || "[]");
};

export const getNota = (id: string | undefined) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return api.get(`/notes/show/${id}`, { headers });
}

export const updateNota = (nota: Nota, id: string | undefined) => {
  console.log(nota);
  
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return api.put(`/notes/update/${id}`, nota, { headers });
}

export const deleteNota = (id: string) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return api.delete(`/notes/delete/${id}`, { headers });
}
