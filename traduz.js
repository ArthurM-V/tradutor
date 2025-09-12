const deepl = require("deepl-node");

const deeplClient = new deepl.DeepLClient(process.env.DEEPL_API_KEY);

async function traduz(texto, sentIdioma, idioma) {
  if (!texto || texto.trim() === "") throw new Error("Texto vazio!");
  try {
    const result = await deeplClient.translateText(texto, sentIdioma, idioma);
    return {
      traducao: result.text,
      idiomaDetectado: result.detectedSourceLang,
    };
  } catch (err) {
    console.error("Erro ao traduzir:", err.message);
    return null;
  }
}

module.exports = { traduz };
