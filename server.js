const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')


const app = express();

app.use(morgan('dev'));
app.use(express.json({}))
app.use(express.json({
    extended: true
}))

dotenv.config({
    path: './config/config.env'
});

connectDB()


app.use('/todo',require('./routes/todo'))
app.use('/auth', require('./routes/user'));



const PORT = process.env.PORT || 3000;

app.listen(PORT,console.log(`Server is running @ port ${PORT}`.yellow.underline.bold));