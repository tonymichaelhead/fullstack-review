let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('successfully connected to the database!!')
})

var repoSchema = mongoose.Schema({
  username: String,
  url: String,
  forkNum: Number,
  proPicUrl: String
});

var Repo = mongoose.model('Repo', repoSchema);
// var newRep = new Repo({   
//   username: 'rarttr',
//   url: 'rasrsrast',
//   forkNum: 50000,
//   proPicUrl: 'rasrsrast'
// })

// newRep.save((err, newRep) => {
//   if (err) {
//     console.log(err);
//   }
// })

// Repo.find((err, repos) => {
//   if (err) return console.error(err);
//   //console.log(repos)
// });

module.exports = Repo;
console.log('module exports is ', module.exports)
