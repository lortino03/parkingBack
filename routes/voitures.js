const express=require('express');
const router= express.Router(); // composannt d'express qui va déclarer ou assginer 

const mysqlConnection=require('../database.js');
// configuration de cross/cors origin
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

// webserice get : chercher toutes les voitures

router.get('/voitures',(req,res)=>{// caract par voiture, requette et reponse
    mysqlConnection.query('SELECT*FROM voitures',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
});

// Autres methodes 

router.get('/voitures/:id',(req,res)=>{

mysqlConnection.query('SELECT*FROM voitures WHERE id =?',[req.params.id],function(err,rows,fields){

    if (!err){
        res.json(rows[0]);
    } else{
        console.log(err);
    }
});
});

// Autres methodes pour ajouter dans le corps

router.post('/voitures', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO voitures SET ?', [params], function (err, results, fields) {
       if (err) {
           console.log(err);
       }else{
           res.json("Insertion réussie")
       }
     });
 });
// supprimer de la base 
 router.delete('/voitures/:id',function(req,res){
var par=req.id;
     mysqlConnection.query('DELETE FROM voitures WHERE id =?',[req.params.id],function(err,rows,fields){
        if (err) {
            console.log(err);
        } else {
            res.json("voiture enlevée")
        }   
    });
});


//Mettre a jour la base 

router.put('/voitures/:id', function (req, res) {
    var params  = req.id;
   mysqlConnection.query('UPDATE voitures SET matricule=?, marque=? where id=?', [req.body.matricule,req.body.marque, req.params.id], function (err, results, fields)
   {
    if (err) {
        console.log(err);
    } else {
        res.json("voiture mise à jour!")
    }
	});
});

// webservice affichage avec propriétaire

router.get('/voitures/:id_perso',(req,res)=>{

    mysqlConnection.query('SELECT*FROM voitures WHERE id_perso =?',[req.params.id_perso],function(err,rows,fields){
    
        if (!err){
            res.json(rows);
        } else{
            console.log(err);
        }
    });
    });


// webservice ajouter un proprietaire  a voiure via la console body pour l'ajout

    router.put('/voitures/proprio/:id', function (req, res) {

       mysqlConnection.query('UPDATE voitures SET id_proprio=? where id=?', [req.body.id_proprio, req.params.id], function (err, results, fields)
       {
        if (err) {
            console.log(err);
        } else {
            res.json("proprietaire ajouté!")
        }
        }); 
    });


// webservice ajouter une voiture a un parking

router.put('/voitures-park/parking/:id', function (req, res) {

    mysqlConnection.query('UPDATE voitures SET id_park=? where id=?', [req.body.id_park, req.params.id], function (err, results, fields)
    {
     if (err) {
         console.log(err);
     } else {
         res.json("voiture ajouté au parking!")
     
     }
     });
 });


module.exports=router;
