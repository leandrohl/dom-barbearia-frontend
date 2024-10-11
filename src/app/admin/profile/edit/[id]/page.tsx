"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import { ProfileSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { CreateProfile } from '@/@types/profile';
import { Controller } from 'react-hook-form';

type ProfileFormData = z.infer<typeof ProfileSchema>;

export default function EditProfile(
  { params: {id}} : { params: {id: number } }
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm(ProfileSchema)

  const searchProfileById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/profile/${id}`);
      setValue("name", data.nome);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchProfileById();
  }, []);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);

    try {
      const profileObj: CreateProfile = {
        nome: data.name
      }

      await api.put(`/profile/${id}`, profileObj);
      router.push('/admin/profile');
    } catch (error) {
      console.error('Erro ao adicionar perfil:', error);
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
              {loading ? 'Cadastrando...' : 'Editar Perfil'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
