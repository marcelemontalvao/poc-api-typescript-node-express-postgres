# API de gerenciamento de filmes

Esta API é responsável pelo gerenciamento de filmes, permitindo a criação, listagem, busca, atualização e remoção de filmes.


## Tabela movies
- name (string, tamanho máximo 50, obrigatório): nome do filme
- category (string, tamanho máximo 20, obrigatório): categoria do filme
- duration (inteiro, obrigatório): duração do filme em minutos
- price (inteiro, obrigatório): preço do filme em reais

## Endpoints

### POST /movies

Cria um novo filme com as informações fornecidas no corpo da requisição. Retorna os dados do filme criado, incluindo o seu id.

    Requisição:
        POST /movies
```
Content-Type: application/json

{
    "name": "Nome do filme",
    "category": "Ação",
    "duration": 120,
    "price": 10
}

```

    Resposta:
        Status: 201 Created


```
Content-Type: application/json

{
    "id": 1,
    "name": "Nome do filme",
    "category": "Ação",
    "duration": 120,
    "price": 10
}
```

### GET /movies

Lista todos os filmes cadastrados na tabela movies.

    Requisição:
        GET /movies
    Resposta:
        Status: 200 OK

```
Content-Type: application/json

[
    {
        "id": 1,
        "name": "Nome do filme 1",
        "category": "Ação",
        "duration": 120,
        "price": 10
    },
    {
        "id": 2,
        "name": "Nome do filme 2",
        "category": "Comédia",
        "duration": 90,
        "price": 8
    }
]
```

### Com query parameter para filtrar filmes por categoria:

    Requisição:
        GET /movies?category=Comédia
    Resposta:
        Status: 200 OK


```
Content-Type: application/json

[
    {
        "id": 2,
        "name": "Nome do filme 2",
        "category": "Comédia",
        "duration": 90,
        "price": 8
    }
]
```
### GET /movies/:id

Busca um filme pelo seu id na tabela movies.

    Requisição
        GET /movies/1
    Resposta:
        Status: 200 OK
```
Content-Type: application/json

{
    "id": 1,
    "name": "Nome do filme",
    "category": "Ação",
    "duration": 120,
    "price": 10
}
```
### PATCH /movies/:id

Atualiza um filme existente na tabela movies com as informações fornecidas no corpo da requisição. Retorna os dados do filme atualizado.

    Requisição:
        PATCH /movies/1

```
Content-Type: application/json

{
    "name": "Novo nome do filme",
    "category": "Aventura"
}
```
    Resposta:
        Status: 200 OK
        
```
Content-Type: application/json
{
    "id": 1,
    "name": "Novo nome do filme",
    "category": "Aventura",
    "duration": 120,
    "price": 10
}
```
### DELETE /movies/:id

Remove um filme da tabela movies pelo seu id.

    Requisição: 
        DELETE /movies/1
    Resposta: 
        Status: 204 No Content