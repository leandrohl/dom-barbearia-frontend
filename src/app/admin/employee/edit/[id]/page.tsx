/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { EmployeeSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateEmployee } from '@/@types/employee';
import { Controller } from 'react-hook-form';
import Checkbox from '@/components/Checkbox';

type EmployeeFormData = z.infer<typeof EmployeeSchema>;

export default function EditEmployee(
  { params: {id}} : { params: {id: number } }
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm(EmployeeSchema)

  const searchEmployeeById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/employees/${id}`);
      setValue("name", data.nome);
      setValue("cpf", data.cpf);
      setValue("email", data.email);
      setValue("hiringDate", data.dataContratacao);
      setValue("phone", data.telefone);
      setValue("active", data.ativo);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchEmployeeById();
  }, []);

  const onSubmit = async (data: EmployeeFormData) => {
    setLoading(true);

    try {
      const employeeObj: CreateEmployee = {
        nome: data.name,
        email: data.email,
        cpf: data.cpf,
        dataContratacao: data.hiringDate,
        telefone: data.phone,
        ativo: data.active
      }

      await api.put(`/employees/${id}`, employeeObj);
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
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Funcionário</h1>
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
                  type="text"
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
                  checked={value}
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
            >
              {loading ? 'Cadastrando...' : 'Editar Funcionário'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
