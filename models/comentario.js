'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ComentarioSchema = Schema({
    id: mongoose.Schema.Types.ObjectId,
    external_id: String,

    person: String,
    comment: String,
    publish_id: String,
    timestamp: { type: Date, default: Date.now }
   
}, false);

module.exports = mongoose.model("Comentario", ComentarioSchema);
