'use client'

import React, { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import Tooltip from '@mui/material/Tooltip'

interface DadosCircuito {
  tensao: string
  corrente: string
  resistencia: string
  potencia: string
  frequencia: string
}

export default function PropriedadesCircuito() {
  const [dados, setDados] = useState<DadosCircuito>({
    tensao: '',
    corrente: '',
    resistencia: '',
    potencia: '',
    frequencia: '',
  })

  const handleInputChange = (campo: keyof DadosCircuito, valor: string) => {
    setDados(prev => ({
      ...prev,
      [campo]: valor,
    }))
  }

  return (
    <div className='md:col-span-2 space-y-4 bg-white rounded-lg shadow-md p-4'>
      <h2 className='text-xl font-semibold text-gray-800'>
        Propriedades do Circuito
      </h2>
      <div className='space-y-4'>
        {Object.keys(dados).map(campo => (
          <div key={campo} className='flex items-center space-x-2'>
            <label className='w-1/3 text-gray-600 capitalize'>{campo}:</label>
            <input
              type='text'
              value={dados[campo as keyof DadosCircuito]}
              onChange={e =>
                handleInputChange(campo as keyof DadosCircuito, e.target.value)
              }
              className='flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B00]'
            />
            <Tooltip title={`Insira o valor de ${campo}`}>
              <div>
                <FaQuestionCircle className='text-gray-400' />
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  )
}
