const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const passport = require('passport');

const app = express();

// passport config
require('./config/passport-local-strategy')(passport)

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

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// connect flash
app.use(flash());

app.use(customMware.setFlash);

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8000;

//  database config
const db = require('./config/mongoose.js');
// const passport = require('passport');



app.listen(PORT, console.log(`server started on ${PORT}`));
