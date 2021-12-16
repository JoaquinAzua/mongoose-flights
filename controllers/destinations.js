const Flight = require('../models/flight');

module.exports = {
    create,
};


function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        // add the destination to the flight.destinations array
        flight.destinations.push(req.body);
        console.log(req.body);
        // save parent document
        flight.save(function(err) {
            if (err) console.log(err);
            console.log(flight);
            //Step 5 redirect if data has been changed
            res.redirect(`/flights/${flight._id}`);
        });
    });
}
