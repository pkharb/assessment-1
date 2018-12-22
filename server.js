require('dotenv').config();
const  
    express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    PORT = process.env.PORT || 3000,
    ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    axios = require('axios');


// ejs configuration
app.set('view engine', 'ejs');

// middleware
app.use(ejsLayouts);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname + 'public')));
// app.use(express.static(path.join(__dirname, 'public', 'views')))


// routes
app.get('/', (req, res) => {
    res.render('index');
});
// app.get('/', (req, res) => {
//     res.render('posts');
// });
app.get('/posts', (req,res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(({ data }) => {
        res.render('posts', {data})
    });
    
});

// listen to port
app.listen(PORT, err => {
    console.log(err || `listening to port: ${PORT}`);
})