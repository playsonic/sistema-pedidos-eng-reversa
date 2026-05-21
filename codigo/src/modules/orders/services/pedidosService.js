import { Pedidos } from '../entities/pedido.js'; 
import { Produto } from '../../products/entities/produto.js'; 
import { PedidoRepository } from '../repositories/pedidoRepository.js'; 
import { CalculadoraDeDesconto } from '../../payments/services/descontoService.js';
import { logger } from '../../../shared/utils/logger.js';
export class PedidoService {
    constructor() {
        this.pedidoAtual = new Pedidos();
        this.carregarHistorico();
    }

    async carregarHistorico() {
        try {
            const dadosSalvos = await PedidoRepository.buscarDados();

            if (dadosSalvos && dadosSalvos.itens) {
                this.pedidoAtual.itens = dadosSalvos.itens;
                this.pedidoAtual.total = dadosSalvos.total;
            }
        } catch (erro) {
            logger.erro("Erro ao carregar histórico de pedidos", erro);
        }
    }

    async adicionarPedido(categoria, sabor, qtd) {
        let novoItem = Produto.criarProduto(categoria, sabor, qtd);
        this.pedidoAtual.adicionarItem(novoItem);
        await PedidoRepository.salvarDados(this.pedidoAtual);
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