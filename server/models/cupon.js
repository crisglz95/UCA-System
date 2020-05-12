const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cuponSchema = new Schema({
  titulo_cupon: String,
  decripcion: String,
  codigo: String,
  tipo_cupon: {
    type: String,
    enum: ["descuentos", "promociones", "envios"],
  },
  minimo_compra: String,
  valido_persona: {
    type: String,
    enum: ["personas", "estudiantes"],
  },
  condiciones: String,
  empresa: String,
  //   imagen_cupon: String,
});

module.exports = mongoose.model("cupon", cuponSchema);
