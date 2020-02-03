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

router.get('/factures',(req,res)=>{// caract par voiture, requette et reponse
    mysqlConnection.query('SELECT*FROM factures',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
});


// Autres methodes pour ajouter dans le corps

router.post('/factures', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO factures SET ?', [params], function (err, results, fields) {
       if (err) {
           console.log(err);
       }else{
           res.json("Insertion réussie")
       }
     });
 });
// supprimer de la base 
 router.delete('/factures/:id',function(req,res){
var par=req.id;
     mysqlConnection.query('DELETE FROM factures WHERE idfactures =?',[req.params.id],function(err,rows,fields){
        if (err) {
            console.log(err);
        } else {
            res.json("facture enlevée")
        }   
    });
});


//Mettre a jour la base 

router.put('/factures/:id', function (req, res) {
    var params  = req.id;
   mysqlConnection.query('UPDATE factures SET montant=? where idfactures=?', [req.body.montant, req.params.id], function (err, results, fields)
   {
    if (err) {
        console.log(err);
    } else {
        res.json("facture mise à jour!")
    }
	});
});


// webservice jouter une facture a une personne

router.put('/factures/:montant/:perso/:id_parkings/:id', function (req, res) {

    mysqlConnection.query('UPDATE factures SET montant=?,id_personne=?, id_parkings=? where idfactures=?', [req.params.montant,req.params.perso,req.params.id_parkings, req.params.id], function (err, results, fields)
    {
     if (err) {
         console.log(err);
     } else {
         res.json("facture ajouté!")
     }
     });
 });
 

 // weeb service creer facture par client

 router.get('/factures-clients',(req,res)=>{
    mysqlConnection.query('select nom, prenom,marque,id_park from personnes inner join voitures on personnes.id_perso=voitures.id_proprio',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
}); 
  




module.exports=router;