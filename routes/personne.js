const express=require('express');
const router= express.Router(); 

const mysqlConnection=require('../database.js');
// configuration de cross/cors origin
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

// get toutes les personnes

router.get('/personnes',(req,res)=>{// caract par voiture, requette et reponse
    mysqlConnection.query('SELECT*FROM personnes',function(err,rows,fields)
    {
        if(!err){
            res.json(rows); // rows= lignes
        } else {
            console.log(err)
        }
    });
});
// create method



router.post('/personnes', function (req, res) {
    var params  = req.body;
    console.log(params);
    mysqlConnection.query('INSERT INTO personnes SET ?', [params], function (err, results, fields) {
       if (err) {
           console.log(err);
       }else{
           res.json("Insertion réussie")
       }
     });
 });

 // read method 

router.get('/personnes/:id',(req,res)=>{

    mysqlConnection.query('SELECT*FROM personnes WHERE id_perso =?',[req.params.id],function(err,rows,fields){
    
        if (!err){
            res.json(rows[0]);
        } else{
            console.log(err);
        }
    });
    });

// supprimer de la base 
 router.delete('/personnes/:id',function(req,res){
var par=req.id;
     mysqlConnection.query('DELETE FROM personnes WHERE id_perso =?',[req.params.id],function(err,rows,fields){
        if (err) {
            console.log(err);
        } else {
            res.json("personne enlevée")
        }
    });
});

//Mettre a jour la base 

router.put('/personnes/:id', function (req, res) {
    var params  = req.id;
   mysqlConnection.query('UPDATE personnes SET nom=?, prenom=?, email=?, ville=?, telephone=?, Age=? where id_perso=?', [req.body.nom,req.body.prenom,req.body.email,req.body.ville,req.body.telephone,req.body.Age,req.params.id], function (err, results, fields)
   {
    if (err) {
        console.log(err);
    } else {
        res.json("personne mise à jour!")
    }
	});
});

 // weeb service client par parking 

 router.get('/personnes-clients',(req,res)=>{// caract par voiture, requette et reponse
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
