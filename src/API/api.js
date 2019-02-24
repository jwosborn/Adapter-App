const express = require('express')
const router = express.Router()
const displayLogTime = require('./Utils/timeHelpers.js')
// DATA
const buildings = ["Norton", "Carver", "Cooke", "Library", "Rankin"]
const NortonRooms = [011, 012, 013, 015, 016, 017, 020, 101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 206, 207, 208, 209, 232]
const CookeRooms = [8, 221, 224, 'CCRH', 'Heeren']
const CarverRooms = [108, 135, 'Ingram']
const LibraryRooms = ['Mullins', 'Crismon', 'Curriculum']
const info = `
	<h1>Adapter App API<h1>
	<h2>Available Routes:<h2>
	<p>/<p>
	<p>/buildings<p>
	<p>/buildings/:building<p>
	<p>/:building/:room<p>
`


router.use((req, res, next) => {
	let logTime = new Date()
	console.log(displayLogTime())
	next()
})
router.get("/", (req, res) => {
	res.send(info)
})
// Fetches an array of building names
router.get("/buildings", (req, res) => {
	res.send(buildings)
})
// Fetches an array of rooms based on the value passed in for :building
router.get("/buildings/:building", (req, res) => {
	const building = req.params.building
	res.send(`You requested building:${building}`)
})
// Fetches data by :building and :room
router.get("/:building/:room", (req, res) => {
	const building = req.params.building
	const room = req.params.room
	res.send(`You requested ${building} ${room}`) 
})
// Fetches array of devices
router.get("/devices", (req, res) => {
	
})

module.exports = router