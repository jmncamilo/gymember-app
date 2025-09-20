require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 6100;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});