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
    fecha_inicio: String,
    fecha_final: String,
    imagen_cupon: String,
    empresa: { type: Schema.Types.ObjectId, ref: 'Formulario_Empresa' },
    eliminado: Boolean
});

module.exports = mongoose.model("cupon", cuponSchema);