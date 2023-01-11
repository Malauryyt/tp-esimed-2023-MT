console.log('coucou')

const express = require('express');
const app = express();
const router = express.Router();

const port = 3000;
const users = [];
let cpt = 0;


//récupération de chaque requete

const infoReq = [];
app.use((req,res,next) =>{

    infoReq.IP = req.ip;
    infoReq.DATE = req.route;
    infoReq.TIME = req.;

    users.push(req.body);
    next();
});

app.use(express.json());
// récupération des user
app.get('/users', (req, res) => {
    res.send(users);
});
//récupération des user via firstname
app.get('/users/:firstName', (req, res) => {
    const foundUser = users.find((user) => user.firstName == req.params.firstName);
    res.send(foundUser);
});

// remplissage du tab user
app.post('/users', (req, res) => {
    const newUser = req.body
    newUser.id = cpt;

    users.push(req.body);

    cpt++;
    res.sendStatus(201);
});

// modification du user
app.put('/users/:id', (req, res) => {
    const foundUser = users.find((user) => user.id == req.params.id);
    foundUser.firstName = req.body.firstName;
    foundUser.lastName = req.body.lastName;
    res.sendStatus(204);
});
// delete du user
app.delete('/users/:id', (req, res) => {
    const foundIndex = users.findIndex((user) => user.id == req.params.id);
    users.splice(foundIndex, 1);
    res.sendStatus(204);
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
