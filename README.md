# Taskfy Backend

Backend API service for Taskfy, a task management and productivity application built with NestJS.

## Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js para criação de APIs REST e GraphQL
- [Prisma](https://www.prisma.io/) - ORM e gerenciador de banco de dados
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Passport.js](https://www.passportjs.org/) - Autenticação
- [JWT](https://jwt.io/) - Tokens de autenticação
- [Argon2](https://github.com/ranisalt/node-argon2) - Hashing de senhas
- [Date-fns](https://date-fns.org/) - Manipulação de datas

## Funcionalidades

- Autenticação e autorização de usuários
- Gerenciamento de tarefas
- Sistema de Pomodoro para produtividade
- Gerenciamento de blocos de tempo
- API RESTful com validação de dados

## Estrutura do Projeto

```
src/
├── app.module.ts        # Módulo principal da aplicação
├── main.ts             # Ponto de entrada da aplicação
├── auth/              # Módulo de autenticação
├── user/              # Módulo de gerenciamento de usuários
├── task/              # Módulo de gerenciamento de tarefas
├── pomodoro/         # Módulo do sistema Pomodoro
├── time-block/       # Módulo de blocos de tempo
└── common/           # Utilitários e classes compartilhadas
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/EvandroCalado/taskfy_backend.git
cd taskfy_backend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

## Executando a Aplicação

### Modo de Desenvolvimento
```bash
pnpm run start:dev
```

### Modo de Produção
```bash
pnpm run build
pnpm run start:prod
```

## Segurança

- Autenticação JWT
- Senhas criptografadas com Argon2
- Validação de dados com Class Validator
- Proteção contra SQL Injection através do Prisma

## Documentação da API

A documentação da API está disponível em:
`http://localhost:3000/api`

## Testes

```bash
# Executar todos os testes
pnpm run test

# Executar testes com cobertura
pnpm run test:cov

# Executar testes em modo watch
pnpm run test:watch
```

## Licença

Este projeto está sob licença UNLICENSED. Veja o arquivo LICENSE para mais detalhes.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
