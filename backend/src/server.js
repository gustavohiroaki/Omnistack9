const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);


mongoose.connect('yourmongoatlas', {
    useNewUrlParser: true, // Silencia o erro do MongoDB
    useUnifiedTopology: true, // Silencia o erro do MongoDB
})



const connectedUsers = [];

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id
    
})

app.use((req,res,next)=>{
    req.io = io
    req.connectedUsers = connectedUsers
    
    return next()
})

// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição e delete)
// req.body = Acessar corpo da requisição (para criação e edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333,()=>{
    console.log('Running Server')
});