import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/auth";

export function Authenticated<T extends React.FunctionComponent>(Component: T) {
  return (props: any) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando..</div>;
    }
    if (!authenticated) {
      Navigate({ to: "/login" });
    }
    return authenticated ? <Component {...props} /> : <div></div>;
  };
}
