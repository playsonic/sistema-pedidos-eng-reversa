# Atividade 05 - Refatoração da Atividade 04 para o Padrão MVC

## Informações da Atividade

**Aluno:** Dan Mendes de Souza Nogueira Ribeiro  
**Semestre:** 3° Semestre  
**Disciplina:** Arquitetura de Sistemas  
**Professor:** Dr. Renato William Rodrigues de Souza  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Instituição:** IFCE - Campus Boa Viagem  

## Sobre o Projeto

Este projeto consiste em uma atividade avaliativa da disciplina de Arquitetura de Sistemas. O objetivo principal foi analisar e refatorar um código base disponibilizado pelo docente, transformando um sistema simples em uma aplicação bem estruturada usando a arquitetura MVC.

---

## Respostas

### 7. Análise Arquitetural

7.1 - **O MVC melhorou a organização?**
Sim, melhorou significativamente. A adoção dessa arquitetura permite uma separação mais clara das informações e responsabilidades do código. Isso proporciona um fluxo de evolução e correção mais natural e coeso, facilitando o trabalho não apenas para o desenvolvedor que iniciou o projeto, mas também para outros profissionais que venham a assumir o código no futuro.

7.2 - **sistema ficou mais desacoplado?**
Sim, agora as funções estão devidamente isoladas. Além de respeitarem o princípio da responsabilidade única, os arquivos estão divididos em camadas específicas como cálculos de descontos, serviços de pedido, etc. Essa separação reduz o acoplamento e confere maior fluidez e modularidade ao sistema.

7.3 - **Onde ainda existem problemas?**
Apesar das melhorias, é notável que a navegação entre os diretórios pode se tornar confusa, semelhante a uma grande biblioteca com poucas subdivisões, dificultando a busca por componentes específicos. Além disso, à medida que o sistema cresce, os Models, Views e Controllers tendem a ficar muito extensos. Essa sobrecarga de responsabilidades gera um alto acoplamento, o exato oposto do objetivo da refatoração, dificultando o acompanhamento e a evolução do software.

7.4 - **O MVC seria suficiente para um sistema muito grande?**
Não de forma isolada. Seria necessária a integração com outros padrões arquiteturais para mitigar os problemas estruturais do modelo puro. Em projetos de grande escala, as falhas inerentes ao MVC tradicional tendem a se amplificar com o desenvolvimento, comprometendo a estabilidade e a escalabilidade do sistema.

7.5 - **Quais limitações você percebeu?**
A principal limitação é a degradação estrutural conforme o projeto escala. Os componentes centrais (Models, Views e Controllers) acabam absorvendo muitas responsabilidades, resultando em classes infladas, alto acoplamento e, consequentemente, uma navegação mais complexa entre os arquivos e dependências.

7.6 - **Onde os Services ajudaram?**
Eles foram fundamentais para centralizar e controlar as regras de negócio e a lógica do sistema. Atuando como uma camada intermediária de orientação, os serviços mantêm o baixo acoplamento e isolam responsabilidades, evitando que os Controllers e os Models fiquem poluídos com lógicas operacionais complexas.

7.7 - **Onde os Repositories ajudaram?**
De forma semelhante aos Services, os Repositories isolam uma responsabilidade crucial do sistema: a persistência e a manipulação de dados. Eles abstraem a lógica de acesso ao banco (ou arquivos), facilitando o seu uso no restante do código. Isso evita que Controllers ou Models fiquem diretamente acoplados à infraestrutura de dados, centralizando essas interações em um único local.

### 3. Problemas do MVC Tradicional

Embora seja muito conciso e extremamente útil, o modelo ainda apresenta falhas, pois a organização dos diretórios pode gerar confusão à medida que o código cresce. Somado a isso, a expansão do sistema faz com que os Models, Views e Controllers fiquem excessivamente extensos. Esse acúmulo de funções resulta em um forte acoplamento, o que prejudica diretamente a manutenção e a escalabilidade do projeto.

### 4. Comparação Arquitetural

#### **Organização**:

**Sistema Original**: A falta de organização se manifesta tanto na interface quanto na modelagem de dados: tamanhos de pizza tratados como itens avulsos, combos que não consolidam os preços (mostrando os valores unitários), uma área de desconto que permanece ativa sem existir promoção, e ações duplicadas no carrinho. Essas inconsistências evidenciam um mau planejamento do domínio da aplicação e desorganização do código-fonte.

**MVC Refatorado**: A organização do sistema agora é notória. A arquitetura foi dividida em diretórios baseados em suas respectivas responsabilidades. Dessa forma, os arquivos de cada diretório focam exclusivamente nas tarefas a eles designadas, tornando a leitura, a manutenção e a expansão do projeto consideravelmente mais fáceis.

#### **Coesão**:

**Sistema Original**: Observa-se uma baixa coesão estrutural. As funções parecem acumular múltiplas responsabilidades, ferindo princípios básicos de design. Um reflexo prático disso é a complexidade desnecessária gerada no fluxo de bloqueio de pedidos fora do horário de atendimento. Essa mistura de lógicas (validação de horário acoplada à interface do carrinho, por exemplo) compromete a estabilidade e mostra que o sistema tem funções pouco coesas.

**MVC Refatorado**: O sistema apresenta alta coesão, com funções separadas em pastas e arquivos específicos. A introdução das camadas de Services e Repositories permitiu extrair lógicas que, se mantidas nos Models ou Controllers, gerariam baixo isolamento estrutural. Com as responsabilidades bem delimitadas, Controllers e Models focam apenas em seus papéis essenciais, sem acúmulo de regras de negócio complexas.

#### **Acoplamento**:

**Sistema Original**: O sistema exibe um alto nível de acoplamento, com forte interdependência entre seus componentes. Isso se traduz em anomalias de navegação, como o roteamento confuso nas categorias de combos ou a existência de dois botões de "finalizar pedido" na mesma tela. Esse emaranhado torna o código complexo e frágil para os desenvolvedores, além de gerar uma interface que frustra o usuário.

**MVC Refatorado**: A arquitetura possui um baixo nível de acoplamento. As camadas de Controller, View e Model detêm suas próprias responsabilidades, sem vazamento de escopo entre elas. A adoção dos diretórios de Services e Repositories foi crucial para esse resultado, retirando regras de negócio e de persistência do Model e do Controller, que agora atuam de forma enxuta, apenas orquestrando as chamadas aos serviços adequados.

#### **Reutilização**:

**Sistema Original**: O código original apresenta baixa capacidade de reutilização, pois foi desenvolvido de forma rígida e limitando-se a atender exclusivamente à demanda imediata. Essa especificidade o torna inflexível, prendendo a estrutura da aplicação ao seu próprio conceito restrito de projeto.

**MVC Refatorado**: A arquitetura atualizada favorece uma alta reutilização. O software tornou-se maleável e modular, podendo ser reaproveitado para além do escopo original do projeto. Por exemplo, a lógica estrutural de pedidos poderia ser facilmente adaptada de um restaurante para um e-commerce de móveis com um mínimo de atrito.

#### **Clareza estrutural**:

**Sistema Original**: O software original é intuitivo devido à sua extrema simplicidade, consistindo em apenas três arquivos de fácil dedução. Essa estrutura básica permite que tanto desenvolvedores novatos quanto experientes identifiquem rapidamente o propósito de cada documento sem grandes problemas.

**MVC Refatorado**: O sistema reestruturado adota um paradigma completamente novo, distribuído em diretórios com papéis específicos. Embora demande um conhecimento prévio de padrões de projeto de software para ser plenamente compreendido, essa maior complexidade inicial é amplamente compensada pelos benefícios robustos de organização, previsibilidade e controle de fluxo.

#### **Escalabilidade**:

**Sistema Original**: O código legado oferece pouca margem para escalabilidade. Devido ao alto acoplamento e à sua simplicidade engessada, é extremamente difícil adicionar funcionalidades sem impactar ou reescrever grande parte do código existente, o que evidencia um planejamento arquitetural limitado.

**MVC Refatorado**: A nova arquitetura garante alta coesão, permitindo que o sistema cresça de forma orgânica. É possível atualizar ou expandir módulos específicos sem gerar efeitos colaterais no restante da aplicação, tornando o processo de escalonamento muito mais seguro. Contudo, cabe ressaltar que, à medida que a aplicação ganha grande escala, o padrão MVC puro pode enfrentar desafios de administração devido à tendência de surgimento de Controllers sobrecarregados (Fat Controllers).

#### **Facilidade de manutenção**:

**Sistema Original**: Devido ao alto acoplamento e à baixa coesão, a manutenção do código original é trabalhosa e arriscada. Uma falha isolada tende a propagar erros pelo restante da aplicação, e o esforço para corrigir um bug frequentemente exige alterações colaterais em blocos de código que já estavam operando corretamente.

**MVC Refatorado**: A combinação de baixo acoplamento e alta coesão transforma a manutenção em uma tarefa ágil e controlada. Como cada função está isolada e atende a uma única responsabilidade, a raiz dos problemas é facilmente identificável. Alterações podem ser aplicadas apenas na fração necessária do código, sem comprometer a integridade sistêmica.
