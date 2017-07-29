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

module.exports = Repo;
console.log('module exports is ', module.exports)
