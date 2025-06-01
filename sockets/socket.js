const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require("../controllers/socket");
const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");

io.on("connection", (client) => {
  const [valido, uid] = comprobarJWT(client.handshake.auth["x-token"]);
  console.log(valido, uid);
  if (!valido) {
   /*  usuarioDesconectado(uid); */

    return client.disconnect();
    
  }
  usuarioConectado(uid);
  //ingresar al usuario a una sala en particular
  //sala global donde estan todas las personas conectadas
  // dos salas por defecto : sala global --> io.emit brodcastea de un msj a todo el mundo
  // si yo quisiera mnadar un msj privado se puede hacer por el client.id , y este id se le genera el websocket server
  //client.id es unico para cada cliente
  //client.join(uid); sala unica 


  //unir al cliente a una sala que tiene el mismo uid del usuario 6775fdfef51add74206d92e5
  client.join(uid);
  //client.to(uid).emit("mensaje", { admin: "Bienvenido" });
  client.on('mensaje-personal',async(payload)=>{
    console.log(payload);
    await grabarMensaje(payload);
    io.to(payload.para).emit('mensaje-personal',payload);
  });
  client.on("disconnect", (reason) => {
    usuarioDesconectado(uid);
    console.log(`Cliente desconectado ${client.id}. Razón: ${reason}`);
  });

  client.on("error", (err) => {
    console.log(`Error en cliente ${client.id}: ${err}`);
  });
});
