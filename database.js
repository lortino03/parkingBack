// pour creer notre module de connexion
const mysql=require('mysql');
const mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'firstnode'
});

mysqlConnection.connect(function(err){
if(err){console.log(err);
    return;
}else{
console.log('connexion réussie!')
}
});
// pour exporter le module 
module.exports=mysqlConnection;
