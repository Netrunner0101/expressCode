const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');

const habitablePlanets = [  ];

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
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject();
            })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets found!`);
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

module.exports = {
    loadPlanetData,
    planets: habitablePlanets
}
