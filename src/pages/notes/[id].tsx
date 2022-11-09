import React, { useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getNota } from "../../services/api";
import { Note } from "../../model/note";
import NoteViewInfo from "../../components/note-view-info/NoteViewInfo";

const NoteInfo: React.FC = () => {
  const [note, setNota] = React.useState<Note>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getNota(id)
      .then(({ data }) => {
        setNota(data.note);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <div>
      <NavBar />
      { loading ? (<div>Carregando...</div>) : (<NoteViewInfo note={note}/>)}
    </div>
  )
};

export default NoteInfo;
