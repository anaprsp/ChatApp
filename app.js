const express = require('express');
const ejs = require('ejs');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname,'./public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render("login");
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

app.get('/chat', (req, res) => {
  res.render("chat");
});

app.get('/signUp', (req, res) => {
  res.render("signUp");
});


app.post("/signUp", function(req, res) {
  res.redirect("login");
});


server.listen(3000, () => {
  console.log('Server listening on: 3000');
});
