const launches = new Map();

const launchesDatabase = require('./launches.mongo');
const planets = require('./planet.mongo');

const DEFAULT_FLIGHT_NUMBER =100;

let latestFlightNumber = 100;

const launch = {
    flightNumer: 100,
    mission: 'kepler exploration Y',
    rocket:'Explorer ISS01',
    launchDate:new Date('December 27,2030'),
    target:'Kepler-452 b',
    customers:['ZTM','NASA'],
    updcoming: true,
    sucess: true,
};

saveLaunch(launch);
// launches.set(launch.flightNumer,launch);
launches.get(100) === launch;

async function existLaunchWithId(launchId){
    // FindById mongosse is object id
    return await launchesDatabase.findOne({
        flightNumer: launchId,
    });
}

// Get
// function getAllLaunches(){
//     return Array.from(launches.values());
// }

// Get Mongoose 
async function getAllLaunches(){
    return await launchesDatabase
    .find({},{'_id':0,'__v':0});
}

// Save
async function saveLaunch(launch){
    const planet = await planets.findOne({
        kepler_name: launch.target,
    });

    // signal error
    if(!planet){
        throw new Error('No matching planet found !');
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumer: launch.flightNumer,
    },
        launch
    ,{
        upsert:true,
    })
};

// GET Latest flight number
// Take all launches and sort the highest to lowest
async function getLatestFlightNumber(){
   const latestLaunch = await launchesDatabase
   .findOne()
   .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch;
}

// POST
// function addNewLaunch(launch){
//     latestFlightNumber ++;
//     launches.set(
//             latestFlightNumber, 
//             Object.assign(launch, 
//             {   
//                 sucess: true,
//                 customer:['Zero to mastery','NASA'],
//                 updcoming: true,
//                 flightNumer: latestFlightNumber,
//             }
//         ) 
//     );
// }

// New Post

async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber()+1;
    const newLaunch = Object.assign({
        sucess: true,
        customer:['Zero to mastery','NASA'],
        updcoming: true,
        sucess: true,
        flightNumer: newFlightNumber,
    });
    return await saveLaunch(newLaunch);
}

//
async function abortLaunchById(launchId){
    // No upsert:tru because check already made
    const aborted = await launchesDatabase.updateOne({
        flightNumer: launchId
    },{
        updcoming:false,
        sucess:false,
    });
    // return aborted.ok === 1 && aborted.nModified === 1 ;
    // mongoose 6 and up
    return aborted.modifiedCount === 1;
//    const aborted = launches.get(launchId);
//    aborted.updcoming = false;
//    aborted.sucess = false;
//    return aborted;
}

module.exports = {
    getAllLaunches,
    existLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
}