require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

//#region middleware

/**
 * * logger: log the request
 * * credentials: Handle options credentials check - before CORS and fetch cookies credentials requirement
 * * cors
 * * urlencoded: handle urlencoded form data
 * * json
 * * cookieParser
 */
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//#endregion

// auth route
app.use('/auth', require('./routes/auth.js'));

// verifyJWT
app.use(verifyJWT);

// api routes
app.use('/users', require('./routes/user'));
// app.use('/product', require('./routes/product'))
// app.use('/supplier', require('./routes/supplier'))
// app.use('/warehouse', require('./routes/warehouse'))


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

module.exports = app

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});