const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const crearUsuario = async (req, res) => {
    const { email, password, _id} = req.body;

    try {
        //extraemos datos
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya está registrado",
            });
        }
        const usuario = new Usuario(req.body);
        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password =  bcrypt.hashSync(password, salt);
        //generar JWT
        const token = await generarJWT(usuario._id);
        //guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador!!!",
        });
    }
};


const login = async (req, res) => {
    const { email, password, } = req.body;

    try {
        //const usuario = new Usuario(req.body);        
        //buscar usuario
        const usuarioDB = await Usuario.findOne({
            email
        });
        //verificar email
        if(!usuarioDB){
            return res.status(404).json({
                ok : false,
                msg : "Email no encontrado",
            });
        }
        const validatePassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validatePassword){
            return res.status(404).json({
                ok : false,
                msg : "Password no es valida",
            });
        }
        // generar JWT
        
        const token = await generarJWT(usuarioDB.id);
        //devolver token
        res.json({
            ok: true,
            msg : "login",
            usuario : usuarioDB,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador!!!",
        });
    }
};

// renew token
const renewToken = async (req, res) => {
    const { uid } = req;
    console.log(uid)
    //generar JWT
    const token = await generarJWT(uid);
    //obtener usuario por uid
    const usuario = await Usuario.findById( uid );
    console.log(usuario._id);
    console.log("Renew token");
        res.json({
        ok: true,
        msg: "ok!!!",
        usuario,
        token
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken
};
