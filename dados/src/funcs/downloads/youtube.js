/**
 * YouTube Download - APENAS API NODZ
 * Implementação simplificada usando apenas a API Nodz para download de áudio e vídeo
 * 
 * SEM SISTEMA DE CACHE - cada requisição baixa um novo arquivo
 */

import axios from 'axios';
import yts from 'yt-search';

// ============================================
// CONFIGURAÇÕES
// ============================================

const CONFIG = {
  TIMEOUT: 60000,                           // Timeout para requisições (60 segundos)
  DOWNLOAD_TIMEOUT: 180000,                  // Timeout para download de arquivos (180 segundos)
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Extrai o ID do vídeo do YouTube de uma URL
 * @param {string} url - URL do vídeo do YouTube
 * @returns {string|null} ID do vídeo ou null se não encontrado
 */
function getYouTubeVideoId(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|v\/|embed\/|user\/[^\/\n\s]+\/)?(?:watch\?v=|v%3D|embed%2F|video%2F)?|youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Formata segundos em string de duração (HH:MM:SS ou MM:SS)
 * @param {number} seconds - Segundos totais
 * @returns {string} Duração formatada
 */
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// DOWNLOAD COM API NODZ (ÁUDIO)
// ============================================

/**
 * Download de áudio usando a API Nodz
 * @param {string} url - URL do vídeo do YouTube
 * @returns {Promise<Object>} Resultado do download
 */
async function DownloadNodzAudio(url) {
  try {
    console.log(`🚀 [NodzAPI] Baixando mp3...`);
    
    const { data } = await axios.get('https://apisnodz.com.br/api/downloads/youtube/audio', {
      params: { url: url },
      timeout: CONFIG.TIMEOUT
    });
    
    if (!data.success || !data.resultado || !data.resultado.url) {
      throw new Error(data.message || 'API Nodz retornou erro');
    }
    
    const resultado = data.resultado;
    
    console.log(`📥 [NodzAPI] Baixando arquivo de áudio...`);
    const fileResponse = await axios.get(resultado.url, {
      responseType: 'arraybuffer',
      timeout: CONFIG.DOWNLOAD_TIMEOUT,
      headers: {
        'User-Agent': CONFIG.USER_AGENT
      }
    });
    
    const buffer = Buffer.from(fileResponse.data);
    
    console.log(`✅ [NodzAPI] Download de áudio concluído: ${resultado.titulo}`);
    
    return {
      success: true,
      buffer,
      title: resultado.titulo || 'YouTube Audio',
      thumbnail: resultado.thumbnail || null,
      quality: resultado.qualidade || '128 kbps',
      filename: resultado.filename || `${resultado.titulo || 'audio'}.mp3`,
      tempo: resultado.tempo || 0,
      source: 'nodzapi'
    };
    
  } catch (error) {
    console.error(`❌ [NodzAPI] Erro no áudio:`, error.message);
    return { 
      success: false, 
      error: error.message, 
      source: 'nodzapi'
    };
  }
}

// ============================================
// DOWNLOAD COM API NODZ (VÍDEO)
// ============================================

/**
 * Download de vídeo usando a API Nodz
 * @param {string} url - URL do vídeo do YouTube
 * @param {string} qualidade - Qualidade desejada (ex: 360p, 720p, 1080p)
 * @returns {Promise<Object>} Resultado do download
 */
async function DownloadNodzVideo(url, qualidade = '360p') {
  try {
    console.log(`🚀 [NodzAPI] Baixando vídeo em ${qualidade}...`);
    
    const { data } = await axios.get('https://apisnodz.com.br/api/downloads/youtube/video', {
      params: { 
        url: url,
        qualidade: qualidade 
      },
      timeout: CONFIG.TIMEOUT
    });
    
    if (!data.success || !data.resultado || !data.resultado.url) {
      throw new Error(data.message || 'API Nodz retornou erro');
    }
    
    const resultado = data.resultado;
    
    console.log(`📥 [NodzAPI] Baixando arquivo de vídeo...`);
    const fileResponse = await axios.get(resultado.url, {
      responseType: 'arraybuffer',
      timeout: CONFIG.DOWNLOAD_TIMEOUT,
      headers: {
        'User-Agent': CONFIG.USER_AGENT
      }
    });
    
    const buffer = Buffer.from(fileResponse.data);
    
    console.log(`✅ [NodzAPI] Download de vídeo concluído: ${resultado.titulo}`);
    
    return {
      success: true,
      buffer,
      title: resultado.titulo || 'YouTube Video',
      thumbnail: resultado.thumbnail || null,
      quality: resultado.qualidade || qualidade,
      filename: resultado.filename || `${resultado.titulo || 'video'} (${qualidade}).mp4`,
      tempo: resultado.tempo || 0,
      source: 'nodzapi'
    };
    
  } catch (error) {
    console.error(`❌ [NodzAPI] Erro no vídeo:`, error.message);
    return { 
      success: false, 
      error: error.message, 
      source: 'nodzapi'
    };
  }
}

// ============================================
// FUNÇÕES PÚBLICAS (API) - SEM CACHE
// ============================================

/**
 * Pesquisa vídeos no YouTube (SEM CACHE)
 * @param {string} query - Termo de pesquisa
 * @returns {Promise<Object>} Resultado da pesquisa
 */
async function search(query) {
  try {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return { ok: false, msg: 'Termo de pesquisa inválido' };
    }

    // SEM CACHE - sempre faz nova pesquisa
    const results = await yts(query);
    const video = results?.videos?.[0];

    if (!video) {
      return { ok: false, msg: 'Nenhum vídeo encontrado' };
    }

    const seconds = Number.isFinite(video.seconds) ? video.seconds : 0;
    const timestamp = video.timestamp || formatDuration(seconds);

    const result = {
      criador: 'Hiudy',
      data: {
        videoId: video.videoId || video.id || '',
        url: video.url,
        title: video.title,
        description: video.description || '',
        image: video.image || video.thumbnail || '',
        thumbnail: video.thumbnail || video.image || '',
        seconds,
        timestamp,
        duration: { seconds, timestamp },
        ago: video.ago || video.uploadedAt || '',
        views: video.views || 0,
        author: {
          name: video.author?.name || 'Unknown',
          url: video.author?.url || ''
        }
      }
    };

    return { ok: true, ...result };
  } catch (error) {
    console.error('Erro na busca YouTube:', error.message);
    return { ok: false, msg: 'Erro ao buscar vídeo: ' + error.message };
  }
}

/**
 * Download de áudio (MP3) - APENAS NODZ - SEM CACHE
 * @param {string} url - URL do vídeo do YouTube
 * @returns {Promise<Object>} Resultado do download
 */
async function mp3(url) {
  try {
    const id = getYouTubeVideoId(url);
    if (!id) {
      return { ok: false, msg: 'URL inválida do YouTube' };
    }

    // SEM CACHE - cada requisição baixa um novo arquivo
    const videoUrl = `https://youtube.com/watch?v=${id}`;
    
    const result = await DownloadNodzAudio(videoUrl);
    
    if (!result.success || !result.buffer) {
      return {
        ok: false,
        msg: result.error || 'Erro ao processar áudio'
      };
    }

    const downloadResult = {
      criador: 'Hiudy',
      buffer: result.buffer,
      title: result.title,
      thumbnail: result.thumbnail,
      quality: result.quality || 'mp3',
      filename: result.filename || `${result.title || 'audio'}.mp3`,
      source: result.source,
      tempo: result.tempo || 0
    };

    return { ok: true, ...downloadResult };
  } catch (error) {
    console.error('Erro no download MP3:', error.message);
    return { ok: false, msg: 'Erro ao baixar áudio: ' + error.message };
  }
}

/**
 * Download de vídeo (MP4) - APENAS NODZ - SEM CACHE
 * @param {string} url - URL do vídeo do YouTube
 * @param {string} qualidade - Qualidade desejada (360p, 720p, 1080p)
 * @returns {Promise<Object>} Resultado do download
 */
async function mp4(url, qualidade = '360p') {
  try {
    const id = getYouTubeVideoId(url);
    if (!id) {
      return { ok: false, msg: 'URL inválida do YouTube' };
    }

    // SEM CACHE - cada requisição baixa um novo arquivo
    const videoUrl = `https://youtube.com/watch?v=${id}`;
    
    const result = await DownloadNodzVideo(videoUrl, qualidade);
    
    if (!result.success || !result.buffer) {
      return {
        ok: false,
        msg: result.error || 'Erro ao processar vídeo'
      };
    }

    const downloadResult = {
      criador: 'Hiudy',
      buffer: result.buffer,
      title: result.title,
      thumbnail: result.thumbnail,
      quality: result.quality || qualidade,
      filename: result.filename || `${result.title || 'video'} (${qualidade}).mp4`,
      source: result.source,
      tempo: result.tempo || 0
    };

    return { ok: true, ...downloadResult };
  } catch (error) {
    console.error('Erro no download MP4:', error.message);
    return { ok: false, msg: 'Erro ao baixar vídeo: ' + error.message };
  }
}

// ============================================
// EXPORTS
// ============================================

export { search, mp3, mp4, DownloadNodzAudio, DownloadNodzVideo };
export const ytmp3 = mp3;
export const ytmp4 = mp4;