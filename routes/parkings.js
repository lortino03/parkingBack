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

router.get('/parkings',(req,res)=>{// caract par voiture, requette et reponse
    mysqlConnection.query('SELECT * FROM parkings',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
});

// Autres methodes 

router.get('/parkings/:idparkings',(req,res)=>{

mysqlConnection.query('SELECT * FROM parkings WHERE idparkings =?',[req.params.idparkings],function(err,rows,fields){

    if (!err){
        res.json(rows[0]);
    } else{
        console.log(err);
    }
});
});

// Autres methodes pour ajouter dans le corps

router.post('/parkings', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO parkings SET ?', [params], function (err, results, fields) {
       if (err) {
           console.log(err);
       }else{
           res.json("Insertion réussie")
       }
     });
 });
// supprimer de la base 
 router.delete('/parkings/:id',function(req,res){
var par=req.id;
     mysqlConnection.query('DELETE FROM parkings WHERE idparkings =?',[req.params.id],function(err,rows,fields){
        if (err) {
            console.log(err);
        } else {
            res.json("parking enlevée")
        }   
    });
});


//Mettre a jour le parkings 

router.put('/parkings/:id', function (req, res) {
    var params  = req.id;
   mysqlConnection.query('UPDATE parkings SET nbrePlace=?, tarifPlace=? where idparkings=?', [req.body.nbrePlace,req.body.tarifPlace, req.params.id], function (err, results, fields)
   {
    if (err) {
        console.log(err);
    } else {
        res.json("parking mise à jour!")
    }
	});
});

// webservice ajouter un parking a voiture via la console body pour l'ajout

router.put('/parkings/:voit/:id', function (req, res) {

    mysqlConnection.query('UPDATE parkings SET id_park=? where id=?', [req.params.id_park, req.params.id], function (err, results, fields)
    {
     if (err) {
         console.log(err);
     } else {
         res.json("parking ajouté!")
     }
     });
 });
 // webservice inner join 

 router.get('/parkings',(req,res)=>{// caract par voiture, requette et reponse
    
    mysqlConnection.query('SELECT*FROM parkings',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
});


 // weeb service client par parking 

 router.get('/parkings-clients',(req,res)=>{// caract par voiture, requette et reponse
    mysqlConnection.query('select nom, prenom,marque,id_park from personnes inner join voitures on personnes.id_perso=voitures.id_proprio',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
}); 
  
router.get('/parkings/compter-voiture/:idParking/:idClient', (req,res) => {
    mysqlConnection.query('SELECT count(*) nombre FROM personnes INNER JOIN voitures ON (personnes.id_perso=voitures.id_proprio) WHERE (id_park=? AND id_proprio=?);', 
    [req.params.idParking,req.params.idClient], function(err,rows,fields) {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    })
 });

    module.exports=router;