const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//DB CONFIG 
const { dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body

app.use(express.json());


// cors

app.use(cors());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000', // Cambiar si tu cliente está en otra URL
        methods: ['GET', 'POST'], 
    },
    transports: ['websocket'], // Usa exclusivamente WebSocket
    pingInterval: 25000, // Intervalo entre pings (25 segundos)
});
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );


//mis rutas, un middleware es una funcion que se ejecuta

app.use('/api/login', require('./routes/auth'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/mensajes', require('./routes/mensajes.js'))


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});

app.use( express.static( publicPath ) );
