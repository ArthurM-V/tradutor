const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { traduz } = require("./traduz");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/traduzir", async (req, res) => {
  try {
    const { sourceTxt, sentIdioma, idioma } = req.body;
    const result = await traduz(sourceTxt, sentIdioma, idioma);
    res.json({
      traducao: result.traducao,
      idiomaDetectado: result.idiomaDetectado,
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
