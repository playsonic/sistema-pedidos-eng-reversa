export class WhatsappService {

    static TOKEN = process.env.WHATSAPP_TOKEN;
    static PHONE_ID = process.env.WHATSAPP_PHONE_ID;

    static async enviarMensagem(numeroDestino, texto) {
        try {
            const url = `https://graph.facebook.com/v17.0/${this.PHONE_ID}/messages`;

            const corpo = {
                messaging_product: "whatsapp",
                to: numeroDestino.replace(/\D/g, ''),
                type: "text",
                text: { body: texto }
            };

            const resposta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(corpo)
            });

            if (!resposta.ok) {
                const erroDetalhado = await resposta.json();
                console.error("Erro na API do WhatsApp:", erroDetalhado);
                throw new Error("Falha ao enviar mensagem no WhatsApp.");
            }

            return true;

        } catch (erro) {
            console.error("Erro interno no WhatsappService:", erro.message);
            throw erro;
        }
    }
}