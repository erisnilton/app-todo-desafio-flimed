import React, { ReactNode } from "react";
import './style.scss';
export interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  return(
    <div className="container">
      {props.children }
    </div>
  )
}

export default Layout;