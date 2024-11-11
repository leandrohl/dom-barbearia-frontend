"use client";

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import api from '@/services/api';
import { IClientWithStatistics } from '@/@types/client';
import Input from '@/components/Input';
import Select from '@/components/Select';

export default function ClientClassification() {
  const [clients, setClients] = useState<IClientWithStatistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classificationSelected, setClassificationSelected] = useState('');

  const classifications = ["Excelente", "Ótimo", "Regular", "Ruim"];

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await api.get('/client/classification');
      setClients(data);
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Classificação de Clientes</h1>

        <div className="flex justify-end mb-4">
          <Button onClick={() => {}} variant="primary">Exportar Relatório</Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Input
            name='searchName'
            type="text"
            label="Pesquisar cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant='secondary'
            className='w-3/4'
          />
          <Select
            label='Classificação'
            name='classification'
            onChange={(e) => setClassificationSelected(e.target.value)}
            options={classifications.map(c => ({
              label: c,
              value: c
            }))}
            value={classificationSelected}
            variant='secondary'
            className='w-1/4'
          />
        </div>

        <table className="min-w-full bg-white border border-gray-300 text-primary">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome do Cliente</th>
              <th className="border border-gray-300 p-2">Classificação</th>
              <th className="border border-gray-300 p-2">Frequência de Visitas</th>
              <th className="border border-gray-300 p-2">Valor Gasto Total</th>
              <th className="border border-gray-300 p-2">Última Visita</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-4">Carregando...</td>
              </tr>
            ) : (
              filteredClients.map(client => (
                <tr key={client.id}>
                  <td className="border border-gray-300 p-2">{client.id}</td>
                  <td className="border border-gray-300 p-2">{client.nome}</td>
                  <td className="border border-gray-300 p-2">{client.classificacao}</td>
                  <td className="border border-gray-300 p-2">{client.frequenciaVisitas}</td>
                  <td className="border border-gray-300 p-2">{client.valorGastoTotal}</td>
                  <td className="border border-gray-300 p-2">{client.ultimaVisita}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
