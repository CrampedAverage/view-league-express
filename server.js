require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: 'views/layouts'
})

// create application/json parser
let jsonParser = express.json()
 
// create application/x-www-form-urlencoded parser
let urlencodedParser = express.urlencoded({ extended: false, limit: '20mb'  })

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'))

app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

// This middleware handles the render of the first page
app.use('/', urlencodedParser, require('./routes/homepageHandler'))

app.use('/:id', require('./routes/playerpageHandler'))

// The first middleware is responsible for fetching Champions from riot api
// and then sending it as a json respons to ./routes/api/champions
app.use('/champions', require('./middleware/championsData'))

// The second middleware will fetch the champions from the 
// ./routes/api/champions then render it
app.use('/champions', require('./routes/champageHandler'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

