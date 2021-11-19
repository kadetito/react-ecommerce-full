const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema({
  screenshots: {
    type: Array,
    items: [
      {
        type: String,
      },
    ],
  },

  nombre: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
  },
  poster: {
    type: String,
  },
  discount: {
    type: Number,
  },
  summary: {
    type: String,
  },
  referencia: {
    type: String,
  },
  published_at: {
    type: Date,
    required: true,
  },

  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});

ArticuloSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Articulo", ArticuloSchema);
