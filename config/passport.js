//var models = require('./../models');
var persona = require('../models/persona');
var cuenta = require('../models/cuenta');
module.exports = function (passport) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelo    
    var LocalStrategy = require('passport-local').Strategy;
    //Permite serializar los datos de cuenta
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // Permite deserialize la cuenta de usuario
    passport.deserializeUser(function (id, done) {
        
    });    
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;
                Cuenta.findOne({'correo': email}, (err, cuenta)=>{
                    if (!cuenta) {
                        return done(null, false, {message: req.flash('error', 'Cuenta no existe')});
                    }
                    if (cuenta.clave !== password) {
                        return done(null, false, {message: req.flash('error', 'Clave incorrecta')});
                    }
                    if (!user.active) {
                        return done(null, false, { message: 'Sorry, you must validate email first' });
                    }
                    var userinfo = cuenta.get();                                  
                    return done(null, userinfo);
                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: req.flash('error', 'Cuenta erronea')});
                });
                
            }
    ));
}
