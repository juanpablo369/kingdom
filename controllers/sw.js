'use strict';

class sw {
    /**
     * @api {get} /listasw/areas Permite listar Facultades
     * @apiName getListaAreas
     * @apiGroup SW
     *
     * @apiParam {req} req el objeto de peticion
     * @apiParam {res} res el objeto de respuetas
     * @apiSuccess {area} Devuelve una lista de facultades de la U.
     * 
     */
    getListaAreas(req, res) {
        var areas = {"area":
                    ["Facultad de la educacion",
                        "Facultad de la energia",
                        "Facultad de salud humana",
                        "Facultad juridica social y administrativa",
                        "Facultad agropecuaria"]};
        res.status(200).json(areas);
    }
    /**
     * @api {get} /listasw/carreras Permite listar carreras
     * @apiName getListaCarreras
     * @apiGroup SW
     *
     * @apiParam {req} req es el objeto de peticion
     * @apiParam {res} res es el objeto de respuetas
     * @apiSuccess {carreras} Devuelve una lista de carreras de cada facultad de la U.
     *
     */
    getListaCarreras(req, res) {
        var carrera = req.query.carrera;
        var carreras = {"Facultad de la educacion": ["Psicologia Infantil", "Psicorehabilitacion", "Ingles", "Cultura fisica", "Artes Plasticas", "Comunicacion social"],
            "Facultad de la energia": ["Sistemas", "Electronica", "Electromecanica", "Geologia"],
            "Facultad de salud humana": ["Enfermeria", "Laboratorio clinico", "Medicina humana", "Psicologia clinica", "Odontologia"],
            "Facultad juridica social y administrativa": ["Administracion de empresas", "Derecho", "Economia", "Administracion publica", "Turismo"],
            "Facultad agropecuaria": ["Ingenieria Forestal", "Ingenieria agricola", "Medicina veterinaria", "Ingenieria Agronomica"]};
        res.status(200).json(carreras[carrera]);
    }
}
module.exports = sw;
