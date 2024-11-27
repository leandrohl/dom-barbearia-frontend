"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CommandSchema } from '@/helpers/validations';
import { z } from 'zod';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { Controller, useFieldArray } from 'react-hook-form';
import { IClient } from '@/@types/client';
import Select from '@/components/Select';
import { IService } from '@/@types/service';
import { IProduct } from '@/@types/product';
import { SelectOption } from '@/@types/utils';
import Input from '@/components/Input';
import {
  TrashIcon
} from '@heroicons/react/24/outline'
import { CreateCommand, OrderItemResponse } from '@/@types/command';
import toast from 'react-hot-toast';

type CommandFormData = z.infer<typeof CommandSchema>;

export default function EditCommand(
  { params: {id}} : { params: {id: number }}
) {
  const [customers, setCustomers] = useState<IClient[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

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
    watch,
    setValue
  } = useForm(CommandSchema)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  console.log(errors)

  const searchCommandById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/command/${id}`);
      setValue("client", String(data.cliente.id));
      setValue("items", data.items.map((item: OrderItemResponse) => ({
        type: item.tipo,
        product: String(item.produto?.id),
        service: String(item.servico?.id),
        employee: String(item.funcionario?.id),
        value: String(item.valor),
        amount: String(item.quantidade)
      })));
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

  const handleFetch = async () => {
    await fetchCustomers();
    await fetchProducts();
    await fetchServices();
    await searchCommandById();
  }

  useEffect(() => {
    handleFetch()
  }, []);

  const onSubmit = async (data: CommandFormData) => {
    setLoading(true);

    try {
      const commandObj: CreateCommand = {
        clienteId: Number(data.client),
        items: data.items.map(item => ({
          tipo: item.type,
          valor: Number(item.value),
          funcionarioId: Number(item.employee),
          produtoId: Number(item.product),
          quantidade: Number(item.amount),
          servicoId: Number(item.service)
        }))
      }


      await api.put(`/command/${id}`, commandObj);
      toast.success('Comanda alterada com sucesso!');
      router.push('/admin/command');
    } catch {
      toast.error('Erro ao editar comanda. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const items = watch('items');

    return items?.reduce((total, item) => {
      const itemValue = Number(item.value) || 0;
      const itemAmount = Number(item.amount) || 0;
      if (item.type === "P")  return total + (itemValue * itemAmount);
      else return total + itemValue;
    }, 0);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Comanda</h1>
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
              <div className='flex justify-between items-center' key={index}>
                <div className='grid grid-cols-4 gap-4 items-center' key={index}>
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
                            onChange={(e) => {
                              const serviceSelected = Number(e.target.value)
                              const value  = services.find(s => s.id === serviceSelected)?.preco;
                              setValue(`items.${index}.value`, String(value));
                              onChange(e);
                            }}
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
                        render={({ field: { value, onChange } }) => {
                          const serviceId = watch(`items.${index}.service`);
                          const service = services.find(s => s.id === Number(serviceId));
                          const employees = service?.servicoFuncionario?.map(sf => ({
                            value: sf.funcionario.id,
                            label: sf.funcionario.nome,
                          })) || []

                          return (
                            <Select
                            name='employee'
                            onChange={onChange}
                            value={value || ""}
                            label="Funcionário"
                            options={employees}
                            variant="secondary"
                          />
                          )
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Controller
                        control={control}
                        name={`items.${index}.product`}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            name='product'
                            onChange={(e) => {
                              const value = products.find(p => p.id === Number(e.target.value))?.preco;
                              setValue(`items.${index}.value`, String(value))
                              onChange(e);
                            }}
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
                      <Controller
                        control={control}
                        name={`items.${index}.amount`}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            onChange={onChange}
                            value={value || ""}
                            label="Quantidade"
                            name='amount'
                            variant="secondary"
                            type='number'
                          />
                        )}
                      />
                    </>
                  )}
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
            <div className='flex flex-col w-full justify-center items-end'>
              <Button
                onClick={() => append({ type: 'S', amount: "0", value: "" })}
                variant='primary'
              >
                Adicionar Item
              </Button>
              <div className='text-red-500 text-sm mt-2'>
                {errors.items?.root?.message || errors.items?.message}
              </div>
            </div>
          </div>
          <div className="mt-4 text-lg font-bold text-right">
            <span className='text-primary'>Total:</span>
            <span className="ml-4 text-primary">R$ {calculateTotal()?.toFixed(2)}</span>
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
              loading={loading}
            >
              Editar Comanda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
