const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {
    const { uid } = req;
    const desde = Number(req.query.desde) || 0;
    console.log(uid)
    //obtener usuario por uid
    const usuarios = await Usuario
    .find({_id :{ $ne : uid}})
   
    console.log(usuarios)
    //console.log(usuario._id);

        res.json({
        ok: true,
        usuarios,
    });
};
module.exports = {
    getUsuarios,
};