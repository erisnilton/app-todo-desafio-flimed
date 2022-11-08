import React, { createContext, useState, useEffect } from "react";
import { Nota } from "../model/nota";
import { User } from "../model/user";
import { createNota } from "../services/api";
import { AuthContext } from "./auth";

export const NotaContext = createContext({});

export const NotaProvider = ({ children }: any) => {
  const [nota, setNotas] = useState<any>([]);

  useEffect(() => {
    const notas = localStorage.getItem("notas");
    if (notas) {
      setNotas(JSON.parse(notas));
    }
  }, []);

  const createNota = async (token: string, user: User, nota: Nota) => {
    // create a nota
    await createNota(token, user, nota);
  };

  return <AuthContext.Provider value={nota}>{children}</AuthContext.Provider>;
};
