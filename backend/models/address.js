const { Schema, model } = require("mongoose");

const AddressesSchema = Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalcode: {
    type: String,
  },
  phone: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

AddressesSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Addresses", AddressesSchema);
