var express = require('express');
var router = express.Router();
var passport = require('passport');
var publicacionController = require('../controllers/PublicacionController');
var rootsController = require('../controllers/Roots');
var publicacion = new publicacionController();
var roots = new rootsController();

var sw = require('../controllers/sw');
var SW = new sw();

var cuenta = require('../controllers/cuentaController');
var cuentaC = new cuenta();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Universidad Nacional de Loja' });
});

router.post('/like/:external', publicacion.like);

router.get('/publicacion/:external', publicacion.verPublicacion);

//router.post('/publicacion/:external/comment', publicacion.comment);

router.post('/publicacion/:external', publicacion.eliminar);

router.post('/publicar', publicacion.guardar);

router.get('/perfil', roots.perfil);
router.get('/mensajes', roots.mensajes);
//rutas de funciones de usuario
router.get('/login', roots.getLogin);
router.get('/registro', roots.getReg);
router.get('/listasw/areas', SW.getListaAreas);
router.get('/listasw/carreras', SW.getListaCarreras);
router.post('/registro/save', cuentaC.signUp);
router.get('/verificar', cuentaC.getVerification);
router.post('/verificar/update', cuentaC.verificarCuenta);
router.post('/inicio_sesion',
        passport.authenticate('local-signin',
                {successRedirect: '/',
                    failureRedirect: '/',
                    failureFlash: true}
        ));



router.post('/publicarFile', publicacion.guardarFile);
router.get('/principal', publicacion.visualizar);
module.exports = router;
