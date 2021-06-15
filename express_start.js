var express = require('express');
// const { css } = require('jquery');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var path = require('path')

app.use(express.static(path.join(__dirname, '/public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',36021);

app.get('/board-game-search', function(req,res){
    var toDisplay = {};
    toDisplay.title = "Board Game Search - Dashboard";
    var css = [];
    css.push({'style':"<link rel='stylesheet' href='/css/bggsearch.css' type='text/css'>"});
    toDisplay.customstyle= css;
    res.render('bgg_search', toDisplay);
})

app.get('/side-projects', function(req,res){
  var toDisplay = {};
  toDisplay.title = "Side Projects - Dashboard";
  var css = [];
  css.push({'style':'<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css">'});
  css.push({'style':'<link rel="stylesheet" href="/css/sideprojs.css">'});
  toDisplay.customstyle = css;
  // toDisplay.customstyle='<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css">';
  res.render('side-projects', toDisplay);
})

app.get('/home', function(req,res){
  var toDisplay = {};
  toDisplay.title = "Home - Dashboard";
  var css = [];
  css.push({'style':'<link rel="stylesheet" href="/css/carousel.css" type="text/css">'});
  toDisplay.customstyle= css;
  res.render('home', toDisplay);
})

app.get('/football-manager', function(req,res){
  var toDisplay = {};
  toDisplay.title = "FM - Dashboard";
  var css = [];
  css.push({'style':'<link rel="stylesheet" href="/css/fm.css" type="text/css">'});
  toDisplay.customstyle = css;
  res.render('fm', toDisplay);
})

app.get('/about', function(req,res){
  var toDisplay = {};
  toDisplay.title = "About - Dashboard";
  var css = [];
  css.push({'style':'<link rel="stylesheet" href="/css/about.css" type="text/css">'});
  css.push({'style':'<script src="https://kit.fontawesome.com/faa3905530.js" crossorigin="anonymous"></script>'})
  toDisplay.customstyle = css;
  res.render('about', toDisplay);
})

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500');
  });

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})