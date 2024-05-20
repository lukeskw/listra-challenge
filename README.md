<h1 align="center">Listra Challenge</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]() <br>

</div>

---

## 📝 Índice <a name = "pt"></a>

- **[Sobre](#sobre)**
- **[Começando](#comecando)**
- **[Requisitos](#requisitos)**
- **[Tecnologias](#tecnologias_usadas)**
- **[TODO](#todo)**

## 📚 Sobre <a name = "sobre"></a>

Este é um desafio de código para a empresa \*. Criei um repositório único a partir de outros 2 para maior facilidade de entrega.

## 🏁 Começando <a name = "comecando"></a>

Estas instruções permitirão que você obtenha uma cópia do projeto e execute a aplicação localmente para fins de desenvolvimento e teste.

### Pré-requisitos

- Primeiro, você precisa ter o NodeJS instalado em sua máquina. Para fazer isso, acesse o site oficial do NodeJS clicando [aqui](https://nodejs.org/) e siga as instruções de instalação para o seu sistema operacional.<br />
- Depois, você também precisará ter o docker instalado

### Instalação

<details>
<summary>Backend</summary>

1. Clone o repositório usando o comando ou baixe o arquivo .zip e extraia o conteúdo:

   ```sh
   git clone https://github.com/lukeskw/listra-challenge.git
   ```

2. Acesse a pasta do projeto

3. Instale as dependências do projeto

   ```sh
      composer install
   ```

   > Recomendo a instalação de um alias para o Sail, [aqui](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias) está como fazer.

4. Copie e configure o env

   ```sh
    cp .env.example .env
   ```

5. Execute o sail

   ```sh
    sail up -d
   ```

6. Execute o comando de geração de chaves do Laravel

   ```sh
    sail artisan key:generate
   ```

7. Execute as migrações do projeto

   ```sh
    sail artisan migrate --seed
   ```

8. Rode os testes ou utilize alguma ferramenta como o postman para testar as rotas. Está disponibilizado um arquivo na raiz do projeto com todas as rotas para importação.

</details>

<details>
<summary>Frontend</summary>

1. Acesse a pasta do frontend do projeto

2. Instale as dependências do projeto

   ```sh
    pnpm install
   ```

3. Copie e configure o env

   ```sh
    cp .env.example .env
   ```

4. Execute o projeto em modo de desenvolvimento

   ```sh
    pnpm dev
   ```

</details>

## 🔧 Requisitos <a name = "requisitos"></a>

### Requisitos Funcionais:

- Permitir que os clientes selecionem um veículo para simulação de financiamento
- Exibir o valor do veículo selecionado e um campo para o valor de entrada
- Calcular e exibir os valores das parcelas com base na fórmula dada

### Requisitos Não Funcionais:

- Usar Laravel para desenvolvimento do backend
- Usar Next.js para desenvolvimento do frontend
- Usar PostgreSQL como banco de dados

### Regras de Negócio:

- Para parcelamento em 6 meses, considerar um aumento de 12,47% no valor total do veículo
- Para parcelamento em 12 meses, considerar um aumento de 15,56% no valor total do veículo
- Para parcelamento em 48 meses, considerar um aumento de 18,69% no valor total do veículo
- O valor de entrada pode ser qualquer valor inferior ao valor do veículo

## ⛏️ Tecnologias <a name = "tecnologias_usadas"></a>

### Frontend

- [x] [TypeScript](https://www.typescriptlang.org/) - Um superconjunto do JavaScript que adiciona definições de tipos estáticos, melhorando a qualidade do código e a produtividade dos desenvolvedores.
- [x] [ReactJS](https://reactjs.org/) - Uma biblioteca JavaScript para construir interfaces de usuário, fornecendo uma arquitetura baseada em componentes e renderização eficiente.
- [x] [Nextjs] - Um framework React para desenvolvimento de aplicações web, oferecendo renderização do lado do servidor e geração de sites estáticos.
- [x] [Tailwind CSS](https://tailwindcss.com/) - Um framework CSS utilitário-first usado para estilização, fornecendo uma abordagem de utilitários de baixo nível para construir designs personalizados.
- [x] [Vitest](https://vitest.dev) - Um framework de teste rápido e eficiente para aplicações JavaScript e TypeScript.
- [x] [Zod](https://zod.dev) - Data validation for TypeScript
- [x] [Phosphor React](https://phosphoricons.com) - Uma biblioteca de ícones SVG como componentes React, oferecendo uma coleção de ícones personalizáveis para uso em aplicações web.

### Backend

- [x] [Laravel](https://laravel.com/) - Um framework PHP para desenvolvimento web, conhecido por sua sintaxe expressiva e elegante, facilitando o desenvolvimento de aplicações robustas e escaláveis.
- [x] [PHPUnit](https://phpunit.de/) - Um framework de testes para PHP, utilizado para realizar testes automatizados, garantindo a qualidade e funcionalidade do código.
- [x] [PostgreSQL](https://www.postgresql.org/) - Um sistema de gerenciamento de banco de dados relacional avançado e open-source, reconhecido por sua robustez e suporte a uma ampla gama de funcionalidades.
- [x] [Docker](https://www.docker.com/) - Uma plataforma para desenvolvimento, envio e execução de aplicações em contêineres, proporcionando um ambiente isolado e consistente para o desenvolvimento e produção.

## 💡 Todo <a name = "todo"></a>

Aqui estão algumas possíveis melhorias ou pequenos bugfixes, que ainda não foram feitos pela falta de tempo

### Frontend

- Criei um dockerfile para a aplicação front, mas este ainda não está funcional
- Retornar melhor os erros através de um toaster, talvez usar o Sonner
- Melhorar o input de entrada de financiamento para refletir um input monetário
- Criar error boundaries pra evitar crashes
- Melhorar o CORS da aplicação
- Escrever testes mais específicos

### Backend

- Utilização de cache externo, como o Redis
- Escrever testes mais específicos
- Encontrar o bug no PHPUnit onde mesmo com o teste e env sendo setados como :memory: e sqlite, estes ainda estão influenciando o banco postgresql
