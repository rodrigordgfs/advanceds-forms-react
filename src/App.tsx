import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const [output, setOutput] = useState<string>("");
  const { register, handleSubmit } = useForm();

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
            type="email"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
            type="password"
            {...register("password")}
          />
        </div>

        <input
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
          type="submit"
          value="Salvar"
        />
      </form>
      <pre>{output}</pre>
    </main>
  );
}
