import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <form className="w-full flex flex-col gap-4">
      <Input
        required
        placeholder="seu@email.com"
        legend="E-mail"
        type="email"
      />
      <Input required placeholder="123456" legend="Senha" type="password" />

      <Button>Entrar</Button>
    </form>
  );
}
