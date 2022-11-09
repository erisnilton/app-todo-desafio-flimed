import { Note } from "./../model/note";
import axios from "axios";
import { User } from "../model/user";
export const api = axios.create({
  baseURL: "https://test-flimed-backend.herokuapp.com",
});

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  console.log({ name, email, password });

  return await api.post("/users/create", { name, email, password });
};

export const createSession = (email: string, password: string) => {
  return api.post("/users/auth", { email, password });
};

export const getNotas = async (token: string, user: User) => {
  return await api.get(`/notes/show/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNota = async (nota: Note) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return api.post("/notes/create", nota, { headers });
};

export const getAllNotas = async () => {
  return await JSON.parse(localStorage.getItem("notas") || "[]");
};

export const getNota = async (id: string | undefined) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await api.get(`/notes/show/${id}`, { headers });
};

export const updateNota = async (nota: Note, id: string | undefined) => {
  const token = await localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return api.put(`/notes/update/${id}`, nota, { headers });
};

export const deleteNota = async (id: string) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await api.delete(`/notes/delete/${id}`, { headers });
};
