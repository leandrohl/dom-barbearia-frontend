"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ProductSchema } from '@/helpers/validations';
import { useForm } from '@/hooks/useForm';
import { z } from 'zod';
import { CreateProduct } from '@/@types/product';
import api from '@/services/api';
import { Controller } from 'react-hook-form';
import Checkbox from '@/components/Checkbox';
import toast from 'react-hot-toast';

type ProductFormData = z.infer<typeof ProductSchema>;

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(ProductSchema)

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);

    try {
      const productObj: CreateProduct = {
        descricao: data.description,
        preco: Number(data.price),
        quantidade: Number(data.amount),
        ativo: !!data.active,
      }

      await api.post("/product", productObj);
      toast.success('Produto criado com sucesso!');
      router.push('/admin/product');
    } catch {
      toast.error('Erro ao criar produto. Tente novamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Produto</h1>
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
                type="number"
                variant='secondary'
                value={value}
                onChange={onChange}
                errorMessage={errors.price?.message}
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
              Adicionar Produto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
