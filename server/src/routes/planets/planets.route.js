const express =require('express');

const { httpGetAllPlanets } = require('./planets.controler')

/*
    const { getAllPlanets } = require('./planets.controler')
*/

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter ;