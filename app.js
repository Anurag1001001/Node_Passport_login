const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');

//Ejs
app.use(expresslayouts);
app.set('view engine', 'ejs');

// setup static files
app.use(express.static('./assets'));








// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`server started on ${PORT}`));
