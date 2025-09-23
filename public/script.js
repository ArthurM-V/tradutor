const srcLingo = document.getElementById("source-lingo");
const tgtLingo = document.getElementById("target-lingo");
const dtctCont = document.querySelector(".ic--4");
const dtctLingo = document.getElementById("detected-lingo");
const tradBtn = document.getElementById("trad-btn");
const tradTxt = document.getElementById("trad-txt");
const sourceInput = document.getElementById("source-input");

const idiomasMap = {
  en: "Inglês",
  fr: "Francês",
  es: "Espanhol",
  de: "Alemão",
  pt: "Português",
  it: "Italiano",
  nl: "Holandês",
  pl: "Polonês",
  ja: "Japonês",
  zh: "Chinês",
  ru: "Russo",
  tr: "Turco",
  uk: "Ucraniano",
  bg: "Búlgaro",
  cs: "Tcheco",
  da: "Dinamarquês",
  el: "Grego",
  fi: "Finlandês",
  hu: "Húngaro",
  ro: "Romeno",
  sv: "Sueco",
  sk: "Eslovaco",
  sl: "Esloveno",
  et: "Estoniano",
  lt: "Lituano",
  lv: "Letão",
  id: "Indonésio",
  ko: "Coreano",
  no: "Norueguês",
  th: "Tailandês",
};
async function detectaIdioma() {
  let sentIdioma = "";
  let idioma = tgtLingo.value;
  const sourceTxt = sourceInput.value.trim();
  dtctCont.classList.add("hidden");
  try {
    if (srcLingo.value === "null") {
      sentIdioma = null;
    } else {
      sentIdioma = srcLingo.value;
    }
    const res = await fetch("/api/traduzir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceTxt, sentIdioma, idioma }),
    });
    const data = await res.json();
    if (data.traducao) {
      tradTxt.textContent = data.traducao;
      if (sentIdioma === null) {
        const nomeIdioma = idiomasMap[data.idiomaDetectado];
        dtctLingo.textContent = `Idioma detectado: ${nomeIdioma}`;
        dtctCont.classList.remove("hidden");
      }
    } else {
      tradTxt.textContent = "Ocorreu um erro ao traduzir, tente novamente.";
    }
  } catch (err) {
    console.log("Erro ao traduzir:", err);
  }
}

tradBtn.addEventListener("click", detectaIdioma);
