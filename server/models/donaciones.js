const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let donacionSchema = new Schema({
    titulo_donacion: String,
    descripcion_donacion: String,
    cuenta_bancaria: Number,
    banco: String,
    fecha_inicio: String,
    fecha_final: String,
    imagen: String,
    empresa: { type: Schema.Types.ObjectId, ref: 'Formulario_Empresa' }
});

module.exports = mongoose.model("Donacion", donacionSchema);