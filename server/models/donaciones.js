const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let donacionSchema = new Schema({
  titulo_donacion: String,
  descripcion_donacion: String,
  cuenta_bancaria: Number,
  banco: String,
  fecha_inicio: Date,
  fecha_final: Date,
  imagen: String,
});

module.exports = mongoose.model("Donacion", donacionSchema);
