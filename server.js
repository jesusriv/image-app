const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, () => console.log("Listening on 8000"));

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });