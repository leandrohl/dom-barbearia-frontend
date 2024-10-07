"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/services/api';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const data = await api.post("/auth/login", {...loginData});

      const userObj = {
        name: data.user.nome,
        email: data.user.email,
        profileId: data.user.perfil
      }

      login(userObj, data.token)

      router.push('/admin');
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
            value={loginData.email}
            type='email'
            onChange={handleChange}
          />
          <Input
            name='password'
            label="Senha"
            value={loginData.password}
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
