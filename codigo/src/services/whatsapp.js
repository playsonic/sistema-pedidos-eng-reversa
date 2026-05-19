export class WhatsappService {
    
    static gerarLinkWaMe(numeroDestino, texto) {
        const numeroLimpo = numeroDestino.replace(/\D/g, '');

        const textoCodificado = encodeURIComponent(texto);

        return `https://wa.me/${numeroLimpo}?text=${textoCodificado}`;
    }
}