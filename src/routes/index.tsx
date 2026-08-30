import { BrowserRouter } from "react-router";

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
  if (isLoading) {
    return <Loading />;
  }

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

  return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
}
