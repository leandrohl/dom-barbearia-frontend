"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/Button';
import api from '@/services/api';
import { IProfile } from '@/@types/profile';

export default function Profile() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfiles = async () => {
    setLoading(true);

    try {
      const data = await api.get("/profile");
      setProfiles(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfiles();
    console.log(loading);
  }, []);

  const handleDelete = async (id: number) => {
    const updatedUsers = profiles.filter(user => user.id !== id);
    setProfiles(updatedUsers);
  };

  const handleAddUser = () => {
    router.push('/admin/profile/add');
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/profile/edit/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Listagem de Perfil</h1>
        <Button
          onClick={handleAddUser}
          variant='primary'
        >
          Cadastrar Perfil
        </Button>
        <table className="min-w-full bg-white border border-gray-300 text-primary mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map(profile => (
              <tr key={profile.id}>
                <td className="border border-gray-300 p-2">{profile.id}</td>
                <td className="border border-gray-300 p-2">{profile.nome}</td>
                <td className="border border-gray-300 p-2 w-32">
                  <button
                    onClick={() => handleEdit(profile.id)}
                    className="mr-2 p-1 bg-primary text-white rounded"
                  >
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleDelete(profile.id)}
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
