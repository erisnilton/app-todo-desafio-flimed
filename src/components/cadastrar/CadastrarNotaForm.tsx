import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import "./style.scss";
import { createNota } from "../../services/api";
import { useNavigate } from "react-router";
import { Nota } from "../../model/nota";
import { Authenticated } from "../Authenticated/Authenticated";

const CadastrarNotaForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Nota>();

  function handleCancel() {
    navigate("/");
  }

  const onSubmit: SubmitHandler<Nota> = (nota) => {
    let items = JSON.parse(localStorage.getItem("notas") || "[]");
    createNota(nota)
      .then((response) => {
        items.push(response.data.note);
        localStorage.setItem("notas", JSON.stringify(items));
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Você não tem permissão para criar uma nota!");
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
          <Button size="sm" color="info" onClick={handleCancel}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
};

export default Authenticated(CadastrarNotaForm);
