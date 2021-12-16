const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

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
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render("flights/show", {title: "Flight Detail", flight, tickets});
        });
   });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', {title: "Add Flight", departsDate });

}


function create(req, res) {
    // remove any whitespace at start and end of airline 
    req.body.airline = req.body.airline.trim();

    const flight = new Flight(req.body);

    flight.save(function(err) {
        // refreshes blank page if theres an error
        if(err) return res.redirect('/flights/new');
        console.log(flight);
        res.redirect(`/flights/${flight._id}`)
    });
}