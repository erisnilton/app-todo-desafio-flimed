import Layout from "./components/layout/Layout";
import NavBar from "./components/navbar/NavBar";
import CadastrarNotaForm from "./components/cadastrar/CadastrarNotaForm";
import NotaView from "./components/nota-view/NotaView";

import { Suspense, useState } from "react";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import routes from "~react-pages";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
    </AuthProvider>
  )
}

export default App;
