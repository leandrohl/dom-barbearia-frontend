"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const result = await api.post("/auth/login", {...login})
      console.log(result)
      router.push('/login');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Login</h1>
        <div className="mt-4">
          <Input
            name='email'
            label="Email"
            value={login.email}
            type='email'
            onChange={handleChange}
          />
          <Input
            name='password'
            label="Senha"
            value={login.password}
            type='password'
            onChange={handleChange}
          />
          <div className='flex justify-center'>
            <Button
              onClick={handleLogin}
              variant='primary'
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
