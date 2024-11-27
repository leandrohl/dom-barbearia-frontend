"use client"

import Sidebar from "@/components/SideBar";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100 min-h-screen">
        {children}
      </div>
  </div>
  )
}
