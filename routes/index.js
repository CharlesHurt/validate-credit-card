var express = require('express');
var router = express.Router();

var path = require('path')

var INDEX_HTML = path.join(__dirname, '../public/index.html')
path.resolve(__dirname,  'index.html')

router.get('/', function(req, res, next) {
  res.sendFile(INDEX_HTML)
})
module.exports = router;
