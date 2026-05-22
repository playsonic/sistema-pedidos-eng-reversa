# Estrutura do Sistema: Modularização

O código foi refatorado e agora segue a estrutura de um sistema modular. Vou explicar como ficou a separação dos arquivos e de suas respectivas pastas:

### Diretórios Principais

* **`client/`**: Camada de apresentação. Contém os arquivos de interface (`index.html`, `style.css`) e a lógica de manipulação do DOM (`view.js`).
* **`src/`**: Diretório raiz contendo toda a lógica central do sistema.
* **`shared/`**: Recursos transversais utilizados por todo o sistema.
  * **`middlewares/`**: Funções de interceptação, como `authMiddleware.js` (segurança) e `errorHandler.js` (tratamento de erros 500).
  * **`config/`**: Configurações gerais (`env.js` para variáveis de ambiente e `linkAPI.js`).
  * **`utils/`**: Funções auxiliares genéricas, como `linkWhatsapp.js`.
* **`data/`**: Armazenamento estático de arquivos JSON para pedidos.
* **`test/`**: Pasta espelho dedicada aos testes automatizados, garantindo que o comportamento do sistema esteja conforme o esperado.

---

## 2. Módulos (`modules/`)

Os módulos segmentam a aplicação com base em entidades de negócio, isolando funcionalidades específicas. Os Módulos implementados neste código foram:

`auth`: Autenticação e login.
`orders`: Gestão e processamento de pedidos.
`products`: Catálogo de produtos.
`payments`: Processamento de pagamentos.

Cada módulo segue uma estrutura baseada no padrão **MVC**:

**`controllers/`**: Camada de interface de entrada. Gerencia as rotas HTTP, recebe requisições, realiza validações básicas e delega a lógica para os services. Não processa regras de negócio nem acessa o banco diretamente.

**`services/`**: Camada de lógica de negócio. Responsável por fluxos, cálculos (como taxas e descontos) e validações complexas. Aciona o repositório apenas quando necessário.

**`repositories/`**: Camada de acesso a dados. Única camada com autorização para interagir diretamente com o banco de dados. Implementa métodos de persistência como salvarDados e buscarDados, abstraindo a tecnologia de banco de dados do restante da aplicação.

**`entities/`**: Camada de modelos. Representa os objetos de negócio em código, definindo a estrutura dos dados que circulam pelo sistema

---

## 3. Arquivos de Infraestrutura

Além da estrutura modular, existem componentes fundamentais para a execução:

* **`routes.js`** (em `modules/orders/`): Gerencia a comunicação entre a interface (*client*) e o *controller*.
* **`server.js`**: O ponto de entrada da aplicação. É responsável pela inicialização do servidor HTTP e pela configuração das rotas globais do sistema.
