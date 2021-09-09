const express = require('express')
const router = express.Router()
const Park = require('../models/Park.model');


router.get('/', (req, res) => {

	Park
        .find()
        .then((parks) => {
            res.render('pages/parks', { parks });
        })
        .catch((err) => console.error(err));
});



router.get('/new', (req, res) => {

    Park
    .find()
    .then((parks) => {
		res.render('pages/parks/new-park', { parks });
	});
});

router.post('/new', (req, res) => {
    const { name, description } = req.body;

	Park
        .create(req.body)
        .then(() => res.redirect('/parks'))
		.catch((err) => console.log(err));
});


module.exports = router
