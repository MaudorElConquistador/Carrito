const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const index = require("./controllers/index.js");
const users = require("./controllers/users.js");
const admin = require("./controllers/admin.js");

const PORT = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./public/views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(__dirname+"/public/css"));

app.use(index);
app.use(admin);
app.use(users);
app.use('/', index);
app.use('/admin', admin);

app.use((req, res) => res.sendFile("404.html", {root:__dirname+"/public"}));

const server = require("http").createServer(app);
server.listen(PORT, () => console.log("Server listening on port "+PORT));

module.exports = app;
