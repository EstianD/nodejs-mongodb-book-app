require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const app = express();

// ESTABLISH PORT
const PORT = process.env.PORT || 5000;

// CONTROLLERS
const bookController = require('./controllers/bookController');

// ==================MIDDLEWARES==================
// BODY PARSER
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// CONTROLLERS
app.use('/book', bookController);

// VIEWS ROUTE
app.set('views', path.join(__dirname, '/views/'));

// VIEW ENGINE
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: `${__dirname}/views/layouts/`
}));
app.set('view engine', 'hbs');


// 
// app.use(express.json);
// app.use(express.urlencoded({ extended: false }));


// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});