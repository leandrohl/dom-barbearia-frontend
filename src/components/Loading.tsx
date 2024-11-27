"use client"

import { useLoading } from '@/context/LoadingContext';
import React from 'react';

const Loading: React.FC = () => {
  const { loading } = useLoading()

  if (!loading) return <></>

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
