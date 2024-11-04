'use client';

import React, { useState, useEffect } from 'react';

interface ApplianceProps {
    name: string;
    minCurrent: number;
    maxCurrent: number;
    minPower: number;
    maxPower: number;
    frequency: number;
    onToggle: (name: string, isOn: boolean, power: number) => void;
}

const Appliance: React.FC<ApplianceProps> = ({ name, minCurrent, maxCurrent, minPower, maxPower, frequency, onToggle }) => {
    const [isOn, setIsOn] = useState(false);
    const [power, setPower] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        const newPower = newState ? Math.random() * (maxPower - minPower) + minPower : 0;
        setPower(newPower);
        onToggle(name, newState, newPower);
    };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p>Corrente: {minCurrent} - {maxCurrent}A</p>
            <p>Potência: {minPower} - {maxPower}W</p>
            <p>Frequência: {frequency}Hz</p>
            <p>Estado: <span className={isOn ? "text-green-600" : "text-red-600"}>{isOn ? "Ligado" : "Desligado"}</span></p>
            <p>Consumo Atual: {isOn ? power.toFixed(2) : 0}W</p>
            <button
                onClick={handleToggle}
                className={`mt-2 px-4 py-2 rounded ${isOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
                {isOn ? 'Desligar' : 'Ligar'}
            </button>
        </div>
    );
};

const Appliances: React.FC<{ onApplianceToggle: (name: string, isOn: boolean, power: number) => void }> = ({ onApplianceToggle }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Appliance name="Microondas" minCurrent={4.5} maxCurrent={6.5} minPower={800} maxPower={1500} frequency={60} onToggle={onApplianceToggle} />
            <Appliance name="Chuveiro Elétrico" minCurrent={27} maxCurrent={36} minPower={5500} maxPower={7500} frequency={60} onToggle={onApplianceToggle} />
            <Appliance name="Ar Condicionado" minCurrent={4} maxCurrent={6} minPower={750} maxPower={1300} frequency={60} onToggle={onApplianceToggle} />
            <Appliance name="Computador" minCurrent={1} maxCurrent={3} minPower={200} maxPower={500} frequency={60} onToggle={onApplianceToggle} />
            <Appliance name="Televisão" minCurrent={0.5} maxCurrent={1} minPower={90} maxPower={150} frequency={60} onToggle={onApplianceToggle} />
            <Appliance name="Geladeira" minCurrent={1} maxCurrent={2} minPower={100} maxPower={200} frequency={60} onToggle={onApplianceToggle} />
        </div>
    );
};

export default Appliances;