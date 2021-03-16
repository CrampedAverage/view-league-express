const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', require('./routes/homepageHandler'))

app.use('/champions', require('./routes/champageHandler'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

