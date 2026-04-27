# Atividade 4 - Arquitetura de Sistemas - Engenharia Reversa

## Informações da Atividade

**Aluno:** Dan Mendes de Souza Nogueira Ribeiro  
**Semestre:** 3° Semestre  
**Disciplina:** Arquitetura de Sistemas  
**Professor:** Dr. Renato William Rodrigues de Souza  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** IFCE - Campus Boa Viagem  

---

Aqui está o seu texto revisado e formatado. Corrigi alguns pequenos erros de digitação, melhorei a fluidez de algumas frases para deixar o texto mais profissional, mas mantive toda a sua essência, o seu tom de voz e as suas explicações originais (que ficaram excelentes do ponto de vista técnico).

Está pronto para ser copiado e colado direto no seu `README.md` do GitHub:

---

## Sobre o Projeto

Este projeto consiste em uma atividade avaliativa da disciplina de Arquitetura de Sistemas. O objetivo principal foi analisar e refatorar um código base disponibilizado pelo docente, transformando um sistema simples em uma aplicação bem estruturada e mais próxima do nível exigido pelo mercado.

Abaixo, detalho quais foram as melhorias estruturais implementadas e os padrões de projeto aplicados nessa refatoração.

---

## Respostas

### 1. Quais problemas foram resolvidos?

O código original apresentava problemas lógicos e estruturais. Com as refatorações realizadas, foram adicionadas camadas de regras de negócio mais refinadas junto a uma estrutura muito mais maleável. Isso permite que mudanças — como o controle de descontos, ajuste de preços e atualizações de catálogo, sejam feitas de maneira muito mais rápida e segura.

Além disso, a implementação da API permitiu automatizar a comunicação entre a interface do cliente e o sistema da loja. Por fim, a nova base arquitetural permite que o código evolua de forma muito mais natural ao longo do tempo.

### 2. Como a arquitetura melhorou o sistema?

A arquitetura baseada em camadas tornou o sistema flexível e prático. Agora, é possível realizar modificações pontuais, como alterar o cardápio ou aplicar novas regras de desconto, sem o risco de prejudicar outras partes do código.

Essa separação de responsabilidades garante uma evolução mais concisa, permitindo atualizações e melhorias contínuas sem a necessidade de uma reescrita rigorosa e completa do sistema a cada novo ciclo de desenvolvimento.

### 3. Onde os padrões de projeto foram aplicados?

#### Padrão Factory

Aplicado na classe `Produto`, no arquivo `entidade.js`, especificamente no método `static criarProduto()`.
O `PedidoService` apenas faz a solicitação para a "classe fábrica". A fábrica, por sua vez, faz a verificação adequada de cada pedido (por exemplo, verifica se o sabor existe e busca o preço correto). No fim, ela devolve tudo encapsulado como um objeto `ItemPedido`, já montado e pronto para uso.

#### Padrão Singleton

Aplicado no arquivo `services.js` através da exportação: `export const services = new PedidoService()`.
Como estamos utilizando o ecossistema do Node.js, aproveitamos o seu comportamento nativo de cache de módulos. Ao instanciar e exportar essa constante, criamos o Singleton. Dessa forma, quando diferentes arquivos do projeto, como `controle.js` e `whatsapp.js`, importam essa variável, o Node.js não cria serviços diferentes; ele entrega a mesma exata instância salva na memória para todos eles, garantindo a centralização do estado da aplicação.

#### Padrão Strategy

Aplicado na integração entre a classe `PedidoService`, no `services.js`, e a classe `Pedidos`, no `entidade.js`.
No `PedidoService`, existe o método privado `#escolherDesconto(total)`. Ele atua como um selecionador de estratégias adequadas: baseado no valor da compra, ele retorna uma função matemática diferente para o desconto. Em seguida, essa função é passada como parâmetro para `this.pedidoAtual.precoFinal(funcaoDesconto)`.
A classe `Pedidos` não tem ideia de como o desconto é calculado. Ela age de forma obediente: apenas pega o total do carrinho, joga dentro da função que recebeu e soma a taxa. Isso respeita o princípio de manter as classes fechadas para modificação, mas abertas para extensão.

#### Padrão Repository

Aplicado na classe `PedidoSalvar`, no arquivo `PedidoRepository.js`.
Nessa estrutura, o `PedidoService` atua de forma "cega". Ele não faz ideia de como a persistência dos dados ocorre, não conhece a biblioteca `fs`, o `path.resolve`, nem manipula arquivos `.json`. Toda a infraestrutura do Node.js (lidar com leitura de disco, tratar erros de arquivo não encontrado e converter JSON) ficou encarregada pelo Repository. Se ocorrer uma mudança de `.json` para um banco de dados real no futuro, não será necessário mudar o Service ou as Entidades; só é preciso alterar a classe Repository.

### 4. Quais benefícios foram obtidos?

* **Flexibilidade de manutenção:** Atualizações pontuais tornaram-se mais seguras.
* **Facilidade de desenvolvimento:** Inclusão de novas funcionalidades e melhorias de forma escalável.
* **Organização e legibilidade:** O código tornou-se muito mais limpo, permitindo um entendimento tranquilo de onde cada responsabilidade reside.
* **Separação clara entre Domínio e Serviço:** Melhoria expressiva na lógica dos services e do domínio, permitindo uma fluidez perfeita de dados entre ambas as partes.
