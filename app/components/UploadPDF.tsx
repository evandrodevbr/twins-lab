'use client'

import React, { useState } from 'react'
import { FaFilePdf } from 'react-icons/fa'

export default function UploadPDF() {
  const [arquivoPdf, setArquivoPdf] = useState<File | null>(null)

  const validarPdf = (arquivo: File | null): boolean => {
    if (!arquivo) return false
    return (
      arquivo.type === 'application/pdf' && arquivo.size <= 10 * 1024 * 1024
    )
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const arquivo = e.dataTransfer.files[0]
    if (validarPdf(arquivo)) {
      setArquivoPdf(arquivo)
    } else {
      alert('Por favor, selecione um arquivo PDF válido (máximo 10MB)')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (arquivo && validarPdf(arquivo)) {
      setArquivoPdf(arquivo)
    } else {
      alert('Por favor, selecione um arquivo PDF válido (máximo 10MB)')
    }
  }

  const handleUpload = async () => {
    // ... lógica de upload existente ...
  }

  return (
    <div className='mt-4 bg-white rounded-lg shadow-md p-4'>
      <h3 className='text-lg font-semibold mb-4'>Upload de PDF</h3>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'
      >
        <FaFilePdf className='mx-auto text-4xl text-gray-400 mb-2' />
        <p className='text-gray-600 mb-2'>
          Arraste e solte seu arquivo PDF aqui ou
        </p>
        <input
          type='file'
          accept='.pdf'
          onChange={handleFileChange}
          className='hidden'
          id='pdf-upload'
        />
        <label
          htmlFor='pdf-upload'
          className='bg-[#FF6B00] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#E66000] transition-colors'
        >
          Selecione um arquivo
        </label>
        {arquivoPdf && (
          <div className='mt-4'>
            <p className='text-green-600'>
              Arquivo selecionado: {arquivoPdf.name}
            </p>
            <button
              onClick={handleUpload}
              className='mt-2 bg-[#FF6B00] text-white px-4 py-2 rounded hover:bg-[#E66000] transition-colors'
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
