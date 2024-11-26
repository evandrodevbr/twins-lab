# 🧪 Twins-Lab

## 🚀 Instruções de Instalação

Siga os passos abaixo para configurar e executar o projeto:

1. **Instalar o Node.js**

   - Baixe o instalador pré-compilado do Node.js a partir do [🌐 site oficial](https://nodejs.org/en/download/prebuilt-installer).
   - Siga as instruções de instalação para o seu sistema operacional.

2. **Clonar o Repositório**

   - Abra o terminal ou prompt de comando.
   - Execute o seguinte comando para clonar o projeto na branch `master`:

     ```bash
     git clone -b master https://github.com/evandrodevbr/twins-lab.git
     ```

3. **Instalar Dependências**

   - Navegue até a pasta do projeto clonado:

     ```bash
     cd twins-lab
     ```

   - Instale as dependências necessárias:

     ```bash
     npm install
     ```

4. **Executar o Projeto**

   - Inicie o servidor de desenvolvimento:

     ```bash
     npm run dev
     ```

   - Uma página **localhost** será aberta com o código rodando.

---

## 🎯 Objetivos e Próximos Passos do Projeto

### 🥅 Objetivo Inicial

Meu principal objetivo é alcançar um resultado exato, ou o mais próximo possível da exatidão, na simulação—principalmente em termos de frequência—dos aparelhos que serão utilizados. Quero fazer isso usando apenas **três dados**: **tensão**, **corrente** e **potência**. Admito que, no auge da minha ignorância, desconheço o caminho necessário para alcançar esse objetivo.

### 🔧 Melhorias nos Cálculos de Potência

Desejo aprimorar os cálculos de potência das máquinas utilizando fórmulas matemáticas mais refinadas. Para isso, pretendo:

- **Usar cálculos que considerem métricas físicas**, como:

  - **Tamanho da hélice** (normal, radial ou tangencial)
  - **Peso da hélice**
  - **Força necessária para iniciar o funcionamento**, considerando a resistência do ar relativa aos diferentes tamanhos

Reconhecendo essas propriedades e desenvolvendo a fórmula adequada, espero obter um resultado em **Newtons (N)**. A partir disso, realizarei outro cálculo para converter esse valor na **potência elétrica necessária para o funcionamento inicial**—especialmente o pico de potência dos motores em aparelhos que contêm hélices, como ar-condicionado.

### 💻 Aplicação no Código

Após ter essas fórmulas reconhecidas e funcionais, pretendo aplicá-las no código. Planejo **categorizar esse tipo de cálculo por tipo de produto**, de modo a aplicar a fórmula adequada para cada um.

---
