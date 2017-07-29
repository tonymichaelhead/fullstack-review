let express = require('express');
let axios = require('axios');
let bodyParser = require('body-parser');
let dummyData = require('../data.json');
let Repo = require('../database/index.js')

let app = express();
console.log('the Repo is :', JSON.stringify(Repo))
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos/import', function (req, res) {
  //console.log('the req bod is ', req.body);
    //send dummyData for testing purposes
    res.status(201).send(dummyData);
  
  // let path = 'https://api.github.com/' + req.body.term + '/repos';
  // //fire off post request to github api
  // console.log(path);
  // axios.post(path)
  //   .then(response => {
  //     //take that data and stuff it into the mongo table
     
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
})

app.get('/repos', function (req, res) {
  //get data from db and serve to client
  Repo.find((err, repos) => {
    if (err) return console.error(err);
    console.log('DB GET success!! ')
    res.status(200).send(repos); 
  })
});

const port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

