import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Layout from "../../components/layout/Layout";
import RegistrationNoteForm from "../../components/registration/RegistrationNoteForm";

const Registration: React.FunctionComponent = () => {
  return (
    <div>
      <NavBar />
      <Layout>
        <RegistrationNoteForm />
      </Layout>
    </div>
  );
};

export default Registration;
