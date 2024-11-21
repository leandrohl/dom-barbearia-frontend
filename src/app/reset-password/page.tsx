"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import { PasswordSchema } from "@/helpers/validations";
import { useForm } from "@/hooks/useForm";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";

type PasswordData = z.infer<typeof PasswordSchema>;

export default function ResetPassword() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(PasswordSchema)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromQuery = queryParams.get('token');

    setToken(tokenFromQuery);
  }, []);

  const onSubmit = async (data: PasswordData) => {
    setLoading(true);

    try {
      await api.put('/auth/reset-password', {
        resetToken: token,
        newPassword: data.password
      });
      router.push('/login');
    } catch {
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Recuperar Senha</h1>
        <div className="mt-4">
          <Controller
            control={control}
            name='password'
            render={({ field: { value, onChange }}) => (
              <Input
                name='password'
                label='Senha'
                type="password"
                variant='primary'
                value={value}
                onChange={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field: { value, onChange }}) => (
              <Input
                name='confirmPassword'
                label='Confirmar Senha'
                type="password"
                variant='primary'
                value={value}
                onChange={onChange}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
            >
              {loading ? 'Enviando...' : 'Alterar Senha'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
