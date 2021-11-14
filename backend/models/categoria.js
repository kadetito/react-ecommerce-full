const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    position: {
      type: Number,
    },
    published_at: {
      type: Date,
    },
    usuario: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { collection: "categorias" }
);

CategoriaSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Categoria", CategoriaSchema);
