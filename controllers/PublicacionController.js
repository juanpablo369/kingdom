'use strict';
const uuidv4 = require('uuid');
var mongoose = require('mongoose');
var fs = require('fs-extra');
var path = require('path');
var md5 = require('md5');
var moment = require('moment');
var Publicacion = require('../models/publicacion');
var Comentario = require('../models/comentario');

class PublicacionController {
    
    guardar(req, res) {

		new Publicacion({
			id: new mongoose.Types.ObjectId(),
                    
            publish: req.body.publicacion,
					
            external_id: uuidv4()
        }).save(function (err, newPublicacion) {
             
            if(err) {
				res.send(err);
            }else if(newPublicacion) {
			    res.redirect('/principal');           
			}
                    
        });
    }
    
    guardarFile(req, res) {
		
		var imgUrl = uuidv4();
		var imageTempPath = req.file.path;
		var ext = path.extname(req.file.originalname).toLowerCase();
		var targetPath = path.resolve(`public/upload/${imgUrl}${ext}`);
		fs.rename(imageTempPath, targetPath);

		new Publicacion({
			id: new mongoose.Types.ObjectId(),
                    
            title: req.body.title,
			description: req.body.description,
			filename: imgUrl + ext,
			ext: ext,
					
            external_id: uuidv4()
        }).save(function (err, newPublicacion) {
             
            if(err) {
				res.send(err);
            }else if(newPublicacion) {
			    res.redirect('/principal');           
			}
                    
        });
    }
    
    visualizar(req, res) {
		
		Publicacion.find({}, (error, publish) => {
			res.render('main', {publish, title: 'Uneleate'});
		}).sort({ timestamp: -1 });
    }
    
    verPublicacion(req, res) {

		Publicacion.findOne({external_id: req.params.external}, (error, publish) => {
			if(publish){
				publish.views = publish.views + 1;
				publish.save();
				Comentario.find({publish_id: req.params.external}, (error, comment) => {
					var timeago = moment(publish.timestamp).startOf('minute').fromNow();
					res.render('usuario/publicacion', {timeago, publish, comment, title: publish.title});
				});
			}else{
				res.redirect('/principal');
			}
		});
    }
    /*
    comment = async(req, res) => {
		
		 const publicacion = await Publicacion.findOne({external_id: req.params.external});
			if(publicacion){
				const newcomentario = new Comentario(req.body);
				newcomentario.publish_id = publicacion.external_id;
				await newcomentario.save();
				console.log(newcomentario);
				res.redirect('/publicacion/' + publicacion.external_id);
			}else{
				res.redirect('/principal');
			}
    };*/
    
    like(req, res) {
		Publicacion.findOne({id: req.body.external}, function (err, publish){
		  publish.likes = publish.likes + 1;
		  publish.save(function (err, publish) {     
            if(err) {
				res.send(err);
            }else if(publish) {
			    res.redirect('/principal');           
			}
		  });       
        });
    }
    
    like1(req, res) {
		Publicacion.findOne({external_id: req.params.external}, function (err, publish){
			publish.likes = publish.likes + 1;
			publish.save(function (err, publish) {     
				if(err) {
					res.send(err);
				}else if(publish) {
					res.json({likes: publish.likes});           
				}
			}); 
		});
    }

    eliminar(req, res) {
		Publicacion.findOne({external_id: req.params.external}, function (err, publish){
			if(publish.ext){
				fs.unlink(path.resolve('./public/upload/'+publish.filename));
				Comentario.deleteOne({publish_id: req.params.external}, function (err, comment){});
				publish.remove(function (err, publish) {}); 
				res.redirect('/principal');
			}else{
				Comentario.deleteOne({publish_id: req.params.external}, function (err, comment){});
				publish.remove(function (err, publish) {});
				res.redirect('/principal');
			}
		});
    }
}
module.exports = PublicacionController;



