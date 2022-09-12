const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumer: 100,
    mission: 'kepler exploration Y',
    rocket:'Explorer ISS01',
    launchDate:new Date('December 27,2030'),
    target:'Kepler-442 b',
    customer:['ZTM','NASA'],
    updcoming: true,
    sucess: true,
};

launches.set(launch.flightNumer,launch);
launches.get(100) === launch;

function existLaunchWithId(launchId){
    return launches.has(launchId);
}

// Get
function getAllLaunches(){
    return Array.from(launches.values());
}

// POST
function addNewLaunch(launch){
    latestFlightNumber ++;
    launches.set(
            latestFlightNumber, 
            Object.assign(launch, 
            {   
                sucess: true,
                customer:['Zero to mastery','NASA'],
                updcoming: true,
                flightNumer: latestFlightNumber,
            }
        ) 
    );
}

//
function abortLaunchById(launchId){
   const aborted = launches.get(launchId);
   aborted.updcoming = false;
   aborted.sucess = false;
   return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithId,
    abortLaunchById,
}