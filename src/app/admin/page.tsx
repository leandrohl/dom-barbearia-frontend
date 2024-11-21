"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import PieChart from '@/components/Chart';
import { useEffect, useState } from 'react';
import { IEmployee } from '@/@types/employee';
import api from '@/services/api';
import Select from '@/components/Select';
import { ICommandWithStatistics } from '@/@types/command';

export default function HomeAdmin() {
  const [data, setData] = useState<ICommandWithStatistics | null>();
  const [employeeSelected, setEmployeeSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);

    try {
      const data = await api.get("/employees");
      setEmployees(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const filterEmployees = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/command/statistics?startDate=${startDate}&endDate=${finalDate}&employeeId=${employeeSelected}`);
      setData(data);
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    filterEmployees();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20">
      <header className="w-full">
        <h1 className="text-2xl font-bold mb-10 text-primary">Relatório Geral</h1>
      </header>

      <main className="flex flex-col w-full">
        <div className="flex gap-4 mb-4">
          <Select
            name='employee'
            label='Funcionário'
            variant='secondary'
            value={employeeSelected}
            onChange={(e) => {
              setEmployeeSelected(e.target.value)
            }}
            options={employees.map(employee => ({
              value: employee.id,
              label: employee.nome
            }))}
            className='w-2/4'
          />
          <Input
            name='startDate'
            type="date"
            label="Data inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            variant='secondary'
            className='w-1/4'
          />
          <Input
            name='finalDate'
            type="date"
            label="Data final"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
            variant='secondary'
            className='w-1/4'
          />
          <div className='flex items-center'>
            <Button
              variant='primary'
              onClick={() =>  filterEmployees()}
            >
              {loading ? 'Carregando...' : 'Filtrar'}
            </Button>
          </div>
        </div>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
          <PieChart
            title='Classificação de Clientes'
            labels={['Excelente', "Ótimo", "Regular", "Ruim"]}
            data={[
              data?.classificacaoDosClientes.Excelente || 0,
              data?.classificacaoDosClientes.Otimo || 0,
              data?.classificacaoDosClientes.Regular || 0,
              data?.classificacaoDosClientes.Ruim || 0,
            ]}
            colors={["#808080", "#4682B4", "#556B2F", "#4d2703"]}
            type='Pie'
          />
          <PieChart
            title='Retorno de Clientes'
            labels={['Novos', "Retorno"]}
            data={[
              data?.novosRetornos.novos || 0,
              data?.novosRetornos.retorno || 0,
            ]}
            colors={["#808080", "#4682B4"]}
             type='Pie'
          />
          <PieChart
            title='Distribuição de Faturamento'
            labels={['Produtos', "Serviços", "Total"]}
            data={[
              data?.faturamento.produtos || 0,
              data?.faturamento.servicos || 0,
              data?.faturamento.total || 0,
            ]}
            colors={["#808080", "#4682B4", "#556B2F"]}
            type='Line'
          />
        </section>
      </main>
    </div>
  );
}
