## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Criar banco com Compose

```bash
$ docker-compose up -d
```

## Derrubar o banco com Compose

```bash
docker-compose down -v
```

## Instalar bibliotecas

### Orm e Banco

```bash
npm install --save @nestjs/typeorm typeorm pg
```

### validadores

```bash
npm i --save class-validator class-transformer
```

### base configuração env

```bash
npm i --save @nestjs/config
```

### persistir logs

```bash
npm i --save winston nest-winston
```

> Os logs seram gerados na pasta `logs/application.log`

## Rodar app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
