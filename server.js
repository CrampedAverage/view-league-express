require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: 'views/layouts'
})

const app = express();
const port = process.env.PORT || 4000;


// Allows me to read the inputs from the form
app.use(express.urlencoded({
  extended: true
}))

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// 
app.post('/summoner', (req, res) => {
  const name = req.body.summoner
  res.send(name)
})

// This middleware handles the render of the first page
app.use('/', require('./routes/homepageHandler'))

// The first middleware is responsible for fetching Champions from riot api
// and then sending it as a json respons to ./routes/api/champions
app.use('/champions', require('./middleware/championsData'))

// The second middleware will fetch the champions from the 
// ./routes/api/champions then render it
app.use('/champions', require('./routes/champageHandler'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

