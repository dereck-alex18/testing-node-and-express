const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials'); //Set the path to the partials

hbs.registerHelper("getCurrentYear", () => { 
    return new Date().getFullYear();
});

hbs.registerHelper("textUpper", (text) => {
    return text.toUpperCase();
});

//Middleware to check the url and the time that the user accessed the site
app.use((req, res, next) => {
    let timeStamp = new Date().toString();
    //Print when and which url the user accessed
    console.log(timeStamp);
    console.log(req.originalUrl);
    
    next();
}); 

//Middleware for when the site is under maintenance
app.use((req, res, next) => {
    res.render("maintenance");
});


app.get('/', (req, res) => {
    
    res.render("home", {
       message: "Welcome to this shit",
       title: "Home",
       
   });
});

app.get('/about', (req, res) => {
   
    res.render("about.hbs", {
        title: 'About',
        message: "This is the about page!"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        status: 600,
        message: 'Something wen wrong :('
    });
});

app.listen(3000);