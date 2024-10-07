/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm as hookForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";


export const useForm = <T extends z.ZodRawShape>(
  schema: z.ZodEffects<z.ZodObject<T>> | z.ZodObject<T>,
  defaultValues?: any,
) =>
  hookForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  })
