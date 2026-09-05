import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { formatCurrency } from "../utils/formatCurrency";

const refundSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  amount: z.coerce
    .number()
    .min(1, "O valor deve ser maior que 0")
    .positive("O valor deve ser maior que 0"),
  category: z.string().min(1, "A categoria é obrigatória"),
});

export function Refund() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if (!filename) {
        return alert(
          "É necessário enviar um comprovante para solicitar o reembolso",
        );
      }

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", filename);

      const response = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        name,
        amount: amount.replace(",", "."),
        category,
      });

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.error(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Ocorreu um erro ao enviar a solicitação de reembolso");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRefund(id: string) {
    try {
      const { data } = await api.get<RefundAPiResponse>(`/refunds/${id}`);

      setName(data.name);
      setAmount(formatCurrency(data.amount));
      setCategory(data.category);
      setFileURL(data.filename);
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Ocorreu um erro ao buscar a solicitação de reembolso");
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchRefund(params.id);
    }
  }, [params.id]);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          legend="Valor"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>

      {params.id && fileURL ? (
        <a
          href={`http://localhost:3333/uploads/${fileURL}`}
          target="_black"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone do arquivo" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={filename && filename.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {params.id ? "Voltar" : "Enviar"}
      </Button>
    </form>
  );
}
