import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { AuthProvider } from "./context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
    <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default App;
