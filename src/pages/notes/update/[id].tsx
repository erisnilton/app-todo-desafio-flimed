import React from "react";
import Layout from "../../../components/layout/Layout";
import NavBar from "../../../components/navbar/NavBar";
import { useParams } from "react-router-dom";

import UpdateNotaForm from "../../../components/update/UpdateNotaForm";
import { getNota } from "../../../services/api";
import { useNavigate } from "react-router-dom";

// import { Container } from './styles';

const Cadastro: React.FunctionComponent = (props) => {
  return (
    <div>
      <NavBar />
      <Layout>
        <UpdateNotaForm />
      </Layout>
    </div>
  );
};

export default Cadastro;
