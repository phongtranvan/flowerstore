let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
let flower = require('./routes/flower');

if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Flower store"}));

app.route("/flowers")
    .get(flower.getAll)
    .post(flower.create);
app.route("/flowers/:id")
    .get(flower.getById)
    .delete(flower.deleteItem)
    .put(flower.update);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; 