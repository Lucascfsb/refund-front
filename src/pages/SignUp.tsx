import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.passwordConfirm) {
      alert("As senhas não conferem!");
      setIsLoading(false);
      return;
    }

    console.log(formData);
    alert("Formulário enviado!");
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        name="name"
        type="text"
        required
        placeholder="Seu nome"
        legend="Nome"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        required
        placeholder="seu@email.com"
        legend="E-mail"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        required
        placeholder="123456"
        legend="Senha"
        value={formData.password}
        onChange={handleChange}
      />
      <Input
        name="passwordConfirm"
        type="password"
        required
        placeholder="123456"
        legend="Confirmação da senha"
        value={formData.passwordConfirm}
        onChange={handleChange}
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
