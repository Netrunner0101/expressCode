const express = require('express');

const path = require('path')

const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.route');
const { send } = require('process');

const app = express();

app.use(cors(
    {
        origin:'http://localhost:3000',
    }
));

app.use(express.json());
// When run is on server origin localhost:8000
app.use(express.static(path.join(__dirname,'..','public')));

app.use(planetsRouter);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

module.exports = app;