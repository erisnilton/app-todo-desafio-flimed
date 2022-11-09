import { Note } from './../model/note';
import axios from "axios";
import { User } from "../model/user";
export const api = axios.create({
  baseURL: "https://test-flimed-backend.herokuapp.com",
});


export const createUser = async (name: string, email: string, password: string) => {
  console.log({ name, email, password });
  
  return await api.post("/users/create", { name, email, password });
};

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

export const createNota = async (nota: Note) => {
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

export const getNota =  (id: string | undefined) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return api.get(`/notes/show/${id}`, { headers });
}

export const updateNota = (nota: Note, id: string | undefined) => {  
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
