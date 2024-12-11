"use client";

import React from "react";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";

interface GraficoCircuitoProps {
  tipoGrafico: "linha" | "barra" | "area";
  setTipoGrafico: (tipo: "linha" | "barra" | "area") => void;
  dadosGrafico: any;
  opcoesGrafico: any;
}

export default function GraficoCircuito({
  tipoGrafico,
  setTipoGrafico,
  dadosGrafico,
  opcoesGrafico
}: GraficoCircuitoProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Visualização do Circuito
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTipoGrafico("linha")}
            className={`p-2 rounded ${
              tipoGrafico === "linha"
                ? "bg-[#FF6B00] text-white"
                : "bg-gray-200"
            }`}
          >
            <FaChartLine />
          </button>
          <button
            onClick={() => setTipoGrafico("barra")}
            className={`p-2 rounded ${
              tipoGrafico === "barra"
                ? "bg-[#FF6B00] text-white"
                : "bg-gray-200"
            }`}
          >
            <FaChartBar />
          </button>
          <button
            onClick={() => setTipoGrafico("area")}
            className={`p-2 rounded ${
              tipoGrafico === "area"
                ? "bg-[#FF6B00] text-white"
                : "bg-gray-200"
            }`}
          >
            <FaChartArea />
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 h-[500px]">
        {tipoGrafico === "barra" ? (
          <Bar data={dadosGrafico} options={opcoesGrafico} />
        ) : (
          <Line data={dadosGrafico} options={opcoesGrafico} />
        )}
      </div>
    </div>
  );
} 