const http = require('http');

const app = require('./app');
const { loadPlanetData } = require('./routes/models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

// Be careful Not await outside function because not recognize PROMISE !!
async function startServer(){
    await loadPlanetData();

    server.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}... `)
    });
} 

startServer();


