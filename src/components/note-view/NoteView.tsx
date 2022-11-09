import React from "react";
import { Note } from "../../model/note";
import Card from "../card/Card";
import  { useNavigate } from "react-router";

interface NotaViewProps {
  nota: Note;
}

const NotaView: React.FunctionComponent<NotaViewProps> = (props) => {
  const { nota } = props;

  const navigate = useNavigate();

  const handleNavigateInfo = () => {
    navigate(`notes/${nota.id}`);
  }
  return (
    <div onClick={handleNavigateInfo}>
      <Card nota={nota}></Card>
    </div>
  );
};

export default NotaView;
