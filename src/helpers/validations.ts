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

export const ProfileSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
});

export const ClientSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email('Email inválido'),
  phone: z.string({ message: "Campo obrigatório" }),
  birthdayDate: z.string({ message: "Campo obrigatório" }),
  cpf: z.string({ message: "Campo obrigatório" }),
  address: z.string({ message: "Campo obrigatório" }),
  neighborhood: z.string({ message: "Campo obrigatório" }),
  city: z.string({ message: "Campo obrigatório" }),
  occupation: z.string({ message: "Campo obrigatório" }),
  observation: z.string().optional(),
});

export const ServiceSchema = z.object({
  description: z.string({ message: "Campo obrigatório" }),
  price: z.string({ message: "Campo obrigatório" }),
  employees: z.array(z.object({
    label: z.string(),
    value: z.number()
  }), { message: "Selecione pelo menos um funcionário" }).min(1)
});

export const ProductSchema = z.object({
  description: z.string({ message: "Campo obrigatório" }),
  price: z.string({ message: "Campo obrigatório" }),
  amount: z.string({ message: "Campo obrigatório" }),
});

export const EmployeeSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email('Email inválido'),
  phone: z.string({ message: "Campo obrigatório" }),
  hiringDate: z.string({ message: "Campo obrigatório" }),
  cpf: z.string({ message: "Campo obrigatório" }),
  active: z.boolean().optional()
});

const OrderItemSchema = z.object({
  type: z.string({ message: "Campo obrigatório" }),
  product: z.string().optional(),
  service: z.string().optional(),
  employee: z.string().optional(),
  value: z.string({ message: "Campo obrigatório" }),
  amount: z.number({ message: "Campo obrigatório" }),
});

export const CommandSchema = z.object({
  client: z.string({ message: "Campo obrigatório" }),
  items: z.array(OrderItemSchema).min(1, { message: "Pelo menos um item é obrigatório" }),
});
