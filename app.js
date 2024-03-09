const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const moviesRouter = require("./routes/moviesRoutes")
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', true);

app.use(bodyParser.json());


/*------------- server connection ------------*/
const PORT = process.env.PORT || 8000;
app.listen( PORT, () => console.log(`Server connected on port ${PORT}`));


/*------- database connection --------------*/
mongoose.connect(process.env.CONNECTION_URI)
.then(() => console.log('Database connected....'))
.catch( (err) => console.log(err));



/*-------- routes ------------------*/
app.use('/movies', moviesRouter);


/*---- export to be used on unit tests --------*/
module.exports = app;



