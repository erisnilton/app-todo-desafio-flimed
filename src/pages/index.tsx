import NavBar from "../components/navbar/NavBar";
import Layout from "../components/layout/Layout";
import { Authenticated } from "../components/Authenticated/Authenticated";
import { useState, useEffect, useContext } from "react";
import NoteView from "../components/note-view/NoteView";
import { Note } from "../model/note";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home: React.FunctionComponent = () => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const items = JSON.parse(localStorage.getItem("notas") || "[]") as Note[];
  return (
    <>
      <NavBar />
      <Layout>
        <div className="view--nota" ref={parent}>
          {items &&
            items.map((item) => (
              <NoteView key={item.id} nota={item}></NoteView>
            ))}
        </div>
      </Layout>
    </>
  );
};

export default Authenticated(Home);
