"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoginSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

type LoginData = z.infer<typeof LoginSchema>;

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(LoginSchema)

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      const result = await api.post("/auth/login", {
        email: data.email,
        password: data.password
      });

      const userObj = {
        name: result.user.nome,
        email: result.user.email,
        profileId: result.user.perfil
      }

      login(userObj, result.token)
      toast.success('Login realizado com sucesso');
      router.push('/admin');
    } catch {
      toast.error('Erro ao realizar login. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  const handleRecoverPassword = () => {
    router.push('/recover-password');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Login</h1>
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
                disabled={loading}
              />
            )}
          />
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
                disabled={loading}
              />
            )}
          />

          <div className="mb-4 text-start">
            <button
              onClick={handleRecoverPassword}
              className="text-sm text-white hover:text-blue-800 underline"
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className='flex justify-center'>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant='primary'
              loading={loading}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
