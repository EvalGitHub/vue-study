var  express = require('express');
var app = express();
app.use(express.static('./dist'));
module.exports = app.listen(5001,function(err){
  if(err){
    return
  }
  console.log('> Listening at  http://localhost: '+ 5001 + '\n')
});