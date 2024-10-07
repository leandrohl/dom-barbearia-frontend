"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { CreateUserSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import { Controller } from 'react-hook-form';
import { IProfile } from '@/@types/profile';
import api from '@/services/api';
import Select from '@/components/Select';
import { CreateUser } from '@/@types/user';

type UserFormData = z.infer<typeof CreateUserSchema>;

export default function AddUser() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(CreateUserSchema)

  const fetchProfiles = async () => {
    setLoading(true);

    try {
      const data = await api.get("/profile");
      setProfiles(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);

    try {
      const userObj: CreateUser = {
        nome: data.name,
        email: data.email,
        senha: data.password,
        perfil: Number(data.profile)
      }

      await api.post("/users", userObj);
      router.push('/admin/user');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Usuário</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange }}) => (
              <Input
                name='nome'
                label='Nome'
                type="text"
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange }}) => (
              <Input
                name='email'
                label='Email'
                type="text"
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.email?.message}
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
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='profile'
            render={({ field: { value, onChange }}) => (
              <Select
                name='profile'
                label='Perfil'
                variant='secondary'
                value={value}
                onChange={onChange}
                options={profiles.map(profile => ({
                  value: profile.id,
                  label: profile.nome
                }))}
                errorMessage={errors.profile?.message}
              />
            )}
          />
          <div className='flex justify-end gap-4'>
            <Button
               onClick={() => router.back()}
               variant='primary'
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant='primary'
            >
              {loading ? 'Cadastrando...' : 'Adicionar Usuário'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
