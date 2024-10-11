import Sidebar from "@/components/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dom Fonseca Barbearia",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, [])

    // if(isClient == false) {
    //     return <Loading></Loading>
    // }

    // if(isClient) {
    //     if(user == null || user.perfil.perfilId != 1) {
    //         return <NaoAutorizado></NaoAutorizado>
    //     }
    // }


  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        {children}
      </div>
  </div>
  )
}
