/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ClientSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateClient } from '@/@types/client';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

type ClientFormData = z.infer<typeof ClientSchema>;

export default function EditUser(
  { params: {id}} : { params: {id: number } }
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm(ClientSchema)

  const searcClientById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/client/${id}`);
      setValue("name", data.nome);
      setValue("cpf", data.cpf);
      setValue("email", data.email);
      setValue("birthdayDate", data.dataAniversario);
      setValue("phone", data.telefone);
      setValue("address", data.endereco);
      setValue("neighborhood", data.bairro);
      setValue("city", data.cidade);
      setValue("occupation", data.profissao);
      setValue("observation", data.observacao);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searcClientById();
  }, []);

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true);

    try {
      const clientObj: CreateClient = {
        nome: data.name,
        email: data.email,
        bairro: data.neighborhood,
        cidade: data.city,
        cpf: data.cpf,
        dataAniversario: data.birthdayDate,
        endereco: data.address,
        observacao: data.observation,
        profissao: data.occupation,
        telefone: data.phone
      }

      await api.put(`/client/${id}`, clientObj);
      toast.success('Cliente alterado com sucesso!');
      router.push('/admin/client');
    } catch {
      toast.error('Erro ao editar cliente. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Cliente</h1>
        <div className="bg-white p-6 rounded shadow-md ">
          <div className='grid grid-cols-2 gap-4'>
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
              name='phone'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='phone'
                  label='Telefone'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='cpf'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='cpf'
                  label='CPF'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.cpf?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='birthdayDate'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='birthdayDate'
                  label='Data de aniversário'
                  type="date"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.birthdayDate?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='address'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='address'
                  label='Endereço'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.address?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='neighborhood'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='neighborhood'
                  label='Bairro'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.neighborhood?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='city'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='city'
                  label='Cidade'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.city?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='occupation'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='occupation'
                  label='Profissão'
                  type="text"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.occupation?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='observation'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='observation'
                  label='Observação'
                  type="text"
                  variant='secondary'
                  value={value || ""}
                  onChange={onChange}
                  errorMessage={errors.observation?.message}
                />
              )}
            />
          </div>
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
              {loading ? 'Cadastrando...' : 'Editar Cliente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
