"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  FaBars,
  FaQuestionCircle,
  FaChevronDown,
  FaChartLine,
  FaChartBar,
  FaChartArea,
  FaFilePdf,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import Tooltip from "@mui/material/Tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from "chart.js";
import Image from "next/image";
import { Line, Bar } from "react-chartjs-2";

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [propriedadesAvancadas, setPropriedadesAvancadas] = useState(false);
  const [tipoGrafico, setTipoGrafico] = useState<"linha" | "barra" | "area">(
    "linha"
  );
  const [dados, setDados] = useState({
    tensao: "",
    corrente: "",
    potencia: "",
    frequencia: "",
    potenciaAtiva: "",
    potenciaReativa: "",
    fatorPotencia: "",
    demanda: "",
    thdTensao: "",
    thdCorrente: "",
    potenciaCalculada: "",
  });
  const [arquivoPdf, setArquivoPdf] = useState<File | null>(null);

  const alternarMenu = useCallback(() => setMenuAberto((prev) => !prev), []);

  const alternarPropriedadesAvancadas = useCallback(
    () => setPropriedadesAvancadas((prev) => !prev),
    []
  );

  const handleInputChange = (campo: string, valor: string) => {
    // Regex melhorada para validação de números com decimais
    const numeroRegex = /^-?\d*\.?\d*$/;

    if (!numeroRegex.test(valor) && valor !== "") {
      return;
    }

    setDados((prev) => {
      const novosDados = { ...prev, [campo]: valor };

      // Calcular potência apenas se ambos os valores existirem
      const tensao = parseFloat(campo === "tensao" ? valor : prev.tensao);
      const corrente = parseFloat(campo === "corrente" ? valor : prev.corrente);

      if (!isNaN(tensao) && !isNaN(corrente)) {
        novosDados.potenciaCalculada = (tensao * corrente).toFixed(2);
      } else {
        novosDados.potenciaCalculada = "";
      }

      return novosDados;
    });
  };

  const dadosGrafico = {
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: "Forma de Onda",
        data: Array.from({ length: 50 }, (_, i) => Math.sin(i / 5) * 100),
        borderColor: "#FF6B00",
        backgroundColor:
          tipoGrafico === "area" ? "rgba(255, 107, 0, 0.2)" : undefined,
        fill: tipoGrafico === "area",
        tension: 0.4,
      },
    ],
  };

  const opcoesGrafico = useMemo(
    () => ({
      responsive: true,
      plugins: {
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "xy",
          },
        },
      },
      scales: {
        x: {
          grid: { color: "#f0f0f0" },
          title: {
            display: true,
            text: "Tempo (ms)",
          },
        },
        y: {
          grid: { color: "#f0f0f0" },
          title: {
            display: true,
            text: "Amplitude",
          },
        },
      },
    }),
    []
  );

  const validarPdf = (arquivo: File | null): boolean => {
    if (!arquivo) return false;
    return (
      arquivo.type === "application/pdf" && arquivo.size <= 10 * 1024 * 1024
    ); // Limite de 10MB
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const arquivo = e.dataTransfer.files[0];
    if (validarPdf(arquivo)) {
      setArquivoPdf(arquivo);
    } else {
      alert("Por favor, selecione um arquivo PDF válido (máximo 10MB)");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (validarPdf(arquivo)) {
      setArquivoPdf(arquivo);
    } else {
      alert("Por favor, selecione um arquivo PDF válido (máximo 10MB)");
    }
  };

  const handleUpload = async () => {
    if (!arquivoPdf) return;

    try {
      // Exemplo de implementação do upload
      const formData = new FormData();
      formData.append("pdf", arquivoPdf);

      // Substituir com sua URL de API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha no upload");

      alert("Upload realizado com sucesso!");
      setArquivoPdf(null);
    } catch (erro) {
      console.error("Erro no upload:", erro);
      alert("Erro ao fazer upload do arquivo");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/icone_apolo.png"
              alt="Apolo Lab Logo" 
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-2xl font-bold text-[#FF6B00]">Apolo Lab</h1>
          </div>
          <button onClick={alternarMenu} className="md:hidden">
            <FaBars className="text-2xl" />
          </button>
          <nav className={`${menuAberto ? "block" : "hidden"} md:block`}>
            <ul className="md:flex space-x-6 text-gray-600">
              <li className="cursor-pointer hover:text-[#FF6B00] transition-colors">
                Dashboard
              </li>
              <li className="cursor-pointer hover:text-[#FF6B00] transition-colors">
                Circuitos
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-5 gap-6">
          {/* Área do Gráfico */}
          <div className="md:col-span-3 space-y-4">
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
            <div className="mt-4 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">Upload de PDF</h3>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#FF6B00] transition-colors"
              >
                <div className="space-y-4">
                  <FaFilePdf className="mx-auto text-6xl text-gray-400" />
                  <p className="text-gray-600">
                    Arraste e solte seu PDF aqui ou
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="inline-block px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  >
                    Selecione um arquivo
                  </label>
                  {arquivoPdf && (
                    <p className="text-sm text-gray-600">
                      Arquivo selecionado: {arquivoPdf.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!arquivoPdf}
                className={`mt-4 w-full p-2 rounded-lg ${
                  arquivoPdf
                    ? "bg-[#FF6B00] text-white hover:bg-[#FF5500]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                } transition-colors`}
              >
                Enviar PDF
              </button>
            </div>
          </div>

          {/* Painel de Propriedades */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Propriedades do Circuito
            </h2>

            <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
              {/* Propriedades Básicas */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="220V"
                      value={dados.tensao}
                      onChange={(e) =>
                        handleInputChange("tensao", e.target.value)
                      }
                      className="w-full p-2 rounded-lg border border-gray-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none"
                    />
                    <Tooltip
                      title="Diferença de potencial elétrico entre dois pontos"
                      arrow
                    >
                      <div className="text-gray-400 hover:text-gray-600 cursor-help">
                        <FaQuestionCircle />
                      </div>
                    </Tooltip>
                  </div>
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Tensão
                  </label>
                </div>

                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="10A"
                      value={dados.corrente}
                      onChange={(e) =>
                        handleInputChange("corrente", e.target.value)
                      }
                      className="w-full p-2 rounded-lg border border-gray-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none"
                    />
                    <Tooltip title="Fluxo de elétrons em um condutor" arrow>
                      <div className="text-gray-400 hover:text-gray-600 cursor-help">
                        <FaQuestionCircle />
                      </div>
                    </Tooltip>
                  </div>
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Corrente
                  </label>
                </div>

                {dados.potenciaCalculada && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-lg text-center">
                    <span className="text-gray-700">
                      Potência Calculada: {dados.potenciaCalculada} W
                    </span>
                  </div>
                )}

                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="60Hz"
                      value={dados.frequencia}
                      onChange={(e) =>
                        handleInputChange("frequencia", e.target.value)
                      }
                      className="w-full p-2 rounded-lg border border-gray-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none"
                    />
                    <Tooltip title="Frequência da rede elétrica" arrow>
                      <div className="text-gray-400 hover:text-gray-600 cursor-help">
                        <FaQuestionCircle />
                      </div>
                    </Tooltip>
                  </div>
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                    Frequência
                  </label>
                </div>
              </div>

              {/* Botão Propriedades Avançadas */}
              <button
                onClick={alternarPropriedadesAvancadas}
                className="w-full mt-4 p-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                <span>Propriedades Avançadas</span>
                <FaChevronDown
                  className={`transform transition-transform ${
                    propriedadesAvancadas ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Propriedades Avançadas */}
              <div
                className={`space-y-4 overflow-hidden transition-all duration-300 ${
                  propriedadesAvancadas ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {[
                  {
                    campo: "potenciaAtiva",
                    label: "Potência Ativa",
                    placeholder: "2000W",
                    tooltip: "Potência real consumida pela carga",
                  },
                  {
                    campo: "potenciaReativa",
                    label: "Potência Reativa",
                    placeholder: "500VAR",
                    tooltip: "Potência não convertida em trabalho",
                  },
                  {
                    campo: "fatorPotencia",
                    label: "Fator de Potência",
                    placeholder: "0.92",
                    tooltip: "Relação entre potência ativa e aparente",
                  },
                  {
                    campo: "thdTensao",
                    label: "THD Tensão",
                    placeholder: "3%",
                    tooltip: "Distorção harmônica total da tensão",
                  },
                  {
                    campo: "thdCorrente",
                    label: "THD Corrente",
                    placeholder: "5%",
                    tooltip: "Distorção harmônica total da corrente",
                  },
                ].map((prop) => (
                  <div key={prop.campo} className="relative">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={prop.placeholder}
                        value={dados[prop.campo as keyof typeof dados]}
                        onChange={(e) =>
                          handleInputChange(prop.campo, e.target.value)
                        }
                        className="w-full p-2 rounded-lg border border-gray-300 focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] outline-none"
                      />
                      <Tooltip title={prop.tooltip} arrow>
                        <div className="text-gray-400 hover:text-gray-600 cursor-help">
                          <FaQuestionCircle />
                        </div>
                      </Tooltip>
                    </div>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                      {prop.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
