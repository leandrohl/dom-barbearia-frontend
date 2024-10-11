"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { ProductSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import api from '@/services/api';
import { CreateProduct } from '@/@types/product';
import { Controller } from 'react-hook-form';

type ProductFormData = z.infer<typeof ProductSchema>;

export default function EditProduct(
  { params: {id}} : { params: {id: number } }
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm(ProductSchema);

  const searchProductById = async () => {
    setLoading(true);

    try {
      const data = await api.get(`/product/${id}`);
      setValue("description", data.descricao);
      setValue("price", String(data.preco));
      setValue("amount", String(data.quantidade));
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchProductById();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);

    try {
      const productObj: CreateProduct = {
        descricao: data.description,
        preco: Number(data.price),
        quantidade: Number(data.amount)
      }

      await api.put(`/product/${id}`, productObj);
      router.push('/admin/product');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Editar Produto</h1>
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
            name='amount'
            render={({ field: { value, onChange }}) => (
              <Input
                name='amount'
                label='Quantidade'
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
              {loading ? 'Cadastrando...' : 'Editar Produto'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
