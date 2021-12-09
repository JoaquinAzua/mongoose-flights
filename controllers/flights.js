const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
}

function index(req, res) {
    Flight.find({}, function (err, flights) {
        res.render("flights/index", {title: "All Flights", flights});
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render("movies/show", {title: "Flight Detail", flight});
   });
}

function newFlight(req, res) {
    res.render('flights/new', {title: "Add Flight"});
}

function create(req, res) {
    // remove any whitespace at start and end of airline 
    req.body.airline = req.body.airline.trim();

    const flight = new Flight(req.body);

    flight.save(function(err) {
        // refreshes blank page if theres an error
        if(err) return res.redirect('/flights/new');
        console.log(flight);
        res.redirect('/flights')
    })

}