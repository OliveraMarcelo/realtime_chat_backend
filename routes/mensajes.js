/* router */
/* /api/mensajes */
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { obtenerChat } = require("../controllers/mensajes");

const router = Router();
/* 
solo voy a tener una ruta para reconstruir el chat 
y revalidar el token para saber quien es la persona que esta pidiendo la solicitud 
y que uid del usuario es el que necesito
*/

/* de que persona necesito cargar los msjs ? 
de : "uid"
*/
router.get('/:de',[validarJWT],obtenerChat);


module.exports = router;
