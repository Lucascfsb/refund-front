import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { Loading } from "../components/Loading";

import { AuthRoutes } from "./AuthRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";

const isLoading = false;

const session = {
  user: {
    role: "",
  },
};

export function Routes() {
  const context = useAuth();
  console.log("AuthContext:", context);

  // Lógica de renderização condicional baseada na role
  function renderRoutes() {
    switch (session.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
}
