const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const planets = require('./planet.mongo');

// const habitablePlanets = [  ];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

/**
 * New promise :
 * const promise = new Promise ((resolve,reject)=>{
 *  resolve(42);
 * });
 * promise.tehn((result)=> {})
 * const result = await promise ;
 * console.log(result);
 */

function loadPlanetData(){
    return new Promise((resolve, reject)=>
    {
            fs.createReadStream(path.join(__dirname, '..', '..', 'data' ,'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
                }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                // habitablePlanets.push(data);
                // MongoDB
                // upsert = insert + update => insert data in collection if doesn't exist
                // await planets.create({
                //     keplerName: data.kepler_data,
                // });
                savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject();
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            }
        )
    })
}

// fs.createReadStream('kepler_data.csv')
//     .pipe(parse({
//         comment: '#',
//         columns: true,
//     }))
//     .on('data', (data) => {
//         if (isHabitablePlanet(data)) {
//         habitablePlanets.push(data);
//         }
//     })
//     .on('error', (err) => {
//         console.log(err);
//         reject();
//     })
//     .on('end', () => {
//         console.log(`${habitablePlanets.length} habitable planets found!`);
//         resolve();
//     }
//   );

async function getAllPlanets(){
    return await planets.find({
        // keplerName: '',
    }
    );
}

async function savePlanet(planet){
    try{
       await planets.updateOne({
            kepler_name: planet.kepler_name,
        },{
            kepler_name: planet.kepler_name,
        },{
            upsert:true,
        });  
    }catch(err){
        console.error(`Could not save planet ${err}`);
    }
   
}

module.exports = {
    loadPlanetData,
    getAllPlanets,
    savePlanet,
}
