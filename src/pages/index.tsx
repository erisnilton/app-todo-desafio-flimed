import NavBar from "../components/navbar/NavBar";
import Layout from "../components/layout/Layout";
import { Authenticated } from "../components/Authenticated/Authenticated";
import { useState, useEffect, useContext } from "react";
import NoteView from "../components/note-view/NoteView";

const Home: React.FunctionComponent = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const notas = localStorage.getItem("notas");
    if (notas) {
      setNotas(JSON.parse(notas) || []);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Layout>
        <div className="view--nota">
          {notas.map((nota, index) => (
            <NoteView key={index} nota={nota}></NoteView>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Authenticated(Home);
