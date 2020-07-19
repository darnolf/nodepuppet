const express = require('express');
const router = express.Router();
const restful = require('node-restful');
const mongoose = restful.mongoose; // extends restful
const bodyParser = require('body-parser');
const critical = require('critical');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/restful', {useNewUrlParser: true, useUnifiedTopology: true});
const EXTURL = "https://www.gamblersbet.com/";


const WebsiteSchema = mongoose.Schema({
    name: String,
    url: String,
    theme: String,
    subtheme: String,
    cloudflare: String
})

const Websites = restful.model('websites', WebsiteSchema);
Websites.methods(['get', 'post', 'put', 'delete']);
Websites.register(app, '/api/websites');

app.get('/api/websites/all', async (req, res, next) => {
  try {
    const result = await Websites.find().limit(1).select().exec();
    const data = JSON.parse(JSON.stringify(result));

    const screenshots = [];
    
    const websites = await data.map(x => {
      //getscreenshot(x);
      getcritical(x);
    });
    
    res.send(data);

      //res.send(outrights);
  } catch(error) {
    res.status(500).send(error);
  }
});



// critical.generate({
//     base: 'test/',
//     src: EXTURL,
//     target: 'styles/dfgdfg.css',
//     width: 1300,
//     height: 900
//   });

const getcritical = async (data) => {


  critical.generate({
    base: '/public/critical',
    src: data.url,
    target: `${data.name}-critical.css`,
    width: 1300,
    height: 900
  });

};

const puppeteer = require('puppeteer');

const getscreenshot = async (data) => {
  // const imgpath = path.join(public, data.url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(data.url);
  await page.screenshot({path: __dirname + '/public/' +  data.name + '.png'}); 
  await browser.close();

};

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(EXTURL);
//   await page.screenshot({path: 'example.png'});
//   await browser.close();
// })();
 
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(EXTURL);
//   await page.screenshot({path: 'example.png'});
//   await browser.close();
// })();
  

app.listen(3000);
console.log('Listening on port 3000');