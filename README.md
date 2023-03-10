# MT-Household-Budget

Este projeto está arquitetado com camadas, sendo as principais: `adapter, common, controller, core e infra`

- Conteúdo
  - [Configurações](#configs)
    - Dotenv
    - Scripts
    - Docker
    - TypeScript
    - VSCode
  - [Sobre o projeto](#about)
    - [Requisitos](#requirements)
    - [Instalação](#install)
    - [Rodando o projeto](#run)
    - [Instalação/Rodando o projeto no docker](#run-docker)

## Configurações <a name="configs" ></a>

<details>
  <summary><b>Dotenv</b> (click to show)</summary>

O projeto depende do arquivo `.env` que deve existir na pasta raiz. Este arquivo não é versionado apesar do arquivo `.env.example` ser.

Certifique-se de possuir um `.env` na raiz do projeto antes de executá-lo para que as constantes em `src/app.vars.ts` sejam carregadas.

**DETALHAMENTO**

| Variável                  | Descrição                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV                  | Define o ambiente de execução. Recebe "production", "development" ou "test". Controla funcionalidades da aplicação.  |
| APP_CONTAINER_NAME        | Define o nome do container que será gerado pelo docker.                                                              |
| APP_HOST_URL              | Define a url de host do projeto                                                                                      |
| DATABASE_CONTAINER_NAME   | Define o nome do container do serviço de banco de dados.                                                             |
| POSTGRES_DB               | Define o nome do banco de dados.                                                                                     |
| POSTGRES_USER             | Define o usuário do banco de dados.                                                                                  |
| POSTGRES_PASSWORD         | Define a senha do usuário no banco de dados.                                                                         |
| POSTGRES_HOST             | Define a porta usada pelo banco de dados.                                                                            |
| DATABASE_URL              | Define a string_connection do ORM para identificar o banco de dados.                                                 |
| MOCK_CONTAINER            | Define se a execução do container de injeção de dependências com implementações em memória. Recebe "false" ou "true" |
| PUPPETEER_EXECUTABLE_PATH | Define o local de execução do puppeteer. Por exemplo o loca de instação do navegador                                 |
| VIA_CEP_API_URL           | Define a url da api do ViaCep                                                                                        |

</details>

<details>
  <summary><b>Scripts</b> (click to show)</summary>

O projeto conta com diversos scripts de linha de comando para uso via terminal, i.e., `yarn <SCRIPT>` ou `npm run <SCRIPT>`

**DETALHAMENTO**

| Script        | Descrição                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------- |
| commit        | Inicializa commitizen para criar uma mesangem de commit seguinto o conventional commits      |
| build         | Compila o projeto gerando na pasta dist os scripts para produção                             |
| format        | Formata automaticamente o código com o padrão definido pelo prettier                         |
| lint          | Roda o ESLINT para conferir o styleguide do código, corrigindo automaticamente erros simples |
| husky:prepare | Prepara o husky no projetopara executar os hooks dentro de .husky                            |
| start         | Inicia o entrypoint gerado no build em produção                                              |
| start:dev     | Inicia o servidor de desenvolvimento com hot auto-reload                                     |
| test          | Executa todos os testes unitários encontrados na aplicação                                   |
| test:watch    | Inicia o servidor de teste e ativa o hot auto-reload apenas para o testes modificados        |
| test:ci       | Gera o relatório de cobertura dos testes no código-fonte                                     |
| test:clear    | Limpa o cache de arquivos do jest                                                            |

</details>

<details>
  <summary><b>Docker</b> (click to show)</summary>

Um `Dockerfile` está presente na raiz do projeto, assim como um `docker-compose.yml` com uma configuração mínima viável para a execução do mesmo.

No `docker-compose.yml` há referência para uma rede interna que permitará conectar diversos container de serviços que venham a existir no projeto.

### Docker Run

Em uma máquina com **Docker** e **Docker Compose** instalados, basta configurar seu arquivo `.env` e executar

```bash
docker-compose up # Comando travará o terminal
# ou
docker-compose up -d # Comando executará em segundo plano
```

para iniciar a aplicação.

A execução de testes e demais comandos listados na sessão `Scripts` pode ser feita a partir de uma nova sessão dentro do container

```bash
docker-compose exec app-node /bin/bash # Inicia uma sessão dentro de um container já em execução
# ou
docker-compose run --rm app-node /bin/bash # Cria um container novo e inicia uma sessão
```

</details>

<details>
  <summary><b>Typescript</b> (click to show)</summary>

Esta arquitetura utiliza [**Typescript**](https://www.typescriptlang.org/) como linguagem de codificação. Todas as features disponíveis pelo framework estão em Typescript e são altamente extensiveis, o que torna todo o código produzido super flexível para o desenvolvimento de softwares.

Apesar de adicionar uma estrutura diferente há sintaxe do javascript e que muitos programadores poderão não estar habitualidos a usar, TS trás vários benefícios a codificação:

- Suporte [intellisense](https://code.visualstudio.com/docs/editor/intellisense) para prover auto-completo, informações de parametros, informações rápidas, lista de membros, etc., tudo a nível de IDEs de código-fonte.
- Melhor tooling para debug do desenvolvedor, fazendo verificações de erros e garantias de tipagens ao codificar.
- Adição de suporte para design patterns como Abstract, Factories, Decorators, Singles, etc., para facilitar a gerência das dependências de forma padronizada e reutilizável.
- Fornece um código mais confiável e explícito, menos sucetível a erros durante a programação.
- Entre outros.

O projeto já possui um linter e o prettier configurados para garantir boa parte da formatação desejada no padrão de código definido. Arquivos de configuração `.prettierrc` e `.eslintrc.jsson` explicitam as configurações que dentre as poucas decisões definem: **utilização obrigatória de aspas SIMPLES** e a **não-utilização de ponto e vírgula**.

Um arquivo `.editorconfig` também dita as configurações acerca da formatação de arquivos: **identação com 2 espaços**, com **codificação em UTF-8** e com **linha em branco ao final dos arquivos**.

</details>

<details>
  <summary><b>VSCode</b> (click to show)</summary>

**IMPORTANTE**

Você deve ter instalado no seu ambiente os plugins para ter a formatação automatizada:

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

O projeto trabalha com aspas simples nas strings e ponto-e-virgula para definir o final de cada linha, entretanto, toda essa formatação é feita pelo prettier sempre que um arquivo é salvo.

```js
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "redhat.vscode-yaml"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
}
```

**IMPORTANTE**

O projeto conta com suportar alias-path, a raiz `./` está configurada para `~/` conforme definição

```js
// tsconfig.json
{
  "compilerOptions": {
  ...
    "paths": {
      "~/*": ["*"]
    },
  ...
  }
}
```

O prettier está preparado para fornecer os imports de cada recurso obedecendo alias-path, i.e., `import bootstrap from '~/infra/http/server/express/index.http';` conforme definição

```js
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
}
```

**IMPORTANTE**

Específico para ambiente Windows

```js
{
  "files.eol": "\n",
  "editor.tabSize": 2
}
```

</details>

## Sobre o projeto <a name="about"></a>

### **Requisitos:** <a name="requirements"></a>

- [NodeJs `>18.0.0`](https://nodejs.org/en/)

- [Docker Descktop](https://docs.docker.com/desktop)

- [NPM](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### **Instalação:** <a name="install"></a>

No terminal faça:

```bash
npm install
```

### **Rodando o Projeto:** <a name="run"></a>

Na linha de comando faça:

```js
npm run start:dev
```

**NOTA**: caso tenha dúvidas veja a sessão `Configurações > Dotenv` & `Configurações > Scripts`

### **Instalação/Rodando o projeto no Docker** <a name="run-docker"></a>

Caso opte por rodar o projeto com docker rode o comando na sessão `Configurações > Docker`
