let express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('server error');
        }
    });
    next();
});

//maintenance middleware
// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'josh',
    //     age: 25,
    //     likes: ['biking', 'kids', 'books']
    // });
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to the home page',
        pageTitle: 'Home page',
        // currentYear: new Date().getFullYear()
    });

});


app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill request'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});