const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let empresaSchema = new Schema({
  nombre_completo: String,
  correo: {
    type: String,
    unique: true,
    // required: [true, 'El correo electronico es necesario']
  },
  nombre_empresa: String,
  tel: Number,
  giro_empresarial: String,
  cuenta_bancaria: Number,
  matricula: String,
  carrera: String,
  descripcion_empresa: String,
  calle: String,
  cp: Number,
  numero_dir: String,
  estado: String,
  municipio: String,
  password: String,
  imagen: String,
  status: {
    type: Boolean,
    default: false,
  },
  administrador: {
    type: Boolean,
    default: false,
  },
});

// empresaSchema.plugin(uniqueValidator, {
//     message: '{PATH} debe de ser unico'
// });

module.exports = mongoose.model("Formulario_Empresa", empresaSchema);
