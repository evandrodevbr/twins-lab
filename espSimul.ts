import axios from 'axios';

interface DadosCircuito {
  nomecircuito: string;
  tensao: number;
  corrente: number;
  tempCabo: number;
  token: string;
  avaliable: boolean;
}

// Função para gerar números aleatórios dentro de um intervalo
function gerarNumeroAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para enviar dados para a API
async function enviarDados() {
  try {
    // Criando dados simulados
    const dadosCircuito: DadosCircuito = {
      nomecircuito: "Circuito Simulado",
      tensao: gerarNumeroAleatorio(110, 130),
      corrente: gerarNumeroAleatorio(1, 20),
      tempCabo: gerarNumeroAleatorio(25, 85),
      token: "circuito_simulado_001",
      avaliable: true
    };

    // Enviando dados para a API
    const response = await axios.post('http://localhost:3000/api/dados', dadosCircuito);
    console.log('Dados enviados com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    // Não deixa o erro interromper a execução
  }
}

// Função principal que mantém o programa rodando
async function executarSimulacao() {
  while (true) {
    await enviarDados();
    // Espera 1 segundo antes da próxima execução
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Inicia a simulação
console.log('Iniciando simulação de envio de dados...');
console.log('Pressione Ctrl+C para interromper a simulação');

executarSimulacao().catch(console.error);

// Captura Ctrl+C para encerrar graciosamente
process.on('SIGINT', () => {
  console.log('\nSimulação interrompida');
  process.exit(0);
});
