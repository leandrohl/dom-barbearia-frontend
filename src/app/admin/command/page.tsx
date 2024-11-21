"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { ICommand } from '@/@types/command';
import Modal from '@/components/Modal';
import MaskService from '@/helpers/masks';

export default function Command() {
  const [commands, setCommands] = useState<ICommand[]>([]);
  const [commandSelected, setCommandSelected] = useState<ICommand | null>(null);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchCommands = async () => {
    setLoading(true);

    try {
      const data = await api.get("/command");
      setCommands(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommands();
    console.log(loading)
  }, []);

  const searchCommandById = async (id: number) => {
    setLoading(true);

    try {
      const data = await api.get(`/command/${id}`);
      setCommandSelected(data);
      openModal();
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const handleAddCommand = () => {
    router.push('/admin/command/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/command/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Comandas</h1>
        <Button
          onClick={handleAddCommand}
          variant='primary'
        >
          Cadastrar Comanda
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Cliente</th>
              <th className="border border-gray-300 p-2">CPF</th>
              <th className="border border-gray-300 p-2">Data de Lançamento</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(command => (
              <tr key={command.id}>
                <td className="border border-gray-300 p-2">{command.id}</td>
                <td className="border border-gray-300 p-2">{command.cliente.nome}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskCPF(command.cliente.cpf)}</td>
                <td className="border border-gray-300 p-2">{MaskService.maskDate(command.dataLancamento)}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => searchCommandById(command.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <EyeIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleEdit(command.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-primary text-xl font-semibold">Items da Comanda</h2>
          <h3 className="text-lg text-primary font-semibold mt-4">Produtos</h3>
          <table className="min-w-full bg-white border border-gray-300 text-primary mt-2">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Produto</th>
                <th className="border border-gray-300 p-2">Quantidade</th>
                <th className="border border-gray-300 p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {commandSelected && commandSelected.items
                .filter(item => item.tipo === 'P')
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.produto?.descricao}</td>
                    <td className="border border-gray-300 p-2">{item.quantidade}</td>
                    <td className="border border-gray-300 p-2">{item.valor}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mt-4 text-primary">Serviços</h3>
          <table className="min-w-full bg-white border border-gray-300 text-primary mt-2">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Serviço</th>
                <th className="border border-gray-300 p-2">Funcionário</th>
                <th className="border border-gray-300 p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {commandSelected && commandSelected.items
                .filter(item => item.tipo === 'S')
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.servico?.descricao}</td>
                    <td className="border border-gray-300 p-2">{item.funcionario?.nome}</td>
                    <td className="border border-gray-300 p-2">{item.valor}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal>
      </div>
    </div>
  );
}
