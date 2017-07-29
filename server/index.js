let express = require('express');
let axios = require('axios');
let bodyParser = require('body-parser');
let dummyData = require('../data.json');
let mongoose = require('mongoose');
var Repo = require('../database/index.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos/import', function (req, res) {
  //console.log('the req bod is ', req.body);
    //send dummyData for testing purposes
  let path = 'https://api.github.com/users/' + req.body.term + '/repos';
  //fire off post request to github api
  console.log(path);
  axios.get(path)
    .then(response => {
      
      //take that data and stuff it into the mongo table
      dummyData = response.data;
      dummyData.forEach(item => {

        var newRepo = new Repo({   
          username: item.full_name,
          url: item.html_url,
          forkNum: item.forks,
          proPicUrl: item.owner.avatar_url
        })

        newRepo.save((err, newRepo) => {
          if (err) {
            console.log(err);
          }
          console.log('saved newRepo to DB!!')
        })

      })
    })
    .then(response => {
      console.log('ayyooooooooo');
      res.status(201).send(dummyData);
    })
    .catch(error => {
      console.log(error);
    })
})

app.get('/repos', function (req, res) {
  //get data from db and serve to client
  Repo.find((err, repos) => {
    if (err) return console.error(err);
    console.log('DB GET success!! ')
    res.status(200).send(repos); 
  }).limit(25);
});

const port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

