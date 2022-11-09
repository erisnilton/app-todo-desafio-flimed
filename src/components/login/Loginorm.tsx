import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import "./style.scss";
import Logo from "../../assets/imgs/Logo.svg";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: React.FunctionComponent = () => {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({email, password}) => {
    login(email, password);
  };
  return (
    <div className="login">
      <img
          loading="lazy"
          src={Logo}
          alt="Logo Flimed"
        />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <span>O Campo Email é Obrigatório!</span>}
        <input type={"password"}
          {...register("password", { required: true })}
          placeholder="Senha"
          
        />
        {errors.password && <span>O Campo senha é Obrigatório!</span>}
        <Button type="submit">Fazer Login</Button>
        <Link to="/register">Criar Conta</Link>
      </form>
    </div>
  );
};

export default LoginForm;