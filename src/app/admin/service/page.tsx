"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { IService } from '@/@types/service';
import MaskService from '@/helpers/masks';
import { useLoading } from '@/context/LoadingContext';

export default function Service() {
  const [services, setServices] = useState<IService[]>([]);
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading()

  const fetchServices = async () => {
    startLoading()

    try {
      const data = await api.get("/service");
      setServices(data);
    } catch {
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddUser = () => {
    router.push('/admin/service/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/service/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Serviços</h1>
        <Button
          onClick={handleAddUser}
          variant='primary'
        >
          Cadastrar Serviço
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Descrição</th>
              <th className="border border-gray-300 p-2">Preço</th>
              <th className="border border-gray-300 p-2">Ativo</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td className="border border-gray-300 p-2">{service.id}</td>
                <td className="border border-gray-300 p-2">{service.descricao}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskMoney(service.preco)}</td>
                <td className="border border-gray-300 p-2">{service.ativo ? 'Sim' : 'Não'}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(service.id)}
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
