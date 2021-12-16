var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controllers/tickets');


// GET "/flights/:id/tickets/new" - New Ticket Route(newejs)
router.get('/flights/:id/tickets/new', ticketsCtrl.newTicket);

//POST "/tickets/new" - Create Route
router.post('/flights/:id/tickets/new', ticketsCtrl.create);







module.exports = router;