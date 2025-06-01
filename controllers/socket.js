
const Mensaje = require("../models/mensaje");
const Usuario = require("../models/usuario");
const usuarioConectado = async (uid = "")=>{
    const usuario = await Usuario.findById(uid);
    usuario.online = true
    console.log("Usuario conectado", usuario);
    await usuario.save();
    return usuario;
}
const usuarioDesconectado = async (uid = "")=>{
    const usuario = await Usuario.findById(uid);
    usuario.online = false
    await usuario.save();
    return usuario;
}

const grabarMensaje = async (payload) => {
    console.log("Grabando mensaje");
    try {
        const mensaje = Mensaje(payload);
        await mensaje.save();
    } catch (error) {
        console.log(error);
        return false;
        
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}