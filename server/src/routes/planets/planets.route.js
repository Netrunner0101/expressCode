const express =require('express');

const planetsController = require('./planets.controler')

/*
    const { getAllPlanets } = require('./planets.controler')
*/

const planetsRouter = express.Router();

planetsRouter.get('/planets', planetsController.getAllPlanets);

module.exports = planetsRouter ;