import NavBar from "../components/navbar/NavBar";
import Layout from "../components/layout/Layout";
import NotaView from "../components/nota-view/NotaView";
import { Authenticated } from "../components/Authenticated/Authenticated";
import { useState, useEffect, useContext } from "react";
import { getNotas, getAllNotas } from "../services/api";
import { AuthContext } from "../context/auth";

const Home: React.FunctionComponent = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const notas = localStorage.getItem("notas");
    if (notas) {
      setNotas(JSON.parse(notas) || []);
    }
  }, [notas]);

  return (
    <>
      <NavBar />
      <Layout>
        <div className="view--nota">
          {notas.map((nota, index) => (
            <NotaView key={index} nota={nota}></NotaView>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Authenticated(Home);
