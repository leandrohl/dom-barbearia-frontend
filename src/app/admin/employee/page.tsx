"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';

interface Employee {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataContratacao: string;
  ativo: string;
}

export default function Employee() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    console.log(loading);
  }, []);

  const handleDelete = async (id: number) => {
    const updatedUsers = employees.filter(user => user.id !== id);
    setEmployees(updatedUsers);
  };

  const handleAddUser = () => {
    router.push('/admin/employee/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/employee/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Funcionários</h1>
        <Button
          onClick={handleAddUser}
          variant='primary'
        >
          Cadastrar Funcionário
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">CPF</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Telefone</th>
              <th className="border border-gray-300 p-2">Data de Contratação</th>
              <th className="border border-gray-300 p-2">Ativo</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td className="border border-gray-300 p-2">{employee.id}</td>
                <td className="border border-gray-300 p-2">{employee.nome}</td>
                <td className="border border-gray-300 p-2">{employee.cpf}</td>
                <td className="border border-gray-300 p-2">{employee.email}</td>
                <td className="border border-gray-300 p-2">{employee.telefone}</td>
                <td className="border border-gray-300 p-2">{employee.dataContratacao}</td>
                <td className="border border-gray-300 p-2">{employee.ativo ? 'S' : 'N'}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
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
