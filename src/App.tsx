import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((v) => {
      return v
        .trim()
        .split(" ")
        .map((v) => v[0].toLocaleUpperCase().concat(v.substring(1)))
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("O e-mail é inválido")
    .toLowerCase()
    .refine((v) => {
      return v.endsWith("@rocketseat.com.br");
    }, "O e-mail deve ser da Rocketseat"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O título é obrigatório"),
        knowledge: z.coerce
          .number()
          .min(1, "O conhecimento deve ser maior que 0")
          .max(100, "O conhecimento deve ser menor que 100"),
      })
    )
    .min(2, "É necessário informar ao menos 2 tecnologia"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function App() {
  const [output, setOutput] = useState<string>("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  return (
    <main className="h-screen bg-zinc-900 text-zinc-300 flex flex-col gap-10 items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
            type="name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="tecnologies"
            className="flex items-center justify-between"
          >
            Tecnologias
            <button className="text-emerald-500 text-sm" onClick={addNewTech}>
              Adicionar
            </button>
          </label>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    className="border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
                    type="text"
                    {...register(`techs.${index}.title`)}
                  />
                  {errors.techs?.[index]?.title && (
                    <span className="text-xs text-red-500">
                      {errors.techs?.[index]?.title?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="w-16 border bg-zinc-800 border-zinc-600 shadow-sm rounded h-10 px-3"
                    type="number"
                    {...register(`techs.${index}.knowledge`)}
                  />
                  {errors.techs?.[index]?.knowledge && (
                    <span className="text-xs text-red-500">
                      {errors.techs?.[index]?.knowledge?.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {errors.techs && (
            <span className="text-xs text-red-500">{errors.techs.message}</span>
          )}
        </div>

        <input
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600 cursor-pointer"
          type="submit"
          value="Salvar"
        />
      </form>
      <pre>{output}</pre>
    </main>
  );
}
