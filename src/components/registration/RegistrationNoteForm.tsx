import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import "./style.scss";
import { createNota } from "../../services/api";
import { useNavigate } from "react-router";
import { Note } from "../../model/note";
import { Authenticated } from "../Authenticated/Authenticated";
import { toast, ToastContainer } from "react-toastify";

const RegistrationNoteForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  function handleCancel() {
    navigate("/");
  }

  function messageSuccess() {
    toast.success("Nota criada com sucesso!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  const onSubmit: SubmitHandler<Note> = (nota) => {
    let items = JSON.parse(localStorage.getItem("notas") || "[]");
    createNota(nota)
      .then((response) => {
        if (response.status === 200) {
          messageSuccess();
          items.push(response.data.note);
          localStorage.setItem("notas", JSON.stringify(items));
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Você não está autorizado!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/login");
        }
      });
  };
  return (
    <div className="cadastrar--notas container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: true })}
          placeholder="Título"
        />
        {errors.title && <span>O Campo Titulo é Obrigatório!</span>}
        <input
          {...register("content", { required: true })}
          placeholder="Conteúdo"
        />
        {errors.content && <span>O Campo conteúdo é Obrigatório!</span>}
        <input
          {...register("description", { required: true })}
          placeholder="Descrição"
        />
        {errors.description && <span>O Campo Descrição é Obrigatório!</span>}
        <div>
          <Button size="sm" type="submit">
            Cadastrar
          </Button>
          <Button size="sm" color="info" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Authenticated(RegistrationNoteForm);
