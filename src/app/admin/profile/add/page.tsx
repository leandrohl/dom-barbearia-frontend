"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ProfileSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateProfile } from '@/@types/profile';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

type ProfileFormData = z.infer<typeof ProfileSchema>;

export default function AddProfile() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(ProfileSchema)


  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);

    try {
      const profileObj: CreateProfile = {
        nome: data.name
      }

      await api.post("/profile", profileObj);
      toast.success('Perfil criado com sucesso!');
      router.push('/admin/profile');
    } catch {
      toast.error('Erro ao criar perfil. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Perfil</h1>
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
              loading={loading}
            >
              Adicionar Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
