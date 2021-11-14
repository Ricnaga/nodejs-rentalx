 <img src="https://img.shields.io/github/license/Ricnaga/nodejs-rentalx?label=License&style=for-the-badge"/>

# <div align="center"> RentX </div>

#### <div align="right">- Projeto Finalizado <div>

### <div align="center"> Aplicação backend para aluguel de carros, essa aplicação aborda conceitos de: </div>

#### - CRUD com ExpressJS 
#### - Token com Json Web Token 
#### - DayJS: alterar dados de tempo
#### - Template Engine com handlebars
#### - Fake Mail com nodemailer
#### - Bcrypt: encriptando senha
#### - Multer: leitura/escrita de arquivos
#### - Banco de dados com Redis, postgres e typeorm
#### - TDD usando supertest e jestJS
#### - Conteinerização com Docker
#### - Testes de algumas rotas via interface com Swagger

## <div align="center"> Sumário </div>
<!--ts-->
   - [Requisitos](#<div-align="center">Requisitos</div>)
   - [Tecnologias utilizadas](#<div-align="center">Tecnologias-utilizadas</div>)
<!--te-->

## <div align="center">Requisitos</div>
Para executar a aplicação é necessário instalar algumas ferramentas tais como um editor de códigos para realizar compilação dos mesmos. Nesse projeto foi utilizado o [Visual Studio Code](https://code.visualstudio.com/), [NodeJS](https://nodejs.org/en/) para compilação do código, [Git Bash](https://gitforwindows.org/) para baixar o repositório e baixar todas as dependências necessárias. 

```bash
# Baixe o repositório.
$ git clone https://github.com/Ricnaga/nodejs-rentalx.git

# Acesse a pasta do projeto.
$ cd nodejs-rentalx

# Agora que baixou e acessou o repositório, vamos começar a instalação das dependências.
$ yarn ( caso não utilize o yarn execute apenas npm -i)

# Caso queira, utilize o docker para iniciar o banco de dados postgres e redis ou instale diretamente
# Usuário, senha e nome do banco estão no arquivo ormconfig
$ docker compose up

# Depois de instalado todas as dependências, abra a aplicação via vscode
$ code .

# Agore execute a aplicação.
$ yarn dev (caso não utilize o yarn: npm run dev)

# A aplicação iniciará na porta 3333 
# Acesse no navegador o endereço http://localhost:3333/api-docs
```

##  <div align="center">Tecnologias utilizadas</div>
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/starter/installing.html)
- [Swagger](https://swagger.io/)


## <div align="center">Autor</div>
<div align="center">Atividade desenvolvida no curso ignite pela equipe <a href="https://rocketseat.com.br/">Rocketseat</a>, realizados por minha pessoa.
Gostou? tem alguma sugestão de melhoria? por favor, entre em contato e ja aproveita e me adiciona.<br>
<a href="https://www.linkedin.com/in/ricardo-nagatomy"><img src="https://img.shields.io/badge/-RicardoNaga-blue?style=flat-square&logo=Linkedin&logoColor=white"></a>
<a href="https://app.rocketseat.com.br/me/ricardo-nagatomy"><img src="https://img.shields.io/badge/-Rocketseat-000?style=flat-square&logo=&logoColor=white"></a>
</div>