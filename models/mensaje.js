const { Schema, model } = require("mongoose");

const mensajeSchema = Schema(
  {
    de: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    para: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    mensaje: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "mensajes", // nombre de la colección en la base de datos
  }
);
mensajeSchema.method("toJSON", function () {
  // Convierte el documento Mongoose a un objeto JavaScript
  const { __v, _id, password, ...object } = this.toObject();
  return object; // Retorna el objeto modificado
});
module.exports = model("Mensaje", mensajeSchema);
