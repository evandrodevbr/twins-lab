'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Appliances from './Appliances';

interface HistoryItem {
  voltage: number;
  current: number;
  frequency: number;
  timestamp: number;
  appliances: { [key: string]: { isOn: boolean; power: number } };
}

interface Appliance {
  isOn: boolean;
  power: number;
}

const generateData = () => ({
  voltage: 220.0,
  current: 20.0,
  frequency: 60.0,
});

const EnergyMonitor: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentData, setCurrentData] = useState(generateData());
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [appliances, setAppliances] = useState<{ [key: string]: Appliance }>({});

  const colors = ['#8884d8', '#82ca9d', '#ff7300', '#ff0000', '#00ff00'];

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      const newData = generateData();
      setCurrentData(newData);
      setHistory(prev => {
        const newHistory = [...prev, { ...newData, timestamp: Date.now(), appliances }];
        return newHistory.slice(-10);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [appliances]);

  const handleApplianceToggle = (name: string, isOn: boolean, power: number) => {
    setAppliances(prev => ({
      ...prev,
      [name]: { isOn, power }
    }));
  };

  const totalAppliancePower = Object.values(appliances).reduce((sum, appliance) => sum + (appliance.isOn ? appliance.power : 0), 0);
  const power = currentData.voltage * currentData.current - totalAppliancePower;

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sistema de Energia com Eletrodomésticos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Valores Atuais</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Tensão:</p>
              <p className="text-2xl">{currentData.voltage.toFixed(2)} V</p>
            </div>
            <div>
              <p className="font-medium">Corrente:</p>
              <p className="text-2xl">{currentData.current.toFixed(2)} A</p>
            </div>
            <div>
              <p className="font-medium">Frequência:</p>
              <p className="text-2xl">{currentData.frequency.toFixed(2)} Hz</p>
            </div>
            <div>
              <p className="font-medium">Potência Gerada:</p>
              <p className="text-2xl">{(currentData.voltage * currentData.current).toFixed(2)} W</p>
            </div>
            <div>
              <p className="font-medium">Consumo dos Eletrodomésticos:</p>
              <p className="text-2xl">{totalAppliancePower.toFixed(2)} W</p>
            </div>
            <div>
              <p className="font-medium">Potência Líquida:</p>
              <p className="text-2xl">{power.toFixed(2)} W</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gráfico de Potência</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
              <Legend />
              <Line type="monotone" dataKey="voltage" stroke="#8884d8" name="Tensão (V)" />
              <Line type="monotone" dataKey="current" stroke="#82ca9d" name="Corrente (A)" />
              {Object.keys(appliances).map((appliance, index) => (
                <Line
                  key={appliance}
                  type="monotone"
                  dataKey={`appliances.${appliance}.power`}
                  stroke={colors[index % colors.length]}
                  name={`${appliance} (W)`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Eletrodomésticos</h2>
        <Appliances onApplianceToggle={handleApplianceToggle} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Histórico</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Horário</th>
                <th className="px-4 py-2">Tensão (V)</th>
                <th className="px-4 py-2">Corrente (A)</th>
                <th className="px-4 py-2">Frequência (Hz)</th>
                <th className="px-4 py-2">Potência Gerada (W)</th>
                <th className="px-4 py-2">Consumo Eletrodomésticos (W)</th>
                <th className="px-4 py-2">Potência Líquida (W)</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">Sem dados disponíveis</td>
                </tr>
              ) : (
                history.map((item, index) => {
                  const appliancePower = Object.values(item.appliances).reduce((sum, appliance) => sum + (appliance.isOn ? appliance.power : 0), 0);
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="px-4 py-2">{new Date(item.timestamp).toLocaleTimeString()}</td>
                      <td className="px-4 py-2">{item.voltage.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.current.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.frequency.toFixed(2)}</td>
                      <td className="px-4 py-2">{(item.voltage * item.current).toFixed(2)}</td>
                      <td className="px-4 py-2">{appliancePower.toFixed(2)}</td>
                      <td className="px-4 py-2">{(item.voltage * item.current - appliancePower).toFixed(2)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;