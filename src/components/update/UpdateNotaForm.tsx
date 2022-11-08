import "./style.scss";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import { getNota, updateNota } from "../../services/api";
import { useNavigate, useParams } from "react-router";
import { Nota } from "../../model/nota";
import { Authenticated } from "../Authenticated/Authenticated";

const UpdateNotaForm: React.FunctionComponent = () => {
  const [nota, setNota] = useState<Nota>();
  const navigate = useNavigate();

  const { id } = useParams<string>();

  function updateNoteLocalStorage(updatedData: Nota) {
    let items = JSON.parse(localStorage.getItem("notas") || "[]");
    items = items.map((item: Nota) => {
      if (item.id === updatedData.id) {
        return updatedData;
      }
      return item;
    });
    localStorage.setItem("notas", JSON.stringify(items));
    navigate("/");
  }

  function handleCancel() {
    navigate("/");
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
  } = useForm<Nota>();

  const onSubmit: SubmitHandler<Nota> = (nota) => {
    let items = JSON.parse(localStorage.getItem("notas") || "[]");
    updateNota(nota, id)
      .then((response) => {
        updateNoteLocalStorage(response.data.note);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Você não tem permissão para criar uma nota!");
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
        <Button size="sm" type="submit">Atualizar</Button>
        <Button color="info" size="sm" onClick={handleCancel}>Cancelar</Button>

        </div>
      </form>
    </div>
  );
};

export default Authenticated(UpdateNotaForm);
