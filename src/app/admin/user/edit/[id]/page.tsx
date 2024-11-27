/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import { EditUserSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import { IProfile } from '@/@types/profile';
import { Controller } from 'react-hook-form';
import Select from '@/components/Select';
import { IEditUser } from '@/@types/user';
import { z } from 'zod';
import toast from 'react-hot-toast';

type UserFormData = z.infer<typeof EditUserSchema>;

export default function EditUser(
  { params: {id}} : { params: {id: number } }
) {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm(EditUserSchema)

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

  const searchUserById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/users/${id}`);
      setValue("name", data.nome);
      setValue("email", data.email);
      setValue("profile", String(data.perfil));
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchUserById();
    fetchProfiles();
  }, []);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);

    try {
      const userObj: IEditUser = {
        nome: data.name,
        email: data.email,
        perfil: Number(data.profile)
      }

      await api.put(`/users/${id}`, userObj);
      toast.success('Usuario alterado com sucesso!');
      router.push('/admin/user');
    } catch  {
      toast.error('Erro ao editar usuario. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Usuário</h1>
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
              loading={loading}
            >
              Editar Usuário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
