const express = require('express');
const restful = require('node-restful');
const mongoose = restful.mongoose; // extends restful
const bodyParser = require('body-parser');
const critical = require('critical');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/restful', {useNewUrlParser: true, useUnifiedTopology: true});
const EXTURL = "https://www.gamblersbet.com/";

const WebsiteSchema = mongoose.Schema({
    name: String,
    url: String,
})

const Websites = restful.model('websites', WebsiteSchema);
Websites.methods(['get', 'post', 'put', 'delete']);
Websites.register(app, '/api/websites');




// critical.generate({
//     base: 'test/',
//     src: EXTURL,
//     target: 'styles/main.css',
//     width: 1300,
//     height: 900
//   });

// const puppeteer = require('puppeteer');
 
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(EXTURL);
//   await page.screenshot({path: 'example.png'});
//   await browser.close();
// })();
  

app.listen(3000);
console.log('Listening on port 3000');