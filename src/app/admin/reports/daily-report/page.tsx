"use client";

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import api from '@/services/api';
import Input from '@/components/Input';
import { IEmployee, IEmployeeWithStatistics } from '@/@types/employee';
import Select from '@/components/Select';
import { IClientWithStatistics } from '@/@types/client';
import { classifications } from '@/content/classifications';
import { useReactToPrint } from 'react-to-print';
import { useLoading } from '@/context/LoadingContext';
import toast from 'react-hot-toast';
import MaskService from '@/helpers/masks';
import { formatDate } from '@/helpers/date';

export default function DailyReport() {
  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState('');
  const [typeSelected, setTypeSelected] = useState('Barbearia');
  const [reportClients, setReportClients] = useState<IClientWithStatistics[]>([]);
  const [reportEmployees, setReportEmployees] = useState<IEmployeeWithStatistics[]>([]);

  const { startLoading, stopLoading } = useLoading()

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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

  const fetchReportEmployees = async () => {
    startLoading();
    try {
      const data = await api.get(`/employees/statistics?startDate=${date}&endDate=${date}`);
      setReportEmployees(data);
    } catch {
      toast.error('Erro ao buscar dados relatório. Tente novamente mais tarde!');
    } finally {
      stopLoading();
    }
  };

  const fetchReportClients = async () => {
    startLoading();
    try {
      const data = await api.get(`/client/classification?date=${date}&employeeId=${employeeSelected}`);
      setReportClients(data);
    } catch {
      toast.error('Erro ao buscar dados relatório. Tente novamente mais tarde!');
    } finally {
      stopLoading();
    }
  };

  const filterReports = async () => {
    if (typeSelected === "Barbearia") {
      await fetchReportEmployees();
    } else {
      await fetchReportClients();
    }
  }

  useEffect(() => {
    fetchEmployees();
    filterReports();
  }, []);

  const renderReports = () => {
    if (typeSelected === 'Barbearia') {
      return (
        <table className="min-w-full bg-white border border-gray-300 text-primary">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nome do Funcionário</th>
              <th className="border border-gray-300 p-2">Quantidade de Atendimentos</th>
              <th className="border border-gray-300 p-2">Clientes Novatos</th>
              <th className="border border-gray-300 p-2">Clientes (Excelente)</th>
              <th className="border border-gray-300 p-2">Clientes (Ótimo)</th>
              <th className="border border-gray-300 p-2">Clientes (Regular)</th>
              <th className="border border-gray-300 p-2">Clientes (Ruim)</th>
              <th className="border border-gray-300 p-2">Faturamento Total</th>
            </tr>
          </thead>
          <tbody>
            {(
              reportEmployees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center p-4">Nenhum dado encontrado.</td>
                </tr>
              ) : (
                reportEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border border-gray-300 p-2">{employee.id}</td>
                    <td className="border border-gray-300 p-2">{employee.nome}</td>
                    <td className="border border-gray-300 p-2">{employee.totalComandas}</td>
                    <td className="border border-gray-300 p-2">{employee.clientesNovos}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Excelente}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Otimo}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Regular}</td>
                    <td className="border border-gray-300 p-2">{employee.classificacaoDosClientes.Ruim}</td>
                    <td className="border border-gray-300 p-2">{MaskService.maskMoney(employee.faturamentoTotal)}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        )
      } else {
        return (
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
              {(
                reportClients.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center p-4 text-primary">Nenhum dado encontrado.</td>
                  </tr>
                ) : (
                  reportClients.map(client => (
                    <tr key={client.id}>
                      <td className="border border-gray-300 p-2">{client.id}</td>
                      <td className="border border-gray-300 p-2">{client.nome}</td>
                      <td className="border border-gray-300 p-2">
                        <div className='flex items-center'>
                          <span
                            className="block w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: classifications.find(c => c.name === client.classificacao)?.color }}
                          ></span>
                          {client.classificacao}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">{client.frequenciaVisitas}</td>
                      <td className="border border-gray-300 p-2">{MaskService.maskMoney(client.valorGastoTotal)}</td>
                      <td className="border border-gray-300 p-2">{formatDate(client.ultimaVisita)}</td>
                    </tr>
                  ))
                )
              )}
          </tbody>
        </table>
      )
    }
  }

  return (
    <div className="flex h-screen" ref={contentRef}>
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-primary">Produção Diária</h1>

        <div className="flex justify-end mb-4 print:hidden">
          <Button onClick={reactToPrintFn} variant="primary">Exportar Relatório</Button>
        </div>

        <div className="flex gap-4 mb-4 print:hidden">
         <Select
            name='option'
            label='Tipo'
            variant='secondary'
            value={typeSelected}
            onChange={(e) => {
              setTypeSelected(e.target.value)
            }}
            options={["Barbearia", "Barbeiro"].map(option => ({
              value: option,
              label: option
            }))}
            className={typeSelected === "Barbearia" ? "w-3/4" : "w-2/4"}
          />
          { typeSelected === 'Barbeiro' && (
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
          )}
          <Input
            name="date"
            type="date"
            label="Dia"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant='secondary'
            className='w-1/4'
          />
          <div className='flex items-center'>
            <Button
              variant='primary'
              onClick={() => filterReports()}
            >
              Filtrar
            </Button>
          </div>
        </div>
        {renderReports()}
      </div>
    </div>
  );
}
