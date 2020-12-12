const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/practice');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to the database'));
db.once('open', function(){
    console.log('database connected');
});

module.exports = db;