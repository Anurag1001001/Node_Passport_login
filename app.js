const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');

//Ejs
app.use(expresslayouts);
app.set('view engine', 'ejs');




// Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));