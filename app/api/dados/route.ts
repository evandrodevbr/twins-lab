import { NextResponse } from 'next/server';

// Tipo para os dados do circuito
interface DadosCircuito {
  nomecircuito: string;
  tensao: number;
  corrente: number;
  tempCabo: number;
  token: string;
  avaliable: boolean;
  ultimaAtualizacao?: number;
}

// Array para armazenar os dados (simulando um banco de dados)
const dadosCircuitos: DadosCircuito[] = [];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const dados: DadosCircuito = {
      nomecircuito: formData.get('nomecircuito') as string,
      tensao: Number(formData.get('tensao')),
      corrente: Number(formData.get('corrente')), 
      tempCabo: Number(formData.get('tempCabo')),
      token: formData.get('token') as string,
      avaliable: true
    };

    const tokenApi = process.env.TOKEN_API;

    // Validação do token da API
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== tokenApi) {
      return NextResponse.json(
        { erro: 'Token inválido ou não fornecido' },
        { status: 401 }
      );
    }

    // Validação básica dos dados
    if (!dados.nomecircuito || !dados.token) {
      return NextResponse.json(
        { erro: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verifica se já existe um circuito com o mesmo token
    const circuitoIndex = dadosCircuitos.findIndex(
      circuito => circuito.token === dados.token
    );

    const novosDados = {
      ...dados,
      avaliable: true,
      ultimaAtualizacao: Date.now()
    };

    if (circuitoIndex !== -1) {
      // Atualiza os dados do circuito existente
      dadosCircuitos[circuitoIndex] = novosDados;
    } else {
      // Adiciona novo circuito ao array
      dadosCircuitos.push(novosDados);
    }

    return NextResponse.json(
      { mensagem: 'Dados recebidos com sucesso' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    return NextResponse.json(
      { erro: 'Erro ao processar dados' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Marca circuitos inativos após 1 minuto sem atualização
    const agora = Date.now();
    dadosCircuitos.forEach(circuito => {
      if ((agora - circuito.ultimaAtualizacao!) > 60000) {
        circuito.avaliable = false;
      }
    });

    // Retorna todos os dados armazenados
    return NextResponse.json(dadosCircuitos);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return NextResponse.json(
      { erro: 'Erro ao buscar dados' },
      { status: 500 }
    );
  }
}
