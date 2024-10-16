"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { ServiceSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import { CreateService } from '@/@types/service';
import api from '@/services/api';
import { Controller } from 'react-hook-form';
import { IEmployee } from '@/@types/employee';
import Select from '@/components/Select';
import MultiSelect from '@/components/MultiSelect';

type ServiceFormData = z.infer<typeof ServiceSchema>;

export default function AddService() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(ServiceSchema)

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const data = await api.get("/employees");
      setEmployees(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const onSubmit = async (data: ServiceFormData) => {
    setLoading(true);

    try {
      const serviceObj: CreateService = {
        descricao: data.description,
        preco: Number(data.price),
        funcionarios: data.employees.map(employee => employee.value)
      }

      await api.post("/service", serviceObj);
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
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Serviço</h1>
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
          <Controller
            control={control}
            name='employees'
            render={({ field: { value, onChange }}) => (
              <MultiSelect
                name="employees"
                label="Funcionários"
                options={employees.map(employee => ({
                  label: employee.nome,
                  value: employee.id
                }))}
                onChange={onChange}
                value={value}
                errorMessage={errors.employees?.message}
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
              {loading ? 'Cadastrando...' : 'Adicionar Serviço'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
