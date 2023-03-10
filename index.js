// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//app strarts here
let responseObject={};
app.get('/api/:date',(req,res)=>{
  let input=req.params.date;
  //date string
if (/\d{5,}/.test(input)){
    //its timestamp
    input=parseInt(input);//string=>int
    responseObject['unix']=new Date(input).getTime();// gettime:date-->unix timestamp
    responseObject['utc']=new Date(input).toUTCString();
  
}
else{
    responseObject['unix']=new Date(input).getTime();
    responseObject['utc']=new Date(input).toUTCString();
  }
  //Error
  if(!responseObject['unix'] || !responseObject['utc']){
    res.json({error:'invalid Date'})
  }
  res.json(responseObject);
})

//route for empty 
app.get('/api',(req,res)=>{
  responseObject['utc']=new Date().toUTCString(); 
  responseObject['unix']=new Date().getTime();// 
  res.json(responseObject);
})
