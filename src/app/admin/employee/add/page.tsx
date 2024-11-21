/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { EmployeeSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import { CreateEmployee } from '@/@types/employee';
import api from '@/services/api';
import { Controller } from 'react-hook-form';
import Checkbox from '@/components/Checkbox';

type EmployeeFormData = z.infer<typeof EmployeeSchema>;

export default function AddEmployee() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(EmployeeSchema)

  const onSubmit = async (data: EmployeeFormData) => {
    setLoading(true);

    try {
      const employeeObj: CreateEmployee = {
        nome: data.name,
        email: data.email,
        cpf: data.cpf,
        dataContratacao: data.hiringDate,
        telefone: data.phone,
        ativo: !!data.active
      }

      await api.post("/employees", employeeObj);
      router.push('/admin/employee');
    } catch (error) {
      console.error('Erro ao adicionar funcionario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Funcionário</h1>
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
              name='hiringDate'
              render={({ field: { value, onChange }}) => (
                <Input
                  name='hiringDate'
                  label='Data de contratação'
                  type="date"
                  variant='secondary'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.hiringDate?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='active'
              render={({ field: { value, onChange }}) => (
                <Checkbox
                  checked={value || false}
                  label='Ativo?'
                  name='active'
                  onChange={onChange}
                  errorMessage={errors.active?.message}
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
              loading={loading}
            >
              Adicionar Funcionário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
