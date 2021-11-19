const { Schema, model } = require("mongoose");

const FavoritoSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },

  articulo: {
    type: Schema.Types.ObjectId,
    ref: "Articulo",
    required: true,
  },
});

FavoritoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Favorito", FavoritoSchema);
