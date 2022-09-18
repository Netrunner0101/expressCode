const http = require('http');

const app = require('./app');

const mongoose = require('mongoose');

const { loadPlanetData } = require('./routes/models/planets.model');

const MONGO_URL = 'mongodb+srv://majesticjoe:LEGOMAN85207410@cluster0.aub34b3.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// Be careful Not await outside function because not recognize PROMISE !!
async function startServer(){

    await mongoose.connect(MONGO_URL,{
        
    });

    await loadPlanetData();

    server.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}... `)
    });

} 

startServer();


