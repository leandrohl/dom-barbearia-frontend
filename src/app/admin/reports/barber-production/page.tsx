"use client";

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import api from '@/services/api';
import Input from '@/components/Input';
import { IEmployeeWithStatistics } from '@/@types/employee';
import { useReactToPrint } from 'react-to-print';
import { useLoading } from '@/context/LoadingContext';
import toast from 'react-hot-toast';
import MaskService from '@/helpers/masks';

export default function BarberProduction() {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [employees, setEmployees] = useState<IEmployeeWithStatistics[]>([]);
  const { startLoading, stopLoading } = useLoading()

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const filterEmployees = async () => {
    if (new Date(finalDate) <= new Date(startDate)) {
      toast.error('A data final deve ser maior que a data inicial!');
      return;
    }

    startLoading();
    try {
      const data = await api.get(`/employees/statistics?startDate=${startDate}&endDate=${finalDate}`);
      setEmployees(data);
    } catch {
      toast.error('Erro ao buscar dados relatório. Tente novamente mais tarde!');
    } finally {
      stopLoading();
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    filterEmployees();
  }, []);


  return (
    <div className="flex h-screen" ref={contentRef}>
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Produção de Barbeiros</h1>

        <div className="flex justify-end mb-4 print:hidden">
          <Button onClick={reactToPrintFn} variant="primary">Exportar Relatório</Button>
        </div>

        <div className="flex gap-4 mb-4 print:hidden">
          <Input
            name='searchName'
            type="text"
            label="Pesquisar funcionário"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant='secondary'
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
              onClick={() => filterEmployees()}
            >
              Filtrar
            </Button>
          </div>
        </div>
        <div>
          <table className="min-w-full bg-white border border-gray-300 text-primary">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Nome do Funcionário</th>
                <th className="border border-gray-300 p-2">Quantidade de Atendimentos</th>
                <th className="border border-gray-300 p-2">Clientes Novatos</th>
                <th className="border border-gray-300 p-2">Clientes (Excelente)</th>
                <th className="border border-gray-300 p-2">Clientes (Otimo)</th>
                <th className="border border-gray-300 p-2">Clientes (Regular)</th>
                <th className="border border-gray-300 p-2">Clientes (Ruim)</th>
                <th className="border border-gray-300 p-2">Faturamento Total</th>
              </tr>
            </thead>
            <tbody>
              {(
                filteredEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td className="border border-gray-300 p-2">{employee.id}</td>
                    <td className="border border-gray-300 p-2">{employee.nome}</td>
                    <td className="border border-gray-300 p-2">{employee.totalComandas}</td>
                    <td className="border border-gray-300 p-2">{employee.clientesNovos}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Excelente}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Otimo}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Regular}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Ruim}</td>
                    <td className="border border-gray-300 p-2">{MaskService.maskMoney( employee.faturamentoTotal)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
