import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    alert("Formulário enviado!");
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        placeholder="seu@email.com"
        legend="E-mail"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        required
        placeholder="123456"
        legend="Senha"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>
    </form>
  );
}
