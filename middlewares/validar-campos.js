const { validationResult } = require("express-validator");

const validarCampos = (req , res ,next)=>{
    const errores = validationResult(req);

    console.log('validar campos');

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped() // todos los errores facil de observar
        });
    }
    next();
}
module.exports = {
    validarCampos
}