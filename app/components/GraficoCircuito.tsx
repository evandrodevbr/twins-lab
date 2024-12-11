'use client'

import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import React from 'react'
import { FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa'
import dynamic from 'next/dynamic'

// Carregamento dinâmico dos componentes do Chart.js
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false,
})

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), {
  ssr: false,
})

// Definindo interfaces para os tipos de dados do gráfico
interface DadosGrafico {
  labels: number[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor?: string
    fill?: boolean
    tension?: number
  }[]
}

interface OpcoesGrafico {
  responsive: boolean
  plugins: {
    legend: {
      display: boolean
    }
  }
  scales: {
    x: {
      grid: { color: string }
      title: {
        display: boolean
        text: string
      }
    }
    y: {
      grid: { color: string }
      title: {
        display: boolean
        text: string
      }
    }
  }
}

interface GraficoCircuitoProps {
  tipoGrafico: 'linha' | 'barra' | 'area'
  setTipoGrafico: (tipo: 'linha' | 'barra' | 'area') => void
  dadosGrafico: DadosGrafico
  opcoesGrafico: OpcoesGrafico
}

export default function GraficoCircuito({
  tipoGrafico,
  setTipoGrafico,
  dadosGrafico,
  opcoesGrafico,
}: GraficoCircuitoProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend
      )
      setIsClient(true)
    }
  }, [])

  if (!isClient) {
    return null // ou um componente de loading
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Visualização do Circuito
        </h2>
        <div className='flex space-x-2'>
          <button
            onClick={() => setTipoGrafico('linha')}
            className={`p-2 rounded ${
              tipoGrafico === 'linha'
                ? 'bg-[#FF6B00] text-white'
                : 'bg-gray-200'
            }`}
          >
            <FaChartLine />
          </button>
          <button
            onClick={() => setTipoGrafico('barra')}
            className={`p-2 rounded ${
              tipoGrafico === 'barra'
                ? 'bg-[#FF6B00] text-white'
                : 'bg-gray-200'
            }`}
          >
            <FaChartBar />
          </button>
          <button
            onClick={() => setTipoGrafico('area')}
            className={`p-2 rounded ${
              tipoGrafico === 'area' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200'
            }`}
          >
            <FaChartArea />
          </button>
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4 h-[500px]'>
        {tipoGrafico === 'barra' ? (
          <Bar data={dadosGrafico} options={opcoesGrafico} />
        ) : (
          <Line data={dadosGrafico} options={opcoesGrafico} />
        )}
      </div>
    </div>
  )
}
