// const Sequelize = require('sequelize');
const db = require('../models')

const Events = db.events;

const createEvent = async (req, res)=>{
    const events = await Events.create({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location
    });
    res.status(200).json(events);
    // res.status(200).send(events)

}

module.exports = {
    createEvent
}