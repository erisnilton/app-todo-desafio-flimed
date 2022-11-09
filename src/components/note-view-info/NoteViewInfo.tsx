import { Link } from "react-router-dom";
import './style.scss';

const NoteViewInfo: React.FunctionComponent = ({note}) => {
  return (
    <div className="info container">
        <h2>Informações da nota</h2>
        <ul>
          <li><span>ID: </span>{`${note?.id}`}</li>
          <li><span>Titulo: </span>{`${note?.title}`}</li>
          <li><span>Descrição: </span>{`${note?.description}`}</li>
          <li><span>Conteúdo: </span>{`${note?.content}`} </li>
        </ul>
        <Link to={'/'}> Ir para o inicio</Link>
    </div>
  );
};
export default NoteViewInfo;