// app/recover-password/page.tsx (se estiver usando a estrutura de app no Next.js 13+)
"use client"

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import { RecoverPasswordSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

type RecoverPasswordData = z.infer<typeof RecoverPasswordSchema>;

const RecoverPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(RecoverPasswordSchema)

  const onSubmit = async (data: RecoverPasswordData) => {
    setLoading(true);

    try {
      await api.post('/auth/forgot-password', { email: data.email });
      toast.success(
        'Por favor, verifique seu email. Você receberá instruções para recuperar a senha.',
        {
          duration: 10000,
        }
      );
    } catch {
      toast.error('Houve um erro ao tentar recuperar a senha. Por favor, tente novamente.');
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
            name='email'
            render={({ field: { value, onChange }}) => (
              <Input
                name='email'
                label='Email'
                type="text"
                variant='primary'
                value={value}
                onChange={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <div className="mt-4 flex justify-center">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="primary"
            >
              {loading ? 'Enviando...' : 'Recuperar Senha'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
