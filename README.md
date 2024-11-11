
# Banco de Tintas

## Descrição do Sistema

O **Banco de Tintas** é uma plataforma que permite o cadastro e solicitação de tintas. O sistema gerencia dois tipos de usuários: **Doador** e **Beneficiário**. Os doadores podem contribuir com tintas, enquanto os beneficiários podem solicitar tintas do banco.

### Funcionalidades

- **Cadastro de Usuários** (doadores ou beneficiários) com validação de dados.
- **Doação de Tintas** por parte dos usuários.
- **Pedidos de Tintas** realizados pelos beneficiários.
- **Gerenciamento de Estoque** de tintas.
- **Conexão com Banco de Dados** MySQL para armazenar e recuperar informações.

---

## Diagrama Entidade-Relacionamento (DER)

### 1. **Usuário**
- **Atributos:**
  - `ID_Usuario (PK)`
  - `Nome`
  - `Tipo` (Doador ou Beneficiário)
  - `Endereço`
  - `Cidade`
  - `Estado`
  - `CEP`
  - `E-mail`
  - `Telefone`
  - `Justificativa` (opcional para beneficiários)
- **Relacionamentos:** 
  - Relacionado a *Doação* e *Pedido*

### 2. **Tinta**
- **Atributos:**
  - `ID_Tinta (PK)`
  - `Tipo` (Acrílica, Látex, Esmalte)
  - `Cor`
  - `Acabamento` (Fosco, Acetinado, Brilhante)
  - `Quantidade`
  - `Validade`
  - `Foto`
  - `Condição` (Nova, Usada)
- **Relacionamentos:**
  - Relacionado a *Estoque*, *Doação*, e *Pedido*

### 3. **Doação**
- **Atributos:**
  - `ID_Doacao (PK)`
  - `Data`
  - `Status` (Aprovada, Rejeitada, Parcial)
  - `Local_Doacao` (Fatec ou Loja Parceira)
  - `ID_Usuario (FK)`
  - `ID_Tinta (FK)`
  - `Observacao`
- **Relacionamentos:**
  - Relacionado a *Usuário* e *Tinta*

### 4. **Pedido**
- **Atributos:**
  - `ID_Pedido (PK)`
  - `Data`
  - `Status` (Aprovado, Parcial, Rejeitado)
  - `ID_Usuario (FK)`
  - `ID_Tinta (FK)`
  - `Quantidade_Solicitada`
  - `Justificativa`
- **Relacionamentos:**
  - Relacionado a *Usuário* e *Tinta*

### 5. **Estoque**
- **Atributos:**
  - `ID_Estoque (PK)`
  - `ID_Tinta (FK)`
  - `Quantidade_Disponivel`
- **Relacionamentos:**
  - Relacionado a *Tinta*

---

## Modelo Relacional (MR)

As entidades do Diagrama Entidade-Relacionamento são transformadas nas seguintes tabelas:

### Tabela de Usuário

```sql
CREATE TABLE Usuario (
    ID_Usuario INT PRIMARY KEY,
    Nome VARCHAR(100),
    Tipo ENUM('Doador', 'Beneficiário'),
    Endereco VARCHAR(255),
    Cidade VARCHAR(50),
    Estado CHAR(2),
    CEP VARCHAR(10),
    Email VARCHAR(100),
    Telefone VARCHAR(15),
    Justificativa TEXT
);
```

### Tabela de Tinta

```sql
CREATE TABLE Tinta (
    ID_Tinta INT PRIMARY KEY,
    Tipo VARCHAR(50),
    Cor VARCHAR(50),
    Acabamento VARCHAR(50),
    Quantidade INT,
    Validade DATE,
    Foto VARCHAR(255),
    Condicao VARCHAR(20)
);
```

### Tabela de Estoque

```sql
CREATE TABLE Estoque (
    ID_Estoque INT PRIMARY KEY,
    ID_Tinta INT,
    Quantidade_Disponivel INT,
    FOREIGN KEY (ID_Tinta) REFERENCES Tinta(ID_Tinta)
);
```

### Tabela de Doação

```sql
CREATE TABLE Doacao (
    ID_Doacao INT PRIMARY KEY,
    Data DATE,
    Status ENUM('Aprovada', 'Rejeitada', 'Parcial'),
    Local_Doacao VARCHAR(50),
    ID_Usuario INT,
    ID_Tinta INT,
    Observacao TEXT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Tinta) REFERENCES Tinta(ID_Tinta)
);
```

### Tabela de Pedido

```sql
CREATE TABLE Pedido (
    ID_Pedido INT PRIMARY KEY,
    Data DATE,
    Status ENUM('Aprovado', 'Parcial', 'Rejeitado'),
    ID_Usuario INT,
    ID_Tinta INT,
    Quantidade_Solicitada INT,
    Justificativa TEXT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario),
    FOREIGN KEY (ID_Tinta) REFERENCES Tinta(ID_Tinta)
);
```

---

## Scripts DML (Inserção de Dados)

```sql
INSERT INTO Usuario (ID_Usuario, Nome, Tipo, Endereco, Cidade, Estado, CEP, Email, Telefone)
VALUES (1, 'Maria Silva', 'Doador', 'Rua A, 123', 'Jundiaí', 'SP', '13201-000', 'maria@exemplo.com', '(11) 98765-4321');

INSERT INTO Tinta (ID_Tinta, Tipo, Cor, Acabamento, Quantidade, Validade, Foto, Condicao)
VALUES (1, 'Acrílica', 'Vermelho', 'Fosco', 1000, '2025-12-01', 'url_foto', 'Nova');

INSERT INTO Estoque (ID_Estoque, ID_Tinta, Quantidade_Disponivel)
VALUES (1, 1, 500);
```

---

## Ferramentas Utilizadas

- **VS Code:** Ambiente de desenvolvimento integrado (IDE) utilizado para o desenvolvimento do sistema.
- **Spring Boot:** Framework utilizado para desenvolver o backend da aplicação, integrando com o banco de dados MySQL e expondo endpoints para o frontend.
- **MySQL:** Sistema gerenciador de banco de dados utilizado para armazenar informações sobre os usuários, tintas, doações, pedidos e estoque.
- **Postman:** Ferramenta utilizada para testar os endpoints da API durante o desenvolvimento.
- **GitHub:** Plataforma para versionamento de código, colaboração e armazenamento do repositório.
- **Git:** Sistema de controle de versões utilizado para gerenciar o código fonte e colaborar no projeto.

---

## Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Arquitetura do Sistema

### Backend
O backend é implementado com o framework **Express** em Node.js, conectado a um banco de dados **MySQL**. Ele oferece funcionalidades como o cadastro de usuários, validação de dados e rotas de API para integração com o frontend.

### Frontend
O frontend é uma página HTML simples com um formulário de cadastro, estilizado com CSS. O JavaScript é utilizado para enviar os dados para o backend e processar a resposta.

---

## Fluxo de Dados

1. O usuário preenche o formulário no frontend.
2. O frontend envia os dados para o backend via **POST**.
3. O backend valida e armazena os dados no banco de dados.
4. O backend retorna uma resposta, e o frontend exibe uma mensagem de sucesso ou erro.
