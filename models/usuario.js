const {Schema , model}  = require('mongoose');

const UsuarioSchema = Schema({ 
    nombre : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
    ,
    password : {
        type : String,
        required : true
    },
    online : {
        type : Boolean,
        default : false
    }
})
UsuarioSchema.method('toJSON', function () {
    // Convierte el documento Mongoose a un objeto JavaScript
    const { __v, _id, password, ...object } = this.toObject(); 

    // Renombra `_id` como `uid` en el objeto resultante
    object.uid = _id;

    return object; // Retorna el objeto modificado
});
module.exports =  model('Usuario',UsuarioSchema)
