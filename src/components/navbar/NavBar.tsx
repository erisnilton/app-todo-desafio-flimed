import React, { useContext } from "react";
import Button from "../button/Button";
import Logo from "../../assets/imgs/Logo.svg";
import "./style.scss";

import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const NavBar: React.FunctionComponent = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img
          className="navbar--logo"
          loading="lazy"
          src={Logo}
          alt="Logo Flimed"
        />
      </Link>
      <div className="navbar--title">
        <span>App todo - desafio frontend</span>
      </div>
      {user && <span className="navbar--name">Logado como: <strong>{user.name}</strong></span>}
      
      { user && <Button size="sm" color="danger"  onClick={logout}>Logout</Button> }
      <Link to={"/notes/create"}>
        <Button size="sm">Nova Nota</Button>
      </Link>
    </div>
  );
};

export default NavBar;
