const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentyear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('scrimeIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');


app.use((req,res,next) => {     // next exist so you can tell express that when your middlewar function is done
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    })
    console.log(log);
    next(); 
});

// app.use((req, res, next) => {               // maintanace mode next objec is not passed
//     res.render('maintenace.hbs', {          // so functions after this middlevare are not
//         message:'Site under maintenace'     //executing
//     })
// });
app.use(express.static(__dirname  + '/public'));    // express.static takes absolute path to the folder you want to serve up                                    
                                                    // __dirname stores the path to your project directory in this case
                                                    // it's stores the path to node web server
                                                    //all it's needs to be done to concate to public folder to use this directory


app.get('/', (req, res) => {
    // res.send('<a href="http://localhost:3000/about">About page</a><br><a href="http://localhost:3000/bad">Bad page</a><br><a href="http://localhost:3000/help.html">Help</a>');
   
    // res.send({
    //     person:{
    //         firstName:'Adrijan',
    //         lastName:'Kolosnjaji',
    //         age:25,
    //         facebookLinks:'daco',
    //         likes:[
    //             'sleeping',
    //             'more sleeping',
    //             'even more sleeping'
    //         ]
    //     }
    // });

    res.render('home.hbs',{
        title:'home',
        welcomeMessage:'Welcome Sklj',
        pageTitle:'This is home page',
        
    })
});

app.get('/about', (req, res) => {
    // res.send('about page');
    res.render('about.hbs', {
        pageTitle:'About page',
        
    });        //Its renders template with current view engine

});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:{
            code:404,
            status:'page not found!'
        }
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});