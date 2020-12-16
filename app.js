const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//Ejs
app.use(expresslayouts);
app.set('view engine', 'ejs');

// setup static files
app.use(express.static('./assets'));

// BodyParser(since we are getting data from Form we need to use bodyparser, and now it's comes with express so we don't need to install explicitly)
app.use(express.urlencoded({extended: false}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// connect flash
app.use(flash());

app.use(customMware.setFlash);

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8000;

//  database config
const db = require('./config/mongoose.js');



app.listen(PORT, console.log(`server started on ${PORT}`));
