const { getAllLaunches,addNewLaunch, abortLaunchById , existLaunchWithId, scheduleNewLaunch} = require('../models/launches.model')

async function httpGetAllLaunches(req,res){
//    return res.status(200).json(Array.from(getAllLaunches()));
   return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req,res){
    const launch = req.body;

    launch.launchDate = new Date(launch.launchDate);
    // addNewLaunch(launch);
    await scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id);
    const existLaunch = await existLaunchWithId(launchId);
    if(!existLaunch){
       return res.status(404).json({
            error:'Launch not found',
        })  
    }
    const aborted = abortLaunchById(launchId);
    if(!aborted)
    {
        return res.status(400).json({
            error:'Launch abordted',
        });
    }    
    return res.status(200).json({
        ok:'Launch is ok',
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}