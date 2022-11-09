import "./style.scss";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "../button/Button";
import { getNota, updateNota } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { Note } from "../../model/note";
import { Authenticated } from "../Authenticated/Authenticated";
import { ToastContainer, toast } from "react-toastify";
const UpdateNotaForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const [nota, setNota] = useState<Note>(findNoteByIdFromLocalStorage(id));

  function updateNoteLocalStorage(updatedData: Note) {
    let items = getNotesFromLocalstorage();
    items = items.map((item: Note) =>
      item.id === updatedData.id ? updatedData : item
    );

    localStorage.setItem("notas", JSON.stringify(items));
    navigate("/");
  }

  function handleCancel() {
    navigate("/");
  }

  function findNoteByIdFromLocalStorage(id: string | undefined) {
    let items = getNotesFromLocalstorage();
    return items.find((item: Note) => item.id === id);
  }

  function getNotesFromLocalstorage() {
    return JSON.parse(localStorage.getItem("notas") || "[]");
  }

  useEffect(() => {
    getNota(id)
      .then(({ data }) => {
        setNota(data.note);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const onSubmit: SubmitHandler<Note> = (nota) => {
    let items = JSON.parse(localStorage.getItem("notas") || "[]");
    updateNota(nota, id)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Nota atualizada com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          updateNoteLocalStorage(response.data.note);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.success("Você não está autorizado", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/login");
        }
      });
  };
  return (
    <div className="cadastrar-notas container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={nota && nota.title}
          {...register("title", { required: true })}
          placeholder="Título"
        />
        {errors.title && <span>O Campo Titulo é Obrigatório!</span>}
        <input
          defaultValue={nota && nota.content}
          {...register("content", { required: true })}
          placeholder="Conteúdo"
        />
        {errors.content && <span>O Campo conteúdo é Obrigatório!</span>}
        <input
          defaultValue={nota && nota.description}
          {...register("description", { required: true })}
          placeholder="Descrição"
        />
        {errors.description && <span>O Campo Descrição é Obrigatório!</span>}
        <div>
          <Button size="sm" type="submit">
            Atualizar
          </Button>
          <Button color="info" size="sm" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Authenticated(UpdateNotaForm);
