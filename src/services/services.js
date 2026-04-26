import { Pedidos, ItemPedido } from '../models/entidade';
import { PedidoSalvar } from '../models/entidade';

export class PedidoService {
    constructor() {
        this.Pedidos = new Pedidos();
    }

    adicionarPedido(produto, qtd) {
        let novoItem = ItemPedido.criarItem(produto, qtd);
        this.Pedidos.adicionarItem(novoItem);

        PedidoSalvar.salvarDados(this.Pedidos)
        
    }

    obterTotalFinal() {
        
        return Pedidos.precoFinal(); 
    }

    limparPedidos() {
        this.Pedidos.limpar();
    }

    removerUltimoItem() {
        this.Pedidos.removerUltimo();
    }
}
