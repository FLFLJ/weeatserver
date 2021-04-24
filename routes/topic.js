let express = require('express');
let topicController=require('../controllers/topic.js')
let router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('topic............');
});

router.post('/createtopic',topicController.createtopic);




module.exports = router;