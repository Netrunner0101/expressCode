const express = require('express');

const path = require('path')
const morgan = require('morgan')
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.route');
const launchesRouter = require('./routes/launches/launches.router');

const { send } = require('process');

const api = require('./routes/api');

const app = express();

app.use(cors(
    {
        origin:'http://localhost:3000',
    }
));

app.use(morgan('combined'));

app.use(express.json());
// When run is on server origin localhost:8000
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/v1',api);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})

module.exports = app;