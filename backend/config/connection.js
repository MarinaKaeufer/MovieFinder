const mongoose = require('mongoose');

// TODO Change database name
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlemovies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
