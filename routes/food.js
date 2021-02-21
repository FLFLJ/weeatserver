var express = require('express');
var foodsController=require('../controllers/food.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/foodclassGet',foodsController.truefoodGet);
router.post('/foodclassSave',foodsController.foodclassSave)
router.post('/foodclassUpdate',foodsController.foodclassUpdate)



module.exports = router;