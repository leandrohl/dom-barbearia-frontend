"use client";

import Button from '@/components/Button';
import Input from '@/components/Input';
import PieChart from '@/components/Chart';
import { useEffect, useRef, useState } from 'react';
import { IEmployee } from '@/@types/employee';
import api from '@/services/api';
import Select from '@/components/Select';
import { ICommandWithStatistics } from '@/@types/command';
import { useReactToPrint } from 'react-to-print';
import { useLoading } from '@/context/LoadingContext';
import toast from 'react-hot-toast';

export default function HomeAdmin() {
  const [data, setData] = useState<ICommandWithStatistics | null>();
  const [employeeSelected, setEmployeeSelected] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { startLoading, stopLoading } = useLoading()

  const fetchEmployees = async () => {
    startLoading();

    try {
      const data = await api.get("/employees");
      setEmployees(data);
    } catch {
    } finally {
      stopLoading();
    }
  }

  const filterEmployees = async () => {
    if (new Date(finalDate) <= new Date(startDate)) {
      toast.error('A data final deve ser maior que a data inicial!');
      return;
    }

    startLoading();
    try {
      const data = await api.get(`/command/statistics?startDate=${startDate}&endDate=${finalDate}&employeeId=${employeeSelected}`);
      setData(data);
    } catch {
      toast.error('Erro ao filtrar relatório. Tente novamente mais tarde!');
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchEmployees();
    filterEmployees();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20" ref={contentRef}>
      <header className="flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-10 text-primary">Relatório Geral</h1>

        <div className=" print:hidden">
          <Button onClick={reactToPrintFn} variant="primary">Exportar Relatório</Button>
        </div>
      </header>



      <main className="flex flex-col w-full">
        <div className="flex gap-4 mb-4 print:hidden">
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
              Filtrar
            </Button>
          </div>
        </div>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
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
        </section>
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
      </main>
    </div>
  );
}
