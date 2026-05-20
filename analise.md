### Parte 1 – Engenharia Reversa da Arquitetura Atual

1. Como o MVC atual está organizado? - Basicamente, o projeto está estruturado em 5 pastas, cada uma com uma responsabilidade bem específica; O Model guarda as entidades e moldes de dados (Produto, Pedido e ItemPedido), A View cuida de toda a interface e manipulação do DOM, O Controller gerencia o fluxo da aplicação e faz a ponte de comunicação entre a View e o resto do sistema, O Repository isola as funções relacionadas a salvar e ler os dados (no nosso caso, o arquivo JSON), por fim, o Service armazena a lógica e as regras de negócio pesadas do projeto (como calcular os preços e descontos).

2. Onde existem problemas arquiteturais? - O modelo ainda tem problemas de arquitetura notórios. A organização só por esses diretórios pode gerar confusão de navegação à medida que o código cresce. Somado a isso, a expansão natural do sistema faz com que os Models, Views e Controllers fiquem excessivamente grandes. Esse acúmulo de funções resulta em um forte acoplamento, o que prejudica diretamente a manutenção e a escalabilidade do projeto lá na frente.

3. Existem controllers gordos? - De certa forma, sim. O Controller do projeto atual já tem uma tendência a ficar grande. Se o projeto começar a evoluir e crescer e a gente não tomar cuidado, vai acabar que o Controller, e também a View, vão ficar extremamente "gordos", acumulando funções demais e se tornando muito difíceis de dar manutenção.

4. Onde estão as regras de negócio? - As regras de negócio estão localizadas nos Services. Eles funcionam meio que como uma "ferramenta" que o Controller chama para poder executar as lógicas do sistema. Deixar isso separado num diretório próprio, onde cada arquivo tem sua própria responsabilidade focada, ajuda muito a ter uma alta coesão e um baixo nível de acoplamento.

5. Existem responsabilidades misturadas? - Com a refatoração, não mais. Antes, a lógica visual ficava meio misturada com a regra de bloqueio de pedidos, mas agora separamos bem. A View só mostra os dados e pega os cliques, o Controller só roteia, o Service faz a lógica e o Repository salva.

6. O sistema está preparado para crescer? - Sim, do jeito que está agora ele cresce de forma bem mais tranquila. Mas vale ressaltar que se o projeto começar a crescer demais, o padrão MVC vai acabar se tornando muito complicado de se manejar. Se isso acontecer, vai ser necessário fazer ajustes ou até mudar de arquitetura para que ele possa continuar crescendo sem virar uma bola de neve.
