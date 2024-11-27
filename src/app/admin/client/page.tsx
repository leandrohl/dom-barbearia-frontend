"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { IClient } from '@/@types/client';
import MaskService from '@/helpers/masks';
import { useLoading } from '@/context/LoadingContext';

export default function Client() {
  const [customers, setCustomers] = useState<IClient[]>([]);
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading()

  const fetchCustomers = async () => {
    startLoading();

    try {
      const data = await api.get("/client");
      setCustomers(data);
    } catch {
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: number) => {
    startLoading();

    try {
      await api.delete(`/client/${id}`);
      const updatedCustomers = customers.filter(client => client.id !== id);
      setCustomers(updatedCustomers);
    } catch {
    } finally {
      stopLoading();
    }
  };

  const handleAddUser = () => {
    router.push('/admin/client/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/client/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Clientes</h1>
        <Button
          onClick={handleAddUser}
          variant='primary'
        >
          Cadastrar Cliente
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Telefone</th>
              <th className="border border-gray-300 p-2">Data Aniversário</th>
              <th className="border border-gray-300 p-2">CPF</th>
              <th className="border border-gray-300 p-2">Endereço</th>
              <th className="border border-gray-300 p-2">Bairro</th>
              <th className="border border-gray-300 p-2">Cidade</th>
              <th className="border border-gray-300 p-2">Profissão</th>
              <th className="border border-gray-300 p-2">Observação</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(client => (
              <tr key={client.id}>
                <td className="border border-gray-300 p-2">{client.id}</td>
                <td className="border border-gray-300 p-2">{client.nome}</td>
                <td className="border border-gray-300 p-2">{client.email}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskPhone(client.telefone)}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskDate(client.dataAniversario)}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskCPF(client.cpf)}</td>
                <td className="border border-gray-300 p-2">{client.endereco}</td>
                <td className="border border-gray-300 p-2">{client.bairro}</td>
                <td className="border border-gray-300 p-2">{client.cidade}</td>
                <td className="border border-gray-300 p-2">{client.profissao}</td>
                <td className="border border-gray-300 p-2">{client.observacao}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(client.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="p-1 bg-primary text-white rounded"
                  >
                    <TrashIcon className="w-6 h-6" />
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
