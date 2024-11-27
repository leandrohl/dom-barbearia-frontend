"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { IUser } from '@/@types/user'
import { IProfile } from '@/@types/profile';
import { useLoading } from '@/context/LoadingContext';

export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading()

  const fetchUsers = async () => {
    startLoading();

    try {
      const users = await api.get("/users");
      const profiles = await api.get("/profile");

      const usersWithProfiles = users.map((user: IUser) => ({
        ...user,
        perfil: profiles.find((profile: IProfile) => profile.id === Number(user.perfil))?.nome
      }));

      setUsers(usersWithProfiles);
    } catch {
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    startLoading();

    try {
      await api.delete(`/users/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    } catch {
    } finally {
      stopLoading();
    }
  };

  const handleAddUser = () => {
    router.push('/admin/user/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/user/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Usuários</h1>
        <Button
          onClick={handleAddUser}
          variant='primary'
        >
          Cadastrar Usuário
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Perfil</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.nome}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.perfil}
                </td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
