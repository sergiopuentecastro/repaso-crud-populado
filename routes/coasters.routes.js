const express = require('express')
const router = express.Router()
const Coaster = require('../models/Coaster.model');
const Park = require('../models/Park.model');

router.get('/', (req, res) => {

	Coaster
        .find()
        .populate('park_id')
        .then((coasters) => {
            res.render('pages/coasters/coasters-index', { coasters });
        })
        .catch((err) => console.error(err));
});



router.get('/new', (req, res) => {

    Park
    .find()
    .then((parks) => {
		res.render('pages/coasters/new-coaster', { parks });
	});
});

router.post('/new', (req, res) => {

	Coaster
        .create(req.body)
        .then(() => res.redirect('/coasters'))
		.catch((err) => console.log(err));
});



router.get('/:id', (req, res) => {

	Coaster
        .findById(req.params.id)
		.populate('park_id')
		.then((coaster) => res.render('pages/coasters/coaster-details', { coaster }))
		.catch((err) => console.error(err));
});



router.post('/:id/delete', (req, res) => {

    Coaster
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log('Error', err))
});


router.get('/:id/edit', (req, res) => {

    const { id } = req.params
    const data = {}
    Coaster
    .findById(id)
    .then(coaster => {
        data.coaster = coaster
        return Park.find() 
    })
        .then(parks => {
            data.parks = parks
            res.render('pages/coasters/coaster-edit', data)
        })
    .catch(err => console.log('Error', err))
});

router.post('/:id/edit', (req, res) => {

    const {id} = req.params
    const {name, description, inversions, length, park_id} = req.body

    Coaster
    .findByIdAndUpdate(id, {name, description, inversions, length, park_id},{new: true})
    .then(() => res.redirect('/coasters'))
    .catch(err => console.log('Error', err))



})

module.exports = router
