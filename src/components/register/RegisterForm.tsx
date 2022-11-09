import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import "./style.scss";
import Logo from "../../assets/imgs/Logo.svg";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm: React.FunctionComponent = () => {
  const { authenticated, login, registerUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ name, email, password }) => {
    registerUser(name, email, password);
  };
  return (
    <div className="login">
      <img loading="lazy" src={Logo} alt="Logo Flimed" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Nome" />
        {errors.name && <span>O Campo Nome é Obrigatório!</span>}
        <input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <span>O Campo Email é Obrigatório!</span>}
        <input
          type={"password"}
          {...register("password", { required: true })}
          placeholder="Senha"
        />
        {errors.password && <span>O Campo senha é Obrigatório!</span>}
        <Button type="submit">Criar Conta</Button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
