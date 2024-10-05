/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function AddProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Aqui você faria uma chamada à API para adicionar o usuário
      // Exemplo:
      // await fetch('/api/users', {
      //   method: 'POST',
      //   body: JSON.stringify({ name, email }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // Simulando um atraso
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirecionar para a lista de usuários após o sucesso
      router.push('/admin/user');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      // Aqui você poderia exibir uma mensagem de erro para o usuário
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Cadastrar Perfil</h1>
        <div onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <Input
            name='nome'
            label='Nome'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant='secondary'
          />
          <Input
            name='email'
            label='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant='secondary'
          />
          <div className='flex justify-end gap-4'>
            <Button
               onClick={() => router.back()}
               variant='primary'
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {}}
              variant='primary'
            >
              {loading ? 'Cadastrando...' : 'Adicionar Perfil'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
