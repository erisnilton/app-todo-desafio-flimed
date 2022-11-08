import React from "react";
import CadastrarNotaForm from "../components/cadastrar/CadastrarNotaForm";
import NavBar from "../components/navbar/NavBar";
import Layout from "../components/layout/Layout";

// import { Container } from './styles';

const Cadastro: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <Layout>
      <CadastrarNotaForm />

      </Layout>
    </div>
  );
};

export default Cadastro;
