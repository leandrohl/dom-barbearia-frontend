"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CommandSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateProfile } from '@/@types/profile';
import { Controller, useFieldArray } from 'react-hook-form';
import { IClient } from '@/@types/client';
import Select from '@/components/Select';
import { IService } from '@/@types/service';
import { IProduct } from '@/@types/product';
import { SelectOption } from '@/@types/utils';
import { IEmployee } from '@/@types/employee';
import Input from '@/components/Input';
import { OrderItem } from '@/@types/command';
import {
  TrashIcon
} from '@heroicons/react/24/outline'

type CommandFormData = z.infer<typeof CommandSchema>;

export default function AddCommand() {
  const [customers, setCustomers] = useState<IClient[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [typeSelected, setTypeSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const types: SelectOption[] = [
    { value: "P", label: "Produto" },
    { value: "S", label: "Serviço" }
  ]

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm(CommandSchema)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

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

  const fetchCustomers = async () => {
    setLoading(true);

    try {
      const data = await api.get("/client");
      setCustomers(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const data = await api.get("/product") ;
      setProducts(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const fetchServices = async () => {
    setLoading(true);

    try {
      const data = await api.get("/service");
      setServices(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchServices();
    fetchEmployees();
  }, []);

  const onSubmit = async (data: CommandFormData) => {
    setLoading(true);

    try {
      const profileObj: CreateProfile = {
        nome: data.client
      }

      await api.post("/profile", profileObj);
      router.push('/admin/command');
    } catch (error) {
      console.error('Erro ao adicionar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Comanda</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <Controller
            control={control}
            name='client'
            render={({ field: { value, onChange }}) => (
              <Select
                name='client'
                label='Cliente'
                variant='secondary'
                value={value}
                onChange={onChange}
                options={customers.map(client => ({
                  value: client.id,
                  label: client.nome
                }))}
                errorMessage={errors.client?.message}
              />
            )}
          />
          <div className='mt-8 border-y py-8'>
            <h2 className='text-xl font-bold mb-4 text-primary'> Itens da Comanda </h2>
            {fields.map((item, index) => (
              <div className='flex justify-between items-center'>
                <div className='grid grid-cols-5 gap-4 items-center' key={index}>
                  <Controller
                    control={control}
                    name={`items.${index}.type`}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        name='type'
                        onChange={onChange}
                        value={value || ""}
                        label="Tipo"
                        options={types}
                        variant="secondary"
                      />
                    )}
                  />
                  { watch(`items.${index}.type`) === "S"? (
                    <>
                      <Controller
                        control={control}
                        name={`items.${index}.service`}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            name='service'
                            onChange={onChange}
                            value={value || ""}
                            label="Serviço"
                            options={services.map(service => ({
                              value: service.id,
                              label: service.descricao,
                            }))}
                            variant="secondary"
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name={`items.${index}.employee`}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            name='employee'
                            onChange={onChange}
                            value={value || ""}
                            label="Funcionário"
                            options={employees.map(employee => ({
                              label: employee.nome,
                              value: employee.id
                            }))}
                            variant="secondary"
                          />
                        )}
                      />
                    </>
                  ) : (
                    <Controller
                      control={control}
                      name={`items.${index}.product`}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          name='product'
                          onChange={onChange}
                          value={value || ""}
                          label="Produto"
                          options={products.map(product => ({
                            label: product.descricao,
                            value: product.id
                          }))}
                          variant="secondary"
                        />
                      )}
                    />
                  )}
                  <Controller
                    control={control}
                    name={`items.${index}.value`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value || ""}
                        label="Quantidade"
                        name='amount'
                        variant="secondary"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`items.${index}.value`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value || ""}
                        label="Valor"
                        name='value'
                        variant="secondary"
                      />
                    )}
                  />
                </div>

                <button
                    onClick={() => remove(index)}
                    className="h-10 w-10 p-1 bg-primary text-white rounded flex items-center justify-center"
                  >
                    <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
            <div className='flex w-full justify-end items-center gap-4'>
              <Button
                onClick={() => append({ type: '', amount: 1, value: "" })}
                variant='primary'
              >
                Adicionar Item
              </Button>
            </div>
          </div>
          <div className='flex justify-end gap-4 mt-8'>
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
              {loading ? 'Cadastrando...' : 'Criar Comanda'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
