import React, { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </AuthProvider>
  );
};

export default AppProviders;
