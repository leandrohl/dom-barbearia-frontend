import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email('Email inválido'),
  password: z.string({ message: "Campo obrigatório" }),
  profile: z.string({ message: "Campo obrigatório" })
});

export const EditUserSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email('Email inválido'),
  profile: z.string({ message: "Campo obrigatório" })
});
