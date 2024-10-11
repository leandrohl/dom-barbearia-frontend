/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { ServiceSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateService } from '@/@types/service';
import { Controller } from 'react-hook-form';

type ServiceFormData = z.infer<typeof ServiceSchema>;

export default function EditService(
  { params: {id}} : { params: {id: number } }
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm(ServiceSchema)

  const searchServiceById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/service/${id}`);
      setValue("description", data.descricao);
      setValue("price", String(data.preco));
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchServiceById();
  }, []);

  const onSubmit = async (data: ServiceFormData) => {
    setLoading(true);

    try {
      const serviceObj: CreateService = {
        descricao: data.description,
        preco: Number(data.price)
      }

      await api.put(`/service/${id}`, serviceObj);
      router.push('/admin/service');
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Serviço</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <Controller
            control={control}
            name='description'
            render={({ field: { value, onChange }}) => (
              <Input
                name='description'
                label='Descrição'
                type="text"
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.description?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='price'
            render={({ field: { value, onChange }}) => (
              <Input
                name='price'
                label='Preço'
                type="text"
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.price?.message}
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
              {loading ? 'Cadastrando...' : 'Editar Serviço'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
