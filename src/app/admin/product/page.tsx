"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { IProduct } from '@/@types/product';
import MaskService from '@/helpers/masks';
import { useLoading } from '@/context/LoadingContext';

export default function Product() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading()

  const fetchProducts = async () => {
    startLoading();

    try {
      const data = await api.get("/product");
      setProducts(data);
    } catch {
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    router.push('/admin/product/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/product/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Produtos</h1>
        <Button
          onClick={handleAddProduct}
          variant='primary'
        >
          Cadastrar Produto
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Descrição</th>
              <th className="border border-gray-300 p-2">Preço</th>
              <th className="border border-gray-300 p-2">Quantidade</th>
              <th className="border border-gray-300 p-2">Ativo</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.id}</td>
                <td className="border border-gray-300 p-2">{product.descricao}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskMoney(product.preco)}</td>
                <td className="border border-gray-300 p-2">{product.quantidade}</td>
                <td className="border border-gray-300 p-2">{product.ativo ? 'Sim' : 'Não'}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
