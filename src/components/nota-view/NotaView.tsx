import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./style.scss";
import Button from "../button/Button";
import { Nota } from "../../models/nota";

import { deleteNota, getAllNotas } from "../../services/api";

interface NotaViewProps {
  nota: Nota;
}

const NotaView: React.FunctionComponent<NotaViewProps> = (props) => {
  let items = JSON.parse(localStorage.getItem("notas") || "[]");
  const navigate = useNavigate();
  const { nota } = props;

  function handleUpdateNote() {
    navigate(`notes/update/${nota.id}`);
  }

  function handleDeleteNote() {
    deleteNota(nota.id)
      .then(() => {
        items = items.filter((item: Nota) => item.id !== nota.id);
        localStorage.setItem("notas", JSON.stringify(items));
        navigate("/");
            
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Você não tem permissão para criar uma nota!");
          navigate("/login");
        }
      });
  }

  return (
    <div className="view--card">
      <div className="view--card--title">{nota && nota.title}</div>
      <div className="view--card--content">{nota && nota.content}</div>
      <div className="view--card--content">{nota && nota.description}</div>
      <div className="view--card--footer">
        <Button onClick={handleUpdateNote} color="secondary" size="sm">
          Atualizar
        </Button>
        <Button color="danger" size="sm" onClick={handleDeleteNote}>
          Deletar
        </Button>
      </div>
    </div>
  );
};

export default NotaView;
