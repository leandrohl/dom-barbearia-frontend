"use client"

import Sidebar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, [])

  if (isClient) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (!storedUser && !storedToken) {
      router.push('/login')
    }
  }

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        {children}
      </div>
  </div>
  )
}
