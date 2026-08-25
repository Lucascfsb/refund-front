import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { AuthLayout } from "../components/AuthLayout";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
