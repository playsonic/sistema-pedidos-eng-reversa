import { Produto } from '../../products/entities/produto.js';
import { Pedidos } from '../../orders/entities/pedido.js';
import { PedidoSalvar } from '../repositories/pedidoRepository.js';
import { CalculadoraDeDesconto } from '../../payments/services/CalculadoraDeDesconto.js'; 

export class PedidoService {
    constructor() {
        this.pedidoAtual = new Pedidos();
        this.carregarHistorico();
    }

    async carregarHistorico() {
        try {
            const dadosSalvos = await PedidoSalvar.buscarDados();

            if (dadosSalvos && dadosSalvos.itens) {
                this.pedidoAtual.itens = dadosSalvos.itens;
                this.pedidoAtual.total = dadosSalvos.total;
            }
        } catch (erro) {
            console.error("Erro ao carregar histórico de pedidos:", erro);
        }
    }

    async adicionarPedido(categoria, sabor, qtd) {
        let novoItem = Produto.criarProduto(categoria, sabor, qtd);

        this.pedidoAtual.adicionarItem(novoItem);

        await PedidoSalvar.salvarDados(this.pedidoAtual);
    }

    obterTotalFinal() {
        const totalAtual = this.pedidoAtual.total;

        const estrategiaDesconto = CalculadoraDeDesconto.obterEstrategia(totalAtual);


        return this.pedidoAtual.precoFinal((valor) => estrategiaDesconto.calcular(valor));
    }


    async limparPedidos() {
        this.pedidoAtual.limpar();
        await PedidoSalvar.salvarDados(this.pedidoAtual);
    }

    async removerUltimoItem() {
        this.pedidoAtual.removerUltimo();
        await PedidoSalvar.salvarDados(this.pedidoAtual);
    }
}


export const services = new PedidoService();