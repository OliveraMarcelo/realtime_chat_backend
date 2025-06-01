const Mensaje = require('../models/mensaje');


// GET /api/mensajes/:de
const obtenerChat = async (req, res = response) => {
    const miId = req.uid;
    const mensajesDe = req.params.de;
    const last30 = await Mensaje.find(
        {
            $or: [
                /* se tiene que cumplir una de estas dos condiciones para que devuelva registro */
                /* esto me trae todos los msjs para tal */
                {de : miId, para : mensajesDe},
                /* esta persona me envio los msjs para mi */
                {de : mensajesDe , para: miId},
            ],
        }
    ).sort({createdAt : 'desc'})
    .limit(30);
    res.json({
        ok: true,
        mensajes : last30
    });
};
module.exports = {
    obtenerChat,
};