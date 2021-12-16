const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create,
    newTicket,
};




function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({"flight":flight._id}, function (err, tickets){
            res.render('tickets/new', {
                title: 'New Ticket',
                tickets,
                flight
            });
        })
    })
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        req.body.flight = flight._id;
        const ticket = new Ticket(req.body);
        
        ticket.save(function (err){
            if (err){
                console.log(err)
                return res.redirect('/tickets/new')
            }
            res.redirect(`/flights/${flight._id}`)
  })
 })
}
