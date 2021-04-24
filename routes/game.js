let express = require('express');
let gameController=require('../controllers/game.js')
let router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('gamematvh............');
});

router.post('/playgamematch',gameController.playgamematch);
router.post('/playgamecancel',gameController.playgamecancel);




module.exports = router;