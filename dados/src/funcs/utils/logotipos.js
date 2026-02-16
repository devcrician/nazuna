/*
 * Logotipos usando api Nodz
 * Função usando axios para requisição
 */

import axios from 'axios';

const CONFIG = {
  API_URL: 'https://apisnodz.com.br/api/logotipos',
  headers: ' '
}

class Logos {
  constructor(texto, modelo) {
    this.texto = texto;
    this.modelo = modelo;
  }
  
  async gerarLogotipo() {
    try {
      if (!this.texto) {
        throw new Error('Texto não fornecido');
      }
      
      // Lista de modelos disponíveis para validação
      const modelos = [
        'darkgreen', 'glitch', 'write', 'advanced', 'typography', 
        'pixel', 'neon', 'flag', 'americanflag', 'deleting'
      ];
      
      // Validar modelo
      if (!modelos.includes(this.modelo)) {
        throw new Error(`Modelo "${this.modelo}" não é válido`);
      }
      
      // Codificar o texto para URL
      const textoCodificado = encodeURIComponent(this.texto);
      
      // Fazer requisição para a API
      const response = await axios({
        url: `${CONFIG.API_URL}/${this.modelo}?text=${textoCodificado}`,
        method: 'GET',
        responseType: 'json',
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      // Verificar se a resposta foi bem sucedida
      if (response.data && response.data.success) {
        return {
          success: true,
          imageUrl: response.data.resultado.imagem,
          message: response.data.message
        };
      } else {
        throw new Error('Resposta inválida da API');
      }
      
    } catch (e) {
      console.error('Erro na API de logotipos:', e);
      return {
        success: false,
        error: e.message || 'Erro ao gerar logotipo'
      };
    }
  }
}

export default Logos;
export { Logos };