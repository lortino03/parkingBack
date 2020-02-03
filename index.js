const express=require('express');
const app= express();// exécutable de notre application, on peut utiiser var a la place const
var bodyParser=require('body-parser');

//configuration du port

app.set('port',3000);
app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//routes

app.use(require('./routes/voitures'));
app.use(require('./routes/personne'));
app.use(require('./routes/parkings'));
app.use(require('./routes/factures'))

app.listen(app.get('port'),()=>{

    console.log('serveur demarré sur le port 3000')
});