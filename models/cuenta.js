'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuentaSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    external_id: String,
    correo: String,
    secretToken: String,
    clave: String,
    activo: {
        type: Boolean,
        default: false
    },
    persona:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
    }  
}, false);

module.exports = mongoose.model("Cuenta", CuentaSchema);