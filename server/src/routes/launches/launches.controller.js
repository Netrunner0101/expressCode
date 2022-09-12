const { getAllLaunches,addNewLaunch, abortLaunchById , existLaunchWithId} = require('../models/launches.model')

function httpGetAllLaunches(req,res){
   return res.status(200).json(Array.from(getAllLaunches()));
}

function httpAddNewLaunch(req,res){
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);

    addNewLaunch(launch);

    return res.status(201).json(launch);
}

function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id);

    if(!existLaunchWithId(launchId)){
       return res.status(404).json({
            error:'Launch not found',
        })  
    }
   
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}