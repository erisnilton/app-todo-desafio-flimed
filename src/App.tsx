import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { AuthProvider } from "./context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
    </AuthProvider>
  )
}

export default App;
