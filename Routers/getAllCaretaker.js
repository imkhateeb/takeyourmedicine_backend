const express = require('express');
const router = express.Router();
const Caretaker = require('../models/caretaker');

router.get('/get-all-caretaker', async (req, res) => {
	try {
		const caretakers = await Caretaker.find();
		res.json({success: true, caretakers})
	} catch (error) {
		res.json({success: false})
	}
})

module.exports = router;