let express = require('express');
let chatsController=require('../controllers/chat.js')
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource Chat');
});

router.post('/dailychatsave',chatsController.dailychatSave);
router.post('/dailychatupdate',chatsController.dailychatUpdate);
router.get('/dailychatget',chatsController.dailychatGet);
router.post('/dailychatfoodcopy',chatsController.dailychatfoodcopy);
//router.post('/dailychatpush',chatsController.dailychatPush);

module.exports = router;